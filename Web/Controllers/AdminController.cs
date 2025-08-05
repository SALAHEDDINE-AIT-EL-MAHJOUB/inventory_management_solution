using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IClientService _clientService;

        public AdminController(IAdminService adminService, IClientService clientService)
        {
            _adminService = adminService;
            _clientService = clientService;
        }

        // Récupérer le profil de l'admin connecté
        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult> GetMyProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var admin = await _adminService.GetByUserIdAsync(userId);
            if (admin == null)
                return NotFound();

            return Ok(new
            {
                adminName = admin.AdminName,
                email = admin.Email,
                userName = admin.User?.UserName
            });
        }

        // Modifier ses informations
        [Authorize]
        [HttpPut("me")]
        public async Task<ActionResult> UpdateMyProfile([FromBody] AdminUpdateModel updatedAdmin)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var admin = await _adminService.GetByUserIdAsync(userId);
            if (admin == null)
                return NotFound();

            admin.AdminName = updatedAdmin.AdminName;
            admin.Email = updatedAdmin.Email;

            var newUserName = updatedAdmin.User?.UserName;
            if (admin.User != null && !string.IsNullOrWhiteSpace(newUserName))
            {
                admin.User.UserName = newUserName;
                admin.User.NormalizedUserName = newUserName.ToUpperInvariant();

                // Ajoute cette ligne pour forcer la mise à jour via UserManager si tu utilises Identity
                await _adminService.UpdateUserAsync(admin.User);

                // OU, si tu as accès à UserManager<User> dans le contrôleur :
                // await _userManager.UpdateAsync(admin.User);
            }

            await _adminService.UpdateAsync(admin);

            Console.WriteLine($"UserName retourné : {admin.User?.UserName}");

            return Ok(new { admin.AdminName, admin.Email, admin.User?.UserName });
        }

        // Créer son profil (si pas encore existant)
        [HttpPost("me")]
        public async Task<ActionResult> CreateMyProfile([FromBody] Admin newAdmin)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var existing = await _adminService.GetByUserIdAsync(userId);
            if (existing != null)
                return BadRequest("Profil déjà existant.");

            newAdmin.UserId = userId;
            await _adminService.AddAsync(newAdmin);
            return CreatedAtAction(nameof(GetMyProfile), null);
        }

        // Gérer les clients
        [HttpPost("client")]
        public async Task<ActionResult> AddClient([FromBody] Client client)
        {
            await _clientService.AddAsync(client);
            return Ok(client);
        }

        [HttpPut("client/{id}")]
        public async Task<ActionResult> UpdateClient(int id, [FromBody] Client client)
        {
            if (id != client.ClientId)
                return BadRequest();

            await _clientService.UpdateAsync(client);
            return NoContent();
        }

        [HttpDelete("client/{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            var client = await _clientService.GetByIdAsync(id);
            if (client == null)
                return NotFound();

            await _clientService.DeleteAsync(client);
            return NoContent();
        }

        [HttpGet("clients")]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            var clients = await _clientService.GetAllAsync();
            return Ok(clients);
        }

        // Afficher tous les admins
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAllAdmins()
        {
            var admins = await _adminService.GetAllAsync();
            return Ok(admins);
        }

        // Inscription d'un nouvel admin
        [HttpPost("register")]
        public async Task<ActionResult> RegisterAdmin([FromBody] AdminRegisterModel model)
        {
            if (string.IsNullOrWhiteSpace(model.UserName) ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.AdminName) ||
                string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("Tous les champs sont obligatoires.");
            }

            var result = await _adminService.RegisterAdminAsync(
                model.UserName,
                model.Email,
                model.AdminName,
                model.Password
            );

            if (!result)
                return BadRequest("Nom d'utilisateur déjà utilisé.");

            return Ok("Inscription réussie.");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AdminLoginModel model)
        {
            if (string.IsNullOrWhiteSpace(model.UserName) || string.IsNullOrWhiteSpace(model.Password))
                return BadRequest("Nom d'utilisateur et mot de passe requis.");

            var user = await _adminService.GetUserByUserNameAsync(model.UserName);
            if (user == null)
                return Unauthorized("Utilisateur inexistant.");

            // Vérification du mot de passe (en clair ici, à remplacer par un hash en prod)
            if (user.PasswordHash != model.Password)
                return Unauthorized("Mot de passe incorrect.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Identity.Application"); // ← CORRECTION

            await HttpContext.SignInAsync(
                "Identity.Application", // ← CORRECTION
                new ClaimsPrincipal(claimsIdentity)
            );

            return Ok("Connexion réussie.");
        }
    }

    public class AdminRegisterModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string AdminName { get; set; }
        public string Password { get; set; }
    }

    public class AdminLoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class AdminUpdateModel
    {
        public string AdminName { get; set; }
        public string Email { get; set; }
        public UserModel User { get; set; }
    }

    public class UserModel
    {
        public string UserName { get; set; }
    }
}
