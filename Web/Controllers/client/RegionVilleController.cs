using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Web.Controllers.client
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegionVilleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegionVilleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ----------- REGION ENDPOINTS -----------

        // GET: api/regionville/regions
        [HttpGet("regions")]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegions()
        {
            var regions = await _context.Regions
                .Include(r => r.Villes)
                .ToListAsync();
            return Ok(regions);
        }

        // GET: api/regionville/regions/5
        [HttpGet("regions/{id}")]
        public async Task<ActionResult<Region>> GetRegion(int id)
        {
            var region = await _context.Regions
                .Include(r => r.Villes)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (region == null)
                return NotFound();

            return Ok(region);
        }

        // POST: api/regionville/regions
        [HttpPost("regions")]
        public async Task<ActionResult<Region>> CreateRegion([FromBody] Region region)
        {
            _context.Regions.Add(region);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRegion), new { id = region.Id }, region);
        }

        // PUT: api/regionville/regions/5
        [HttpPut("regions/{id}")]
        public async Task<IActionResult> UpdateRegion(int id, [FromBody] Region region)
        {
            if (id != region.Id)
                return BadRequest();

            _context.Entry(region).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/regionville/regions/5
        [HttpDelete("regions/{id}")]
        public async Task<IActionResult> DeleteRegion(int id)
        {
            var region = await _context.Regions.FindAsync(id);
            if (region == null)
                return NotFound();

            _context.Regions.Remove(region);
            await _context.SaveChangesAsync();
            return NoContent();
        }
      
    }
}