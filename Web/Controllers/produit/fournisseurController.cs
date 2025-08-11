using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;

namespace Web.Controllers.produit
{
    [ApiController]
    [Route("api/[controller]")]
    public class FournisseurController : ControllerBase
    {
        private readonly IFournisseurService _service;

        public FournisseurController(IFournisseurService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var fournisseurs = await _service.GetAllAsync();
            return Ok(fournisseurs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var fournisseur = await _service.GetByIdAsync(id);
            if (fournisseur == null)
                return NotFound();
            return Ok(fournisseur);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Fournisseur fournisseur)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _service.AddAsync(fournisseur);
            return CreatedAtAction(nameof(GetById), new { id = fournisseur.FournisseurId }, fournisseur);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Fournisseur fournisseur)
        {
            if (id != fournisseur.FournisseurId)
                return BadRequest();

            await _service.UpdateAsync(fournisseur);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}