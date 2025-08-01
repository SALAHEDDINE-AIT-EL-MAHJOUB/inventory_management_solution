using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using Domain.Authentication; // Ajouter cette ligne pour User
using System.Threading.Tasks;
using System.Linq;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly UserManager<User> _userManager;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger<AdminClientController> _logger;

        public AdminClientController(
            IClientService clientService, 
            UserManager<User> userManager,
            IPasswordHasher<User> passwordHasher,
            ILogger<AdminClientController> logger)
        {
            _clientService = clientService;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _logger = logger;
        }

        [HttpPost("CreateClientFromAdmin")]
        public async Task<IActionResult> CreateClientFromAdmin([FromBody] CreateClientDto dto)
        {
            _logger.LogInformation("=== DÉBUT CRÉATION CLIENT ===");
            _logger.LogInformation("Données reçues: UserName={UserName}, Email={Email}, ClientNom={ClientNom}", 
                dto.UserName, dto.Email, dto.ClientNom);

            try
            {
                // 1. Validation de base
                if (dto == null)
                {
                    _logger.LogWarning("DTO null reçu");
                    return BadRequest("Aucune donnée reçue");
                }

                if (string.IsNullOrWhiteSpace(dto.Email))
                {
                    _logger.LogWarning("Email manquant");
                    return BadRequest("Email requis");
                }

                if (string.IsNullOrWhiteSpace(dto.ClientNom))
                {
                    _logger.LogWarning("Nom client manquant");
                    return BadRequest("Nom du client requis");
                }

                if (string.IsNullOrWhiteSpace(dto.UserName))
                {
                    _logger.LogWarning("UserName manquant");
                    return BadRequest("Nom d'utilisateur requis");
                }

                if (string.IsNullOrWhiteSpace(dto.Password))
                {
                    _logger.LogWarning("Password manquant");
                    return BadRequest("Mot de passe requis");
                }

                // Validation du mot de passe
                if (dto.Password.Length < 6)
                {
                    _logger.LogWarning("Mot de passe trop court");
                    return BadRequest("Le mot de passe doit contenir au moins 6 caractères");
                }

                _logger.LogInformation("Validation de base réussie");

                // 2. Vérifier unicité email
                _logger.LogInformation("Vérification unicité email: {Email}", dto.Email);
                var existingUserByEmail = await _userManager.FindByEmailAsync(dto.Email);
                if (existingUserByEmail != null)
                {
                    _logger.LogWarning("Email déjà utilisé: {Email}", dto.Email);
                    return BadRequest("Cette adresse email est déjà utilisée");
                }

                // 3. Vérifier unicité nom d'utilisateur
                _logger.LogInformation("Vérification unicité nom utilisateur: {UserName}", dto.UserName);
                var existingUserByName = await _userManager.FindByNameAsync(dto.UserName);
                if (existingUserByName != null)
                {
                    _logger.LogWarning("Nom d'utilisateur déjà utilisé: {UserName}", dto.UserName);
                    return BadRequest("Ce nom d'utilisateur est déjà utilisé");
                }

                // 4. Créer l'utilisateur avec PasswordHash personnalisé
                _logger.LogInformation("Création de l'utilisateur");
                var userId = Guid.NewGuid().ToString();
                var user = new User
                {
                    Id = userId,
                    UserName = dto.UserName,
                    NormalizedUserName = dto.UserName.ToUpperInvariant(),
                    Email = dto.Email,
                    NormalizedEmail = dto.Email.ToUpperInvariant(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = false,
                    AccessFailedCount = 0,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                // Hasher le mot de passe manuellement
                _logger.LogInformation("Hash du mot de passe");
                user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

                _logger.LogInformation("Tentative de création utilisateur avec UserManager");
                
                // Utiliser CreateAsync sans mot de passe puisqu'on a déjà hashé
                var createResult = await _userManager.CreateAsync(user);
                
                if (!createResult.Succeeded)
                {
                    var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                    _logger.LogError("Échec création utilisateur: {Errors}", errors);
                    return BadRequest($"Erreur création utilisateur: {errors}");
                }

                _logger.LogInformation("Utilisateur créé avec succès: {UserId}", user.Id);

                // 5. Ajouter le rôle Client si disponible
                try
                {
                    var addRoleResult = await _userManager.AddToRoleAsync(user, "Client");
                    if (addRoleResult.Succeeded)
                    {
                        _logger.LogInformation("Rôle Client ajouté avec succès");
                    }
                    else
                    {
                        _logger.LogWarning("Impossible d'ajouter le rôle Client: {Errors}", 
                            string.Join(", ", addRoleResult.Errors.Select(e => e.Description)));
                    }
                }
                catch (Exception roleEx)
                {
                    _logger.LogWarning(roleEx, "Erreur lors de l'ajout du rôle Client");
                    // Continue sans le rôle
                }

                // 6. Créer le client
                _logger.LogInformation("Création du client");
                var client = new Client
                {
                    UserId = user.Id,
                    Email = dto.Email,
                    ClientNom = dto.ClientNom,
                    Adress = dto.Adress ?? "",
                    Phone = dto.Phone ?? "",
                    ClientDateCreation = DateTime.UtcNow,
                    IsActive = true,
                    IsDeleted = false
                };

                _logger.LogInformation("Données du client à créer: {@Client}", new {
                    client.UserId,
                    client.Email,
                    client.ClientNom,
                    client.Adress,
                    client.Phone,
                    client.IsActive
                });

                _logger.LogInformation("Appel du service pour créer le client");
                
                // Vérifier que le service existe
                if (_clientService == null)
                {
                    _logger.LogError("ClientService est null");
                    // Nettoyer l'utilisateur créé
                    await _userManager.DeleteAsync(user);
                    return StatusCode(500, "Service client non disponible");
                }

                try
                {
                    _logger.LogInformation("Avant appel AddAsync - Client: {@ClientData}", new {
                        client.UserId,
                        client.Email,
                        client.ClientNom,
                        client.Adress,
                        client.Phone,
                        client.IsActive,
                        client.IsDeleted
                    });

                    var createdClient = await _clientService.AddAsync(client);
                    _logger.LogInformation("Service AddAsync appelé avec succès");
                    
                    // Forcer la sauvegarde si nécessaire
                    if (createdClient != null && createdClient.ClientId > 0)
                    {
                        _logger.LogInformation("Client créé avec succès: {ClientId}", createdClient.ClientId);
                        client = createdClient; // Mettre à jour avec l'objet retourné
                    }
                    else
                    {
                        _logger.LogError("Client non créé - ClientId manquant");
                        
                        // Vérifier si le client existe vraiment en base
                        var verifyClient = await _clientService.GetByEmailAsync(dto.Email, false);
                        if (verifyClient == null)
                        {
                            _logger.LogError("Confirmation: Le client n'existe pas en base de données");
                            throw new Exception("Échec de la création du client - données non persistées");
                        }
                        else
                        {
                            _logger.LogInformation("Client trouvé en base après création: {ClientId}", verifyClient.ClientId);
                            client = verifyClient;
                        }
                    }
                }
                catch (Exception clientEx)
                {
                    _logger.LogError(clientEx, "ERREUR lors de la création du client via le service");
                    
                    // Nettoyer l'utilisateur créé
                    try
                    {
                        await _userManager.DeleteAsync(user);
                        _logger.LogInformation("Utilisateur supprimé après échec de création du client");
                    }
                    catch (Exception deleteEx)
                    {
                        _logger.LogError(deleteEx, "Erreur lors de la suppression de l'utilisateur");
                    }
                    
                    return StatusCode(500, $"Erreur lors de la création du client: {clientEx.Message}");
                }

                // 7. Retourner le résultat
                var result = new
                {
                    Message = "Client créé avec succès",
                    ClientId = client.ClientId,
                    UserId = user.Id,
                    ClientNom = client.ClientNom,
                    Email = client.Email,
                    UserName = user.UserName,
                    IsActive = client.IsActive
                };

                _logger.LogInformation("=== FIN CRÉATION CLIENT RÉUSSIE ===");
                _logger.LogInformation("Résultat final: {@Result}", result);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERREUR CRITIQUE lors de la création du client");
                _logger.LogError("Type d'exception: {ExceptionType}", ex.GetType().Name);
                _logger.LogError("Message d'exception: {ExceptionMessage}", ex.Message);
                _logger.LogError("Stack trace: {StackTrace}", ex.StackTrace);
                
                if (ex.InnerException != null)
                {
                    _logger.LogError("Exception interne: {InnerException}", ex.InnerException.Message);
                    _logger.LogError("Stack trace interne: {InnerStackTrace}", ex.InnerException.StackTrace);
                }

                return StatusCode(500, $"Erreur serveur: {ex.Message}");
            }
        }

        [HttpGet("GetAllClients")]
        public async Task<IActionResult> GetAllClients()
        {
            try
            {
                _logger.LogInformation("Récupération de tous les clients");
                var clients = await _clientService.GetAllAsync();
                
                var result = clients.Select(c => new
                {
                    c.ClientId,
                    c.Email,
                    c.ClientNom,
                    c.Adress,
                    c.Phone,
                    c.ClientDateCreation,
                    c.IsActive,
                    UserName = c.User?.UserName
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération des clients");
                return StatusCode(500, $"Erreur: {ex.Message}");
            }
        }

        [HttpGet("GetClientById/{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            try
            {
                var client = await _clientService.GetByIdAsync(id, true);
                if (client == null)
                {
                    return NotFound("Client non trouvé");
                }

                var result = new
                {
                    client.ClientId,
                    client.Email,
                    client.ClientNom,
                    client.Adress,
                    client.Phone,
                    client.ClientDateCreation,
                    client.IsActive,
                    UserName = client.User?.UserName
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération du client {ClientId}", id);
                return StatusCode(500, $"Erreur: {ex.Message}");
            }
        }

        [HttpPut("UpdateClient/{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] UpdateClientDto dto)
        {
            try
            {
                var client = await _clientService.GetByIdAsync(id, true);
                if (client == null)
                {
                    return NotFound("Client non trouvé");
                }

                // Mettre à jour les propriétés
                client.ClientNom = dto.ClientNom ?? client.ClientNom;
                client.Email = dto.Email ?? client.Email;
                client.Adress = dto.Adress ?? client.Adress;
                client.Phone = dto.Phone ?? client.Phone;
                client.IsActive = dto.IsActive;

                await _clientService.UpdateAsync(client);

                return Ok(new { Message = "Client mis à jour avec succès" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la mise à jour du client {ClientId}", id);
                return StatusCode(500, $"Erreur: {ex.Message}");
            }
        }
    }

    // DTO reste identique
    public class CreateClientDto
    {
        public string AdminUserId { get; set; } = "";
        public string Email { get; set; } = "";
        public string Adress { get; set; } = "";
        public string Phone { get; set; } = "";
        public string ClientNom { get; set; } = "";
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public bool IsActive { get; set; } = true;
    }

    public class UpdateClientDto
    {
        public string ClientNom { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
    }
}