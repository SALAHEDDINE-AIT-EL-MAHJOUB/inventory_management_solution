using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            var allees = await _alleeService.GetAllAsync();
            var result = allees.Select(a => new {
                a.AlleeId,
                a.AlleeNom,
                a.AlleeZoneId,
                zoneNom = a.AlleeZone != null ? a.AlleeZone.ZoneNom : a.ZoneNom,
                siteNom = a.AlleeZone != null && a.AlleeZone.ZoneSite != null ? a.AlleeZone.ZoneSite.SiteNom : a.SiteNom,
                societeNom = a.AlleeZone != null && a.AlleeZone.ZoneSite != null && a.AlleeZone.ZoneSite.Societe != null
                    ? a.AlleeZone.ZoneSite.Societe.Nom
                    : a.SocieteNom
            });
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetById(int id)
        {
            var allee = await _alleeService.GetByIdWithSiteAndSocieteAsync(id);
            if (allee == null)
                return NotFound();
            return Ok(new {
                allee.AlleeId,
                allee.AlleeNom,
                allee.AlleeZoneId,
                zoneNom = allee.AlleeZone?.ZoneNom ?? allee.ZoneNom,
                siteNom = allee.AlleeZone?.ZoneSite?.SiteNom ?? allee.SiteNom,
                societeNom = allee.AlleeZone?.ZoneSite?.Societe?.Nom ?? allee.SocieteNom
            });
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create([FromBody] Allee allee)
        {
            if (allee.AlleeZoneId == null)
                return BadRequest("Zone obligatoire");

            // Charger la zone avec site et société
            var zone = await _zoneService.GetByIdWithSiteAndSocieteAsync(allee.AlleeZoneId.Value);
            if (zone == null)
                return BadRequest("Zone introuvable");

            allee.ZoneNom = zone.ZoneNom;
            allee.SiteNom = zone.ZoneSite?.SiteNom;
            allee.SocieteNom = zone.ZoneSite?.Societe?.Nom;

            // Correction : affecter les IDs liés
            allee.SiteId = zone.ZoneSite?.Id; // <-- Remplacez SiteId par Id
            allee.SocieteId = zone.ZoneSite?.Societe?.Id; // <-- Remplacez SocieteId par Id
            allee.SiteNom = zone.ZoneSite?.SiteNom;
            allee.SocieteNom = zone.ZoneSite?.Societe?.Nom;

            await _alleeService.AddAsync(allee);

            // Récupérer l'entité insérée avec ses relations pour retourner les bons noms
            var created = await _alleeService.GetByIdWithSiteAndSocieteAsync(allee.AlleeId);

            return Ok(new {
                created.AlleeId,
                created.AlleeNom,
                created.AlleeZoneId,
                zoneNom = created.AlleeZone?.ZoneNom ?? created.ZoneNom,
                siteNom = created.AlleeZone?.ZoneSite?.SiteNom ?? created.SiteNom,
                societeNom = created.AlleeZone?.ZoneSite?.Societe?.Nom ?? created.SocieteNom
            });
        }

        [HttpGet("by-client/{clientId}")]
        public async Task<ActionResult<List<Allee>>> GetAlleeByClientId(int clientId)
        {
            var allees = await _alleeService.GetAlleeByClientId(clientId);
            return Ok(allees);
        }

        [HttpGet("by-zone/{zoneId}")]
        public async Task<ActionResult<List<object>>> GetAlleeByZoneId(int zoneId)
        {
            var allees = await _alleeService.GetAlleeByZoneId(zoneId);
            var result = allees.Select(a => new {
                alleeId = a.AlleeId,
                alleeNom = a.AlleeNom,
                zoneNom = a.AlleeZone?.ZoneNom ?? a.ZoneNom,
                siteNom = a.AlleeZone?.ZoneSite?.SiteNom ?? a.SiteNom,
                societeNom = a.AlleeZone?.ZoneSite?.Societe?.Nom ?? a.SocieteNom
            }).ToList();
            return Ok(result);
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