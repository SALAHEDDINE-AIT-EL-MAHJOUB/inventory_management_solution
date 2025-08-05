using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Service.IServices;

namespace Web.Controllers.client
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegionController : ControllerBase
    {
        private readonly IRegionService _service;

        public RegionController(IRegionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Region>>> GetRegions()
        {
            var regions = await _service.GetAllAsync();
            return Ok(regions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Region>> GetRegion(int id)
        {
            var region = await _service.GetByIdAsync(id);
            if (region == null)
                return NotFound();
            return Ok(region);
        }

        [HttpPost]
        public async Task<ActionResult<Region>> CreateRegion([FromBody] Region region)
        {
            var created = await _service.AddAsync(region);
            return CreatedAtAction(nameof(GetRegion), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRegion(int id, [FromBody] Region region)
        {
            if (id != region.Id)
                return BadRequest();
            await _service.UpdateAsync(region);
            return NoContent();
        }
         // DELETE: api/ville/regions/5
        [HttpDelete("regions/{id}")]
        public async Task<IActionResult> DeleteRegion(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

    }
}