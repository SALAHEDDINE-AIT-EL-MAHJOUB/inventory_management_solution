using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.emplacement
{
    [ApiController]
    [Route("api/Zone")]
    public class ZoneController : ControllerBase
    {
        private readonly IZoneService _zoneService;

        public ZoneController(IZoneService zoneService)
        {
            _zoneService = zoneService;
        }

        [HttpGet("by-ids")]
        public async Task<ActionResult<List<Zone>>> GetByIds([FromQuery] List<int?> ids)
        {
            var zones = await _zoneService.GetByIds(ids);
            return Ok(zones);
        }

        [HttpGet("by-client/{clientId}")]
        public async Task<ActionResult<List<Zone>>> GetZoneByClientId(int clientId)
        {
            var zones = await _zoneService.GetZoneByClientId(clientId);
            return Ok(zones);
        }

        [HttpGet("by-site/{siteId}")]
        public async Task<ActionResult<List<Zone>>> GetZoneBySiteId(int siteId)
        {
            var zones = await _zoneService.GetZoneBySiteId(siteId);
            return Ok(zones);
        }

        [HttpGet("by-name")]
        public async Task<ActionResult<List<Zone>>> GetZoneByName([FromQuery] int clientId, [FromQuery] string zoneNom)
        {
            var zones = await _zoneService.GetZoneByName(clientId, zoneNom);
            return Ok(zones);
        }

        [HttpGet("names-by-site")]
        public async Task<ActionResult<List<string>>> GetZoneNamesBySiteName([FromQuery] int clientId, [FromQuery] string siteName)
        {
            var names = await _zoneService.GetZoneNamesBySiteName(clientId, siteName);
            return Ok(names);
        }

        [HttpGet]
        public async Task<ActionResult<List<Zone>>> GetAll()
        {
            var zones = await _zoneService.GetAllAsync();
            return Ok(zones);
        }

        [HttpPost]
        public async Task<ActionResult<Zone>> CreateZone([FromBody] Zone zone)
        {
            var createdZone = await _zoneService.CreateZone(zone);
            return CreatedAtAction(nameof(GetByIds), new { ids = new List<int?> { createdZone.ZoneId } }, createdZone);
        }
        [HttpGet("by-societe-id/{societeId}")]
        public async Task<ActionResult<List<Zone>>> GetZoneBySocieteId(int societeId)
        {
            var zones = await _zoneService.GetZoneBySocieteId(societeId);
            return Ok(zones);
        }

        [HttpGet("by-societe-nom")]
        public async Task<ActionResult<List<Zone>>> GetZoneBySocieteName([FromQuery] string societeNom)
        {
            var zones = await _zoneService.GetZoneBySocieteName(societeNom);
            return Ok(zones);
        }

        // Modifier une zone
        [HttpPut("{id}")]
        public async Task<ActionResult<Zone>> UpdateZone(int id, [FromBody] Zone zone)
        {
            if (id != zone.ZoneId)
                return BadRequest();

            var updated = await _zoneService.UpdateAsync(zone);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        // Supprimer une zone
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZone(int id)
        {
            var result = await _zoneService.DeleteAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}