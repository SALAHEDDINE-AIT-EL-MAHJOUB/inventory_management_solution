using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CodeBarreCommercialController : ControllerBase
    {
        private readonly ICodeBarreCommercialService _service;

        public CodeBarreCommercialController(ICodeBarreCommercialService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CodeBarreCommercial>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CodeBarreCommercial>> GetById(int id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpGet("bycode/{code}")]
        public async Task<ActionResult<CodeBarreCommercial>> GetByCode(string code)
        {
            var entity = await _service.GetByCodeAsync(code);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult> Add(CodeBarreCommercial entity)
        {
            await _service.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.CommercialId }, entity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, CodeBarreCommercial entity)
        {
            if (id != entity.CommercialId)
                return BadRequest();

            await _service.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
                return NotFound();
            await _service.DeleteAsync(entity);
            return NoContent();
        }
    }
}