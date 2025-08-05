using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlleeController : ControllerBase
    {
        private readonly IAlleeService _alleeService;

        public AlleeController(IAlleeService alleeService)
        {
            _alleeService = alleeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Allee>>> GetAll()
        {
            var allees = await _alleeService.GetAllAsync();
            return Ok(allees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Allee>> GetById(int id)
        {
            var allee = await _alleeService.GetByIdAsync(id);
            if (allee == null)
                return NotFound();
            return Ok(allee);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Allee allee)
        {
            await _alleeService.AddAsync(allee);
            return Ok(allee);
        }

        [HttpGet("client/{clientId}")]
        public async Task<ActionResult<List<Allee>>> GetByClientId(int clientId)
        {
            var allees = await _alleeService.GetAlleeByClientId(clientId);
            return Ok(allees);
        }

        [HttpGet("zone/{zoneId}")]
        public async Task<ActionResult<List<Allee>>> GetByZoneId(int zoneId)
        {
            var allees = await _alleeService.GetAlleeByZoneId(zoneId);
            return Ok(allees);
        }

        [HttpPost("ids")]
        public async Task<ActionResult<List<Allee>>> GetByIds([FromBody] List<int?> ids)
        {
            var allees = await _alleeService.GetByIds(ids);
            return Ok(allees);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<Allee>>> GetByName([FromQuery] int clientId, [FromQuery] string alleeNom)
        {
            var allees = await _alleeService.GetAlleeByName(clientId, alleeNom);
            return Ok(allees);
        }

        [HttpGet("zone-names")]
        public async Task<ActionResult<List<string>>> GetAlleeNamesByZoneName([FromQuery] int clientId, [FromQuery] string zoneName)
        {
            var names = await _alleeService.GetAlleeNamesByZoneName(clientId, zoneName);
            return Ok(names);
        }
    }
}