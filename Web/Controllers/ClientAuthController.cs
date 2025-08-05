using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Service.IServices;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientAuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IClientService _clientService;
        private readonly ILogger<ClientAuthController> _logger;

        public ClientAuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IClientService clientService,
            ILogger<ClientAuthController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _clientService = clientService;
            _logger = logger;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] ClientLoginDto dto)
        {
            _logger.LogInformation("=== TENTATIVE DE CONNEXION CLIENT ===");
            _logger.LogInformation("Email: {Email}", dto.Email);

            try
            {
                if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                {
                    _logger.LogWarning("Email ou mot de passe manquant");
                    return BadRequest("Email et mot de passe requis");
                }

                // Trouver l'utilisateur par email
                _logger.LogInformation("Recherche utilisateur par email: {Email}", dto.Email);
                var user = await _userManager.FindByEmailAsync(dto.Email);
                if (user == null)
                {
                    _logger.LogWarning("Utilisateur non trouvé pour l'email: {Email}", dto.Email);
                    return BadRequest("Email ou mot de passe incorrect");
                }

                _logger.LogInformation("Utilisateur trouvé: {UserId}", user.Id);

                // Vérifier le mot de passe
                _logger.LogInformation("Vérification du mot de passe");
                var passwordCheck = await _userManager.CheckPasswordAsync(user, dto.Password);
                if (!passwordCheck)
                {
                    _logger.LogWarning("Mot de passe incorrect pour l'utilisateur: {UserId}", user.Id);
                    return BadRequest("Email ou mot de passe incorrect");
                }

                _logger.LogInformation("Mot de passe correct");

                // Récupérer les informations du client
                _logger.LogInformation("Recherche du profil client pour l'utilisateur: {UserId}", user.Id);
                var allClients = await _clientService.GetAllAsync();
                var client = allClients?.FirstOrDefault(c => c.UserId == user.Id);
                
                if (client == null)
                {
                    _logger.LogWarning("Aucun profil client trouvé pour l'utilisateur: {UserId}", user.Id);
                    return BadRequest("Aucun profil client trouvé pour cet utilisateur");
                }

                _logger.LogInformation("Client trouvé: {ClientId}", client.ClientId);

                if (!client.IsActive)
                {
                    _logger.LogWarning("Compte client désactivé: {ClientId}", client.ClientId);
                    return BadRequest("Votre compte client est désactivé. Contactez l'administrateur.");
                }

                // Connecter l'utilisateur
                _logger.LogInformation("Connexion de l'utilisateur");
                await _signInManager.SignInAsync(user, isPersistent: dto.RememberMe);

                var response = new
                {
                    Message = "Connexion réussie",
                    User = new
                    {
                        user.Id,
                        user.UserName,
                        user.Email
                    },
                    Client = new
                    {
                        client.ClientId,
                        client.ClientNom,
                        client.Email,
                        client.Phone,
                        client.Adress,
                        client.IsActive
                    }
                };

                _logger.LogInformation("=== CONNEXION RÉUSSIE ===");
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la connexion client");
                return StatusCode(500, new { message = "Erreur de connexion", error = ex.Message });
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation("Déconnexion réussie");
                return Ok(new { Message = "Déconnexion réussie" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la déconnexion");
                return StatusCode(500, new { message = "Erreur de déconnexion" });
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentClient()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    _logger.LogWarning("Utilisateur non authentifié");
                    return Unauthorized(new { message = "Non authentifié" });
                }

                var allClients = await _clientService.GetAllAsync();
                var client = allClients?.FirstOrDefault(c => c.UserId == user.Id);
                
                if (client == null)
                {
                    _logger.LogWarning("Profil client non trouvé pour l'utilisateur: {UserId}", user.Id);
                    return NotFound(new { message = "Profil client non trouvé" });
                }

                var response = new
                {
                    User = new
                    {
                        user.Id,
                        user.UserName,
                        user.Email
                    },
                    Client = new
                    {
                        client.ClientId,
                        client.ClientNom,
                        client.Email,
                        client.Phone,
                        client.Adress,
                        client.IsActive
                    }
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération du profil client");
                return StatusCode(500, new { message = "Erreur serveur" });
            }
        }

        [HttpGet("test")]
        [AllowAnonymous]
        public IActionResult Test()
        {
            return Ok(new { message = "API ClientAuth fonctionne", timestamp = DateTime.Now });
        }
    }

    public class ClientLoginDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public bool RememberMe { get; set; } = false;
    }
}