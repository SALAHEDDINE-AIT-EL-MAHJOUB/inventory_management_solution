using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Security.Claims;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IAdminService _adminService;
        private readonly IClientService _clientService;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IAdminService adminService,
            IClientService clientService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _adminService = adminService;
            _clientService = clientService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            User user = null;
            if (!string.IsNullOrWhiteSpace(dto.UserName))
                user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null && !string.IsNullOrWhiteSpace(dto.Email))
                user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return Unauthorized("Utilisateur inexistant.");

            // Détection du type
            bool isClient = user.IsClient;
            bool isOperateur = user.IsOperateur;
            // Si ni client ni opérateur, alors admin
            bool isAdmin = !user.IsClient && !user.IsOperateur;

            if (isClient)
            {
                // Authentification client (email + mot de passe hashé)
                var passwordOk = await _userManager.CheckPasswordAsync(user, dto.Password);
                if (!passwordOk)
                    return Unauthorized("Mot de passe incorrect.");
                await _signInManager.SignInAsync(user, isPersistent: false);

                // Récupérer le profil client
                var client = (await _clientService.GetAllAsync()).FirstOrDefault(c => c.UserId == user.Id);
                if (client == null)
                    return BadRequest("Profil client introuvable.");

                // Inclure l'objet client dans la réponse
                return Ok(new { type = "client", redirect = "clientDashboard", clientId = client.ClientId, client });
            }
            else if (isAdmin)
            {
                // Authentification admin (username + mot de passe non hashé)
                if (user.PasswordHash != dto.Password)
                    return Unauthorized("Mot de passe incorrect.");
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName)
                };
                var claimsIdentity = new ClaimsIdentity(claims, "Identity.Application");
                await HttpContext.SignInAsync("Identity.Application", new ClaimsPrincipal(claimsIdentity));

                // Vérifier si le profil admin existe
                var admin = await _adminService.GetByUserIdAsync(user.Id);
                if (admin == null)
                    return Ok(new { type = "admin", redirect = "adminRegister" });
                return Ok(new { type = "admin", redirect = "adminDashboard" });
            }
            else if (isOperateur)
            {
                // Ajoutez ici la logique opérateur si besoin
                return Ok(new { type = "operateur", redirect = "operateurDashboard" });
            }

            return Unauthorized("Type d'utilisateur inconnu.");
        }
    }

    public class LoginDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}