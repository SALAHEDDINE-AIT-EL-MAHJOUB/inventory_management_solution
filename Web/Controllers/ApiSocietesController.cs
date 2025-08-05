using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/societes")]
    [ApiController]
    public class ApiSocietesController : ControllerBase
    {
        private readonly ISocieteService _societeService;

        public ApiSocietesController(ISocieteService societeService)
        {
            _societeService = societeService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Societe societe)
        {
            try
            {
                // Add this line for debugging
                Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(societe));

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var created = await _societeService.CreateSociete(societe);
                return Ok(created);
            }
            catch (Exception ex)
            {
                // Log the exception (use your logger)
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetByClientId(int clientId)
        {
            var societes = await _societeService.GetSocieteByClientId(clientId);
            return Ok(societes);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] Societe societe)
        {
            if (id != societe.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _societeService.UpdateSociete(societe);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _societeService.DeleteSociete(id);
            return NoContent();
        }
    }
}