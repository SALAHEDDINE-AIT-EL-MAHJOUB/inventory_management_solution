using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
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
            // Utilise le DbContext pour la transaction
            var dbContext = (_clientService as Service.Services.ClientService)?.Context;
            if (dbContext == null)
            {
                _logger.LogError("DbContext introuvable dans ClientService");
                return StatusCode(500, "Erreur interne serveur");
            }

            using (var transaction = await dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    _logger.LogInformation("=== DÉBUT CRÉATION CLIENT ===");
                    _logger.LogInformation("Données reçues: UserName={UserName}, Email={Email}, ClientNom={ClientNom}", 
                        dto.UserName, dto.Email, dto.ClientNom);

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

                    // 1. Création de l'utilisateur
                    var userId = Guid.NewGuid().ToString();
                    var user = new User
                    {
                        Id = userId,
                        UserName = dto.UserName,
                        Email = dto.Email,
                        NormalizedUserName = dto.UserName.ToUpperInvariant(),
                        NormalizedEmail = dto.Email.ToUpperInvariant(),
                        EmailConfirmed = true,
                        PhoneNumberConfirmed = false,
                        TwoFactorEnabled = false,
                        LockoutEnabled = false,
                        AccessFailedCount = 0,
                        SecurityStamp = Guid.NewGuid().ToString(),
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    };

                    _logger.LogInformation("Utilisateur préparé - ID: {UserId}, UserName: {UserName}, Email: {Email}", 
                        user.Id, user.UserName, user.Email);

                    // Vérifier que l'ID n'est pas null avant la création
                    if (string.IsNullOrEmpty(user.Id))
                    {
                        _logger.LogError("ID utilisateur est null après initialisation");
                        return StatusCode(500, "Erreur lors de la génération de l'ID utilisateur");
                    }

                    _logger.LogInformation("Tentative de création utilisateur avec UserManager");
                    
                    // Utiliser CreateAsync avec le mot de passe
                    var createResult = await _userManager.CreateAsync(user, dto.Password);
                    
                    if (!createResult.Succeeded)
                    {
                        var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                        _logger.LogError("Échec création utilisateur: {Errors}", errors);
                        return BadRequest($"Erreur création utilisateur: {errors}");
                    }

                    _logger.LogInformation("Utilisateur créé avec succès: {UserId}", user.Id);

                    // 2. Vérifier que l'utilisateur a bien été créé en base
                    var verifyUser = await _userManager.FindByIdAsync(user.Id);
                    if (verifyUser == null)
                    {
                        _logger.LogError("L'utilisateur créé n'a pas été trouvé en base de données");
                        return StatusCode(500, "Erreur lors de la création de l'utilisateur - utilisateur non persisté");
                    }

                    // AJOUTER ICI :
                    verifyUser.IsClient = true;
                    await _userManager.UpdateAsync(verifyUser);
                    _logger.LogInformation("Champ IsClient mis à jour pour l'utilisateur: {UserId}", verifyUser.Id);

                    // 3. Ajouter le rôle Client si disponible
                    try
                    {
                        var addRoleResult = await _userManager.AddToRoleAsync(verifyUser, "Client");
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

                    // 4. Créer le client
                    _logger.LogInformation("Création du client");
                    var client = new Client
                    {
                        UserId = verifyUser.Id, // <-- c'est ce champ qui doit être rempli
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
                        await _userManager.DeleteAsync(verifyUser);
                        return StatusCode(500, "Service client non disponible");
                    }

                    try
                    {
                        _logger.LogInformation("Début de l'appel _clientService.AddAsync");
                        _logger.LogInformation("Données du client avant AddAsync: UserId={UserId}, Email={Email}, ClientNom={ClientNom}", 
                            client.UserId, client.Email, client.ClientNom);
                        
                        var createdClient = await _clientService.AddAsync(client);
                        
                        _logger.LogInformation("AddAsync terminé. Résultat: {IsSuccess}", createdClient != null);
                        if (createdClient != null)
                        {
                            _logger.LogInformation("Client créé avec ID: {ClientId}", createdClient.ClientId);
                        }
                        
                        if (createdClient != null && createdClient.ClientId > 0)
                        {
                            _logger.LogInformation("Client créé avec succès: {ClientId}", createdClient.ClientId);

                            // Commit la transaction ici
                            await transaction.CommitAsync();

                            var result = new
                            {
                                Message = "Client créé avec succès",
                                ClientId = createdClient.ClientId,
                                UserId = verifyUser.Id,
                                ClientNom = createdClient.ClientNom,
                                Email = createdClient.Email,
                                UserName = verifyUser.UserName,
                                IsActive = createdClient.IsActive
                            };

                            _logger.LogInformation("=== FIN CRÉATION CLIENT RÉUSSIE ===");
                            _logger.LogInformation("Résultat final: {@Result}", result);
                            return Ok(result);
                        }
                        else
                        {
                            _logger.LogError("AddAsync a retourné null ou ClientId <= 0");
                            if (createdClient != null)
                            {
                                _logger.LogError("ClientId retourné: {ClientId}", createdClient.ClientId);
                            }
                            await _userManager.DeleteAsync(verifyUser);
                            return StatusCode(500, "Erreur lors de la création du client - service a échoué");
                        }
                    }
                    catch (Exception clientEx)
                    {
                        _logger.LogError(clientEx, "ERREUR détaillée lors de la création du client");
                        _logger.LogError("Type d'exception: {ExceptionType}", clientEx.GetType().Name);
                        _logger.LogError("Message: {Message}", clientEx.Message);
                        _logger.LogError("StackTrace: {StackTrace}", clientEx.StackTrace);
                        
                        if (clientEx.InnerException != null)
                        {
                            _logger.LogError("InnerException: {InnerException}", clientEx.InnerException.Message);
                            _logger.LogError("InnerException StackTrace: {InnerStackTrace}", clientEx.InnerException.StackTrace);
                        }
                        
                        // Nettoyer l'utilisateur créé
                        try
                        {
                            await _userManager.DeleteAsync(verifyUser);
                            _logger.LogInformation("Utilisateur supprimé après échec de création du client");
                        }
                        catch (Exception deleteEx)
                        {
                            _logger.LogError(deleteEx, "Erreur lors de la suppression de l'utilisateur");
                        }
                        
                        return StatusCode(500, $"Erreur lors de la création du client: {clientEx.Message}");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "ERREUR CRITIQUE lors de la création du client");
                    await transaction.RollbackAsync();
                    return StatusCode(500, $"Erreur serveur: {ex.Message}");
                }
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
            _logger.LogInformation("=== DÉBUT MISE À JOUR CLIENT ===");
            _logger.LogInformation("Mise à jour du client {ClientId} avec les données: {@UpdateData}", id, dto);

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

                // 2. Récupérer le client existant
                var existingClient = await _clientService.GetByIdAsync(id, true);
                if (existingClient == null)
                {
                    _logger.LogWarning("Client {ClientId} non trouvé", id);
                    return NotFound("Client non trouvé");
                }

                _logger.LogInformation("Client existant trouvé: {@ExistingClient}", new {
                    existingClient.ClientId,
                    existingClient.Email,
                    existingClient.ClientNom,
                    existingClient.UserId
                });

                // 3. Vérifier l'unicité de l'email si changé
                if (dto.Email != existingClient.Email)
                {
                    _logger.LogInformation("Changement d'email détecté: {OldEmail} -> {NewEmail}", existingClient.Email, dto.Email);
                    
                    var existingUserByEmail = await _userManager.FindByEmailAsync(dto.Email);
                    if (existingUserByEmail != null && existingUserByEmail.Id != existingClient.UserId)
                    {
                        _logger.LogWarning("Email déjà utilisé par un autre utilisateur: {Email}", dto.Email);
                        return BadRequest("Cette adresse email est déjà utilisée par un autre utilisateur");
                    }
                }

                // Sauvegarder l'ancien email pour la mise à jour de l'utilisateur
                var oldEmail = existingClient.Email;

                // 4. Mettre à jour les données du client
                existingClient.Email = dto.Email;
                existingClient.ClientNom = dto.ClientNom;
                existingClient.Adress = dto.Adress ?? "";
                existingClient.Phone = dto.Phone ?? "";
                existingClient.IsActive = dto.IsActive;

                _logger.LogInformation("Données du client mises à jour: {@UpdatedClientData}", new {
                    existingClient.ClientId,
                    existingClient.Email,
                    existingClient.ClientNom,
                    existingClient.Adress,
                    existingClient.Phone,
                    existingClient.IsActive
                });

                // 5. Mettre à jour l'utilisateur associé si l'email a changé
                if (dto.Email != oldEmail && !string.IsNullOrEmpty(existingClient.UserId))
                {
                    var user = await _userManager.FindByIdAsync(existingClient.UserId);
                    if (user != null)
                    {
                        _logger.LogInformation("Mise à jour de l'email utilisateur: {UserId}", user.Id);
                        user.Email = dto.Email;
                        user.NormalizedEmail = dto.Email.ToUpperInvariant();
                        
                        var updateUserResult = await _userManager.UpdateAsync(user);
                        if (!updateUserResult.Succeeded)
                        {
                            var errors = string.Join(", ", updateUserResult.Errors.Select(e => e.Description));
                            _logger.LogError("Échec mise à jour utilisateur: {Errors}", errors);
                            return BadRequest($"Erreur mise à jour utilisateur: {errors}");
                        }
                        _logger.LogInformation("Email utilisateur mis à jour avec succès");
                    }
                }

                // 6. Sauvegarder les modifications du client via le service
                try
                {
                    _logger.LogInformation("Début sauvegarde via ClientService.UpdateAsync");
                    await _clientService.UpdateAsync(existingClient);
                    _logger.LogInformation("ClientService.UpdateAsync terminé avec succès");
                    
                    // Vérifier que la mise à jour a bien eu lieu
                    var verifyUpdate = await _clientService.GetByIdAsync(id, false);
                    if (verifyUpdate == null)
                    {
                        _logger.LogError("Vérification échec: Client non trouvé après mise à jour");
                        throw new Exception("Échec de la mise à jour du client - données non persistées");
                    }
                    
                    if (verifyUpdate.Email != dto.Email || verifyUpdate.ClientNom != dto.ClientNom)
                    {
                        _logger.LogError("Vérification échec: Données non mises à jour. Attendu: Email={ExpectedEmail}, Nom={ExpectedNom}. Actuel: Email={ActualEmail}, Nom={ActualNom}", 
                            dto.Email, dto.ClientNom, verifyUpdate.Email, verifyUpdate.ClientNom);
                        throw new Exception("Échec de la mise à jour du client - données non synchronisées");
                    }
                    
                    _logger.LogInformation("Vérification réussie: Client mis à jour avec succès");
                }
                catch (Exception updateEx)
                {
                    _logger.LogError(updateEx, "ERREUR lors de la mise à jour du client via le service");
                    return StatusCode(500, $"Erreur lors de la mise à jour du client: {updateEx.Message}");
                }

                // Récupérer le client mis à jour pour retourner les données complètes
                var updatedClient = await _clientService.GetByIdAsync(id, true);

                // 7. Retourner le résultat
                var result = new
                {
                    Message = "Client mis à jour avec succès",
                    ClientId = updatedClient.ClientId,
                    Email = updatedClient.Email,
                    ClientNom = updatedClient.ClientNom,
                    Adress = updatedClient.Adress,
                    Phone = updatedClient.Phone,
                    IsActive = updatedClient.IsActive,
                    UserName = updatedClient.User?.UserName
                };

                _logger.LogInformation("=== FIN MISE À JOUR CLIENT RÉUSSIE ===");
                _logger.LogInformation("Résultat final: {@Result}", result);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "ERREUR CRITIQUE lors de la mise à jour du client {ClientId}", id);
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
        public string Email { get; set; } = "";
        public string Adress { get; set; } = "";
        public string Phone { get; set; } = "";
        public string ClientNom { get; set; } = "";
        public bool IsActive { get; set; } = true;


}    }