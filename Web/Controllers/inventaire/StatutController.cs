using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.inventaire
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatutController : ControllerBase
    {
        private readonly IStatutService _statutService;

        public StatutController(IStatutService statutService)
        {
            _statutService = statutService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Statut>>> GetAll()
        {
            try
            {
                var statuts = await _statutService.GetAllAsync();
                return Ok(statuts);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur StatutController : " + ex.ToString());
                return StatusCode(500, $"Erreur serveur : {ex.Message}");
            }
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Statut API OK");
        }
    }
}