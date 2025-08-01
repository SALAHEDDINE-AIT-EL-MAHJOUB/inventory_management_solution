using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Security.Claims;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Client")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly ILogger<ClientController> _logger;

        public ClientController(IClientService clientService, ILogger<ClientController> logger)
        {
            _clientService = clientService;
            _logger = logger;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetClientDashboard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var client = await _clientService.GetClientUserById(userId);

            if (client == null)
                return NotFound("Profil client non trouvé");

            return Ok(new
            {
                ClientInfo = new
                {
                    client.ClientNom,
                    client.Email,
                    client.Adress,
                    client.Phone,
                    client.ClientDateCreation,
                    client.IsActive
                },
                // Ajouter ici les fonctionnalités spécifiques au client
                // comme ses inventaires, ses sites, etc.
            });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var client = await _clientService.GetClientUserById(userId);

            if (client == null)
                return NotFound();

            return Ok(new
            {
                client.ClientId,
                client.ClientNom,
                client.Email,
                client.Adress,
                client.Phone,
                client.ClientDateCreation,
                client.IsActive,
                UserName = client.User?.UserName
            });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateClientProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var client = await _clientService.GetClientUserById(userId);

            if (client == null)
                return NotFound();

            // Mettre à jour les informations
            client.ClientNom = dto.ClientNom ?? client.ClientNom;
            client.Adress = dto.Adress ?? client.Adress;
            client.Phone = dto.Phone ?? client.Phone;

            await _clientService.UpdateAsync(client);

            return Ok("Profil mis à jour avec succès");
        }
    }

    public class UpdateClientProfileDto
    {
        public string ClientNom { get; set; }
        public string Adress { get; set; }
        public string Phone { get; set; }
    }
}