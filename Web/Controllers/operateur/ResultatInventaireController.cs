using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Service.IServices;
using System.Threading.Tasks;
using System.Collections.Generic;
using Web.Dto;

namespace Web.Controllers.operateur
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultatInventaireController : ControllerBase
    {
        private readonly IResultatInventaireService _service;

        public ResultatInventaireController(IResultatInventaireService service)
        {
            _service = service;
        }

        // GET: api/ResultatInventaire
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultatInventaire>>> GetAll()
        {
            var resultats = await _service.GetAllAsync();
            return Ok(resultats);
        }

        // GET: api/ResultatInventaire/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ResultatInventaire>> GetById(int id)
        {
            var resultat = await _service.GetByIdAsync(id);
            if (resultat == null)
                return NotFound();
            return Ok(resultat);
        }

        // GET: api/ResultatInventaire/produit/{produitId}
        [HttpGet("produit/{produitId}")]
        public async Task<ActionResult<IEnumerable<ResultatInventaire>>> GetByProduit(int produitId)
        {
            var resultats = await _service.GetByProduitIdAsync(produitId);
            return Ok(resultats);
        }

        // GET: api/ResultatInventaire/inventaire/{inventaireId}
        [HttpGet("inventaire/{inventaireId}")]
        public async Task<ActionResult<IEnumerable<ResultatInventaire>>> GetByInventaire(int inventaireId)
        {
            var resultats = await _service.GetByInventaireIdAsync(inventaireId);
            return Ok(resultats);
        }

        // POST: api/ResultatInventaire
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] ResultatInventaire entity)
        {
            await _service.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.ResultatInventaireId }, entity);
        }

        // POST: api/ResultatInventaire/assign
        [HttpPost("assign")]
        public async Task<ActionResult<ResultatInventaire>> AssignerProduit([FromBody] AssignProduitDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.GestionProduitId <= 0)
                return BadRequest("Le produit est obligatoire.");

            try
            {
                var resultat = await _service.AssignerProduitAsync(dto.GestionProduitId, dto.EquipeId, dto.OperateurId);
                return CreatedAtAction(nameof(GetById), new { id = resultat.ResultatInventaireId }, resultat);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT: api/ResultatInventaire/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] ResultatInventaire entity)
        {
            if (id != entity.ResultatInventaireId)
                return BadRequest();
            await _service.UpdateAsync(entity);
            return NoContent();
        }

        // DELETE: api/ResultatInventaire/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}