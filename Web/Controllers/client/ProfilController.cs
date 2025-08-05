using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Security.Claims;

namespace Web.Controllers.client
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ProfilController(IClientService clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Récupère le profil du client connecté
        /// </summary>
        /// <returns>Les informations du profil client</returns>
        [HttpGet("me")]
        [AllowAnonymous] // Temporairement pour tester
        public async Task<IActionResult> GetMyProfile()
        {
            try
            {
                // Pour le debug, essayons d'abord de récupérer depuis localStorage côté client
                // ou utiliser l'email depuis la session/token
                
                // Récupérer l'email depuis les claims
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                
                if (string.IsNullOrEmpty(userEmail))
                {
                    // Si pas d'email dans les claims, essayer l'ID utilisateur
                    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    
                    if (string.IsNullOrEmpty(userId))
                    {
                        return Unauthorized("Utilisateur non authentifié");
                    }
                    
                    // Récupérer le client par son UserId
                    var clientByUserId = await _clientService.GetClientUserById(userId);
                    
                    if (clientByUserId == null)
                    {
                        return NotFound("Client non trouvé par UserId");
                    }
                    
                    return Ok(new
                    {
                        Client = new
                        {
                            ClientId = clientByUserId.ClientId,
                            ClientNom = clientByUserId.ClientNom,
                            Email = clientByUserId.Email,
                            Phone = clientByUserId.Phone,
                            Adress = clientByUserId.Adress,
                            IsActive = clientByUserId.IsActive,
                            ClientDateCreation = clientByUserId.ClientDateCreation,
                            ClientDateInactif = clientByUserId.ClientDateInactif
                        }
                    });
                }

                // Récupérer le client par email
                var client = await _clientService.GetClientByEmail(userEmail);
                
                if (client == null)
                {
                    return NotFound("Client non trouvé par email");
                }

                // Retourner les informations du profil
                var profileData = new
                {
                    Client = new
                    {
                        ClientId = client.ClientId,
                        ClientNom = client.ClientNom,
                        Email = client.Email,
                        Phone = client.Phone,
                        Adress = client.Adress,
                        IsActive = client.IsActive,
                        ClientDateCreation = client.ClientDateCreation,
                        ClientDateInactif = client.ClientDateInactif
                    }
                };

                return Ok(profileData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne: {ex.Message}");
            }
        }

        /// <summary>
        /// Version alternative qui accepte l'email comme paramètre
        /// </summary>
        [HttpPost("get-by-email")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProfileByEmail([FromBody] EmailRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest("Email requis");
                }

                var client = await _clientService.GetClientByEmail(request.Email);
                
                if (client == null)
                {
                    return NotFound("Client non trouvé");
                }

                var profileData = new
                {
                    Client = new
                    {
                        ClientId = client.ClientId,
                        ClientNom = client.ClientNom,
                        Email = client.Email,
                        Phone = client.Phone,
                        Adress = client.Adress,
                        IsActive = client.IsActive,
                        ClientDateCreation = client.ClientDateCreation,
                        ClientDateInactif = client.ClientDateInactif
                    }
                };

                return Ok(profileData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne: {ex.Message}");
            }
        }

        /// <summary>
        /// Met à jour le profil du client connecté
        /// </summary>
        [HttpPut("update")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequest updateRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(updateRequest.Email))
                {
                    return BadRequest("Email requis pour la mise à jour");
                }

                // Récupérer le client par email
                var client = await _clientService.GetClientByEmail(updateRequest.Email);
                
                if (client == null)
                {
                    return NotFound("Client non trouvé");
                }

                // Mettre à jour les informations modifiables
                if (!string.IsNullOrEmpty(updateRequest.ClientNom))
                    client.ClientNom = updateRequest.ClientNom;
                
                if (!string.IsNullOrEmpty(updateRequest.Phone))
                    client.Phone = updateRequest.Phone;
                
                if (!string.IsNullOrEmpty(updateRequest.Adress))
                    client.Adress = updateRequest.Adress;

                // Sauvegarder les modifications
                await _clientService.UpdateAsync(client);

                // Retourner le profil mis à jour
                var updatedProfileData = new
                {
                    Client = new
                    {
                        ClientId = client.ClientId,
                        ClientNom = client.ClientNom,
                        Email = client.Email,
                        Phone = client.Phone,
                        Adress = client.Adress,
                        IsActive = client.IsActive,
                        ClientDateCreation = client.ClientDateCreation,
                        ClientDateInactif = client.ClientDateInactif
                    }
                };

                return Ok(updatedProfileData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la mise à jour: {ex.Message}");
            }
        }
    }

    public class UpdateProfileRequest
    {
        public string? Email { get; set; } // Ajouté pour identifier le client
        public string? ClientNom { get; set; }
        public string? Phone { get; set; }
        public string? Adress { get; set; }
    }

    public class EmailRequest
    {
        public string Email { get; set; }
    }
}