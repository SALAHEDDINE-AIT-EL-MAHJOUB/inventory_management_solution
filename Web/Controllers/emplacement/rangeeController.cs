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
}