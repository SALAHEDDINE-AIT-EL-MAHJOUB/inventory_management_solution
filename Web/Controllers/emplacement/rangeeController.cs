using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Web.Controllers.emplacement
{
    [ApiController]
    [Route("api/[controller]")]
    public class RangeeController : ControllerBase
    {
        private readonly IRangeeService _rangeeService;

        public RangeeController(IRangeeService rangeeService)
        {
            _rangeeService = rangeeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rangee>>> GetAll()
        {
            var rangees = await _rangeeService.GetAllAsync();
            return Ok(rangees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rangee>> GetById(int id)
        {
            var rangee = await _rangeeService.GetByIdAsync(id);
            if (rangee == null)
                return NotFound();
            return Ok(rangee);
        }

        // --- Ajout des endpoints pour la sélection hiérarchique ---

        [HttpGet("societes")]
        public async Task<ActionResult<IEnumerable<Societe>>> GetSocietes()
        {
            var societes = await _rangeeService.GetSocietesAsync();
            return Ok(societes);
        }

        [HttpGet("sites/{societeId}")]
        public async Task<ActionResult<IEnumerable<Site>>> GetSitesBySocieteId(int societeId)
        {
            var sites = await _rangeeService.GetSitesBySocieteIdAsync(societeId);
            return Ok(sites);
        }

        [HttpGet("zones/{siteId}")]
        public async Task<ActionResult<IEnumerable<Zone>>> GetZonesBySiteId(int siteId)
        {
            var zones = await _rangeeService.GetZonesBySiteIdAsync(siteId);
            return Ok(zones);
        }

        [HttpGet("allees/{zoneId}")]
        public async Task<ActionResult<IEnumerable<Allee>>> GetAlleesByZoneId(int zoneId)
        {
            var allees = await _rangeeService.GetAlleesByZoneIdAsync(zoneId);
            return Ok(allees);
        }

        // Création d'une rangée avec sélection hiérarchique
        [HttpPost("create")]
        public async Task<ActionResult> CreateRangee([FromBody] CreateRangeeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.RangeeNom) ||
                request.SocieteId <= 0 ||
                request.SiteId <= 0 ||
                request.ZoneId <= 0 ||
                request.AlleeId <= 0)
            {
                return BadRequest("Tous les champs sont obligatoires.");
            }

            await _rangeeService.AddRangeeAsync(
                request.RangeeNom,
                request.SocieteId,
                request.SiteId,
                request.ZoneId,
                request.AlleeId
            );
            return Ok(new { message = "Rangée créée avec succès." });
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Rangee rangee)
        {
            await _rangeeService.AddAsync(rangee);
            return CreatedAtAction(nameof(GetById), new { id = rangee.RangeeId }, rangee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Rangee rangee)
        {
            if (id != rangee.RangeeId)
                return BadRequest();

            await _rangeeService.UpdateAsync(rangee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _rangeeService.DeleteAsync(id);
            return NoContent();
        }
    }

    // DTO pour la création hiérarchique
    public class CreateRangeeRequest
    {
        public string RangeeNom { get; set; }
        public int SocieteId { get; set; }
        public int SiteId { get; set; }
        public int ZoneId { get; set; }
        public int AlleeId { get; set; }
    }
}