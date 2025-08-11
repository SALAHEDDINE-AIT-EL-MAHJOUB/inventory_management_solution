using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using System.Threading.Tasks;

namespace Web.Controllers.stats
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly IStatsService _statsService;

        public StatsController(IStatsService statsService)
        {
            _statsService = statsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            var stats = await _statsService.GetGeneralStatsAsync();
            return Ok(stats);
        }
    }
}