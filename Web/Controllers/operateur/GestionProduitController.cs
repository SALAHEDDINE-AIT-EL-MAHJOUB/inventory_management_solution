using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GestionProduitController : ControllerBase
    {
        private readonly IGestionProduitService _service;

        public GestionProduitController(IGestionProduitService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var produits = await _service.GetAllAsync();
            return Ok(produits);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var produit = await _service.GetByIdAsync(id);
            if (produit == null)
                return NotFound();
            return Ok(produit);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] GestionProduit produit)
        {
            await _service.AddAsync(produit);
            return CreatedAtAction(nameof(GetById), new { id = produit.Id }, produit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GestionProduit produit)
        {
            if (id != produit.Id)
                return BadRequest();

            await _service.UpdateAsync(produit);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

       
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string term)
        {
            var result = await _service.SearchByCodeBarreOrProduitNomAsync(term);
            return Ok(result);
        }
    }
}