using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Web.Controllers.inventaire
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventaireController : ControllerBase
    {
        private readonly IInventaireService _inventaireService;

        public InventaireController(IInventaireService inventaireService)
        {
            _inventaireService = inventaireService;
        }

        // GET: api/inventaire
        [HttpGet]
        public async Task<ActionResult<List<Inventaire>>> GetAll()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            return Ok(inventaires);
        }

        // GET: api/inventaire/statut-counts
        [HttpGet("statut-counts")]
        public async Task<ActionResult<Dictionary<string, int>>> GetInventaireStatutCounts()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            var counts = inventaires
                .GroupBy(i => i.InventaireStatut?.StatutNom ?? "Inconnu") // <-- Utilise StatutNom
                .ToDictionary(g => g.Key, g => g.Count());
            return Ok(counts);
        }

        // GET: api/inventaire/type-counts
        [HttpGet("type-counts")]
        public async Task<ActionResult<Dictionary<string, int>>> GetInventaireTypeCounts()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            var counts = inventaires
                .GroupBy(i => i.InventaireTypeInventaire?.TypeInventaireLibelle ?? "Inconnu")
                .ToDictionary(g => g.Key, g => g.Count());
            return Ok(counts);
        }

        // PUT: api/inventaire/{id}/statut
        public class UpdateStatutDto
        {
            public int StatutId { get; set; }
        }

        [HttpPut("{id}/statut")]
        public async Task<IActionResult> UpdateStatut(int id, [FromBody] UpdateStatutDto dto)
        {
            if (dto == null)
                return BadRequest("Données manquantes.");

            var result = await _inventaireService.UpdateStatutAsync(id, dto.StatutId);
            if (!result)
                return NotFound("Inventaire non trouvé ou erreur de mise à jour.");

            return NoContent();
        }

        // PUT: api/inventaire/{id}/type
        public class UpdateTypeDto
        {
            public int TypeInventaireId { get; set; }
        }

        [HttpPut("{id}/type")]
        public async Task<IActionResult> UpdateType(int id, [FromBody] UpdateTypeDto dto)
        {
            if (dto == null)
                return BadRequest("Données manquantes.");

            var result = await _inventaireService.UpdateTypeAsync(id, dto.TypeInventaireId);
            if (!result)
                return NotFound("Inventaire non trouvé ou erreur de mise à jour.");

            return NoContent();
        }
    }
}