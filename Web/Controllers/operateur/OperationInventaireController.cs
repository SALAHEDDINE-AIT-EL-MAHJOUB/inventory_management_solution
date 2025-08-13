using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.operateur
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperationInventaireController : ControllerBase
    {
        private readonly IOperationInventaireService _service;

        public OperationInventaireController(IOperationInventaireService service)
        {
            _service = service;
        }

        // GET: api/OperationInventaire
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OperationInventaire>>> GetAll()
        {
            var operations = await _service.GetAllAsync();
            return Ok(operations);
        }

        // GET: api/OperationInventaire/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OperationInventaire>> GetById(int id)
        {
            var operation = await _service.GetByIdAsync(id);
            if (operation == null)
                return NotFound();
            return Ok(operation);
        }

        // GET: api/OperationInventaire/zone/{zoneId}
        [HttpGet("zone/{zoneId}")]
        public async Task<ActionResult<IEnumerable<OperationInventaire>>> GetByZone(int zoneId)
        {
            var operations = await _service.GetByZoneIdAsync(zoneId);
            return Ok(operations);
        }

        // GET: api/OperationInventaire/inventaire/{inventaireId}
        [HttpGet("inventaire/{inventaireId}")]
        public async Task<ActionResult<IEnumerable<OperationInventaire>>> GetByInventaire(int inventaireId)
        {
            var operations = await _service.GetByInventaireIdAsync(inventaireId);
            return Ok(operations);
        }

        // POST: api/OperationInventaire
        [HttpPost]
        public async Task<ActionResult> Add([FromBody] OperationInventaire entity)
        {
            await _service.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.OperationInventaireId }, entity);
        }

        // PUT: api/OperationInventaire/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] OperationInventaire entity)
        {
            if (id != entity.OperationInventaireId)
                return BadRequest();
            await _service.UpdateAsync(entity);
            return NoContent();
        }

        // DELETE: api/OperationInventaire/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}