using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlleeController : ControllerBase
    {
        private readonly IAlleeService _alleeService;
        private readonly IZoneService _zoneService;

        public AlleeController(IAlleeService alleeService, IZoneService zoneService)
        {
            _alleeService = alleeService;
            _zoneService = zoneService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Allee>>> GetAll()
        {
            var allees = await _alleeService.GetAllAsync();
            return Ok(allees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Allee>> GetById(int id)
        {
            var allee = await _alleeService.GetByIdAsync(id);
            if (allee == null)
                return NotFound();
            return Ok(allee);
        }

        [HttpPost]
        public async Task<ActionResult<Allee>> Create([FromBody] Allee allee)
        {
            try
            {
                if (allee.AlleeZoneId == null)
                    return BadRequest("ZoneId is required.");

                var zone = await _zoneService.GetByIdAsync(allee.AlleeZoneId.Value);
                if (zone == null)
                    return BadRequest("Zone not found.");

                // Ensure navigation properties are not set to avoid EF tracking issues
                allee.AlleeZone = null;
                allee.CodeBarreAllee = null;

                await _alleeService.AddAsync(allee);
                return CreatedAtAction(nameof(GetById), new { id = allee.AlleeId }, allee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("by-client/{clientId}")]
        public async Task<ActionResult<List<Allee>>> GetAlleeByClientId(int clientId)
        {
            var allees = await _alleeService.GetAlleeByClientId(clientId);
            return Ok(allees);
        }

        [HttpGet("by-zone/{zoneId}")]
        public async Task<ActionResult<List<Allee>>> GetAlleeByZoneId(int zoneId)
        {
            var allees = await _alleeService.GetAlleeByZoneId(zoneId);
            return Ok(allees);
        }

        [HttpGet("by-name")]
        public async Task<ActionResult<List<Allee>>> GetAlleeByName([FromQuery] int clientId, [FromQuery] string alleeNom)
        {
            var allees = await _alleeService.GetAlleeByName(clientId, alleeNom);
            return Ok(allees);
        }

        [HttpGet("names-by-zone")]
        public async Task<ActionResult<List<string>>> GetAlleeNamesByZoneName([FromQuery] int clientId, [FromQuery] string zoneName)
        {
            var names = await _alleeService.GetAlleeNamesByZoneName(clientId, zoneName);
            return Ok(names);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var allee = await _alleeService.GetByIdAsync(id);
            if (allee == null)
                return NotFound();

            await _alleeService.DeleteAsync(id);
            return NoContent();
        }
    }
}