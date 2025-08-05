using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.emplacement
{
    [ApiController]
    [Route("api/[controller]")]
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

      
        [HttpPost]
        public async Task<ActionResult<Zone>> CreateZone([FromBody] Zone zone)
        {
            var createdZone = await _zoneService.CreateZone(zone);
            return CreatedAtAction(nameof(GetByIds), new { ids = new List<int?> { createdZone.ZoneId } }, createdZone);
        }
    }
}