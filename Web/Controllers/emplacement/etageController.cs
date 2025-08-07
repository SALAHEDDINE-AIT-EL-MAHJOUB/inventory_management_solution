using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Web.Controllers.emplacement
{
    [ApiController]
    [Route("api/[controller]")]
    public class EtageController : ControllerBase
    {
        private readonly IEtageService _etageService;

        public EtageController(IEtageService etageService)
        {
            _etageService = etageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Etage>>> GetAll()
        {
            var etages = await _etageService.GetAllAsync();
            return Ok(etages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Etage>> GetById(int id)
        {
            var etage = await _etageService.GetByIdAsync(id);
            if (etage == null)
                return NotFound();
            return Ok(etage);
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Etage etage)
        {
            await _etageService.AddAsync(etage);
            return CreatedAtAction(nameof(GetById), new { id = etage.Id }, etage);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Etage etage)
        {
            if (id != etage.Id)
                return BadRequest();

            await _etageService.UpdateAsync(etage);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var etage = await _etageService.GetByIdAsync(id);
            if (etage == null)
                return NotFound();

            await _etageService.DeleteAsync(etage);
            return NoContent();
        }
    }
}