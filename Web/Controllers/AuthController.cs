using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Security.Claims;
using Domain.Authentication;  // Pour accéder à User
using Domain.Entities;        // Pour accéder aux autres entités si nécessaire

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IClientService _clientService;
        private readonly IAdminService _adminService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            UserManager<User> userManager,
            IPasswordHasher<User> passwordHasher,
            IClientService clientService,
            IAdminService adminService,
            ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _clientService = clientService;
            _adminService = adminService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(loginDto.UserName) || string.IsNullOrWhiteSpace(loginDto.Password))
                {
                    return BadRequest("Nom d'utilisateur et mot de passe requis");
                }

                // 1. Trouver l'utilisateur
                var user = await _userManager.FindByNameAsync(loginDto.UserName);
                if (user == null)
                {
                    user = await _userManager.FindByEmailAsync(loginDto.UserName);
                    if (user == null)
                    {
                        return Unauthorized("Utilisateur inexistant");
                    }
                }

                // 2. Vérifier le mot de passe
                var passwordVerification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
                if (passwordVerification == PasswordVerificationResult.Failed)
                {
                    return Unauthorized("Mot de passe incorrect");
                }

                // 3. Déterminer le type d'utilisateur
                var userType = await GetUserType(user.Id);
                if (userType == null)
                {
                    return Unauthorized("Type d'utilisateur non déterminé");
                }

                // 4. Récupérer les rôles
                var roles = await _userManager.GetRolesAsync(user);

                // 5. Créer les claims
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("UserType", userType.Type),
                    new Claim("ProfileId", userType.ProfileId.ToString())
                };

                // Ajouter les rôles comme claims
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var claimsIdentity = new ClaimsIdentity(claims, "Identity.Application");

                await HttpContext.SignInAsync(
                    "Identity.Application",
                    new ClaimsPrincipal(claimsIdentity)
                );

                // 6. Retourner les informations utilisateur
                var response = new LoginResponseDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    UserType = userType.Type,
                    ProfileId = userType.ProfileId,
                    Roles = roles.ToList(),
                    ProfileData = userType.ProfileData
                };

                _logger.LogInformation("Connexion réussie pour {UserName} - Type: {UserType}", user.UserName, userType.Type);

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la connexion");
                return StatusCode(500, "Erreur serveur");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Identity.Application");
            return Ok("Déconnexion réussie");
        }

        private async Task<UserTypeInfo> GetUserType(string userId)
        {
            // Vérifier si c'est un admin
            var admin = await _adminService.GetByUserIdAsync(userId);
            if (admin != null)
            {
                return new UserTypeInfo
                {
                    Type = "Admin",
                    ProfileId = admin.AdminId,
                    ProfileData = new
                    {
                        admin.AdminName,
                        admin.Email
                    }
                };
            }

            // Vérifier si c'est un client
            var client = await _clientService.GetClientUserById(userId);
            if (client != null)
            {
                return new UserTypeInfo
                {
                    Type = "Client",
                    ProfileId = client.ClientId,
                    ProfileData = new
                    {
                        client.ClientNom,
                        client.Email,
                        client.Adress,
                        client.Phone,
                        client.IsActive
                    }
                };
            }

            return null;
        }
    }

    public class LoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponseDto
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public int ProfileId { get; set; }
        public List<string> Roles { get; set; }
        public object ProfileData { get; set; }
    }

    public class UserTypeInfo
    {
        public string Type { get; set; }
        public int ProfileId { get; set; }
        public object ProfileData { get; set; }
    }
}