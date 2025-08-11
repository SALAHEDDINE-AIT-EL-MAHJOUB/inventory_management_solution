using Microsoft.AspNetCore.Mvc;
using Service.IServices;

namespace Web.Controllers.Import
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImportController : ControllerBase
    {
        private readonly IInventaireService _inventaireService;

        public ImportController(IInventaireService inventaireService)
        {
            _inventaireService = inventaireService;
        }

        [HttpGet("statuts")]
        public async Task<IActionResult> ImportStatuts()
        {
            var statuts = await _inventaireService.GetStatutsAsync();
            return Ok(statuts);
        }

        [HttpGet("types")]
        public async Task<IActionResult> ImportTypes()
        {
            var types = await _inventaireService.GetTypesAsync();
            return Ok(types);
        }
    }
}