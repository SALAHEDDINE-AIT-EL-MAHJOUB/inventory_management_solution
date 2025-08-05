using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Web.Controllers.client
{
    [ApiController]
    [Route("api/[controller]")]
    public class VilleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VilleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ville
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ville>>> GetVilles()
        {
            var villes = await _context.Villes
                .Include(v => v.Region)
                .ToListAsync();
            return Ok(villes);
        }

        // GET: api/ville/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ville>> GetVille(int id)
        {
            var ville = await _context.Villes
                .Include(v => v.Region)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (ville == null)
                return NotFound();

            return Ok(ville);
        }

        // POST: api/ville
        [HttpPost]
        public async Task<ActionResult<Domain.Entities.Ville>> CreateVille([FromBody] Domain.Entities.Ville ville)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Villes.Add(ville);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVille), new { id = ville.Id }, ville);
        }

        // PUT: api/ville/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVille(int id, [FromBody] Ville ville)
        {
            if (id != ville.Id)
                return BadRequest();

            _context.Entry(ville).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/ville/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVille(int id)
        {
            var ville = await _context.Villes.FindAsync(id);
            if (ville == null)
                return NotFound();

            _context.Villes.Remove(ville);
            await _context.SaveChangesAsync();
            return NoContent();
        }

       
    }

    
}