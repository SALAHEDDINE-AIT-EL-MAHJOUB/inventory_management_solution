using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Web.Controllers.inventaire
{
    [Route("api/typeinventaire")]
    [ApiController]
    public class TypeInventaireController : ControllerBase
    {
        private readonly ITypeInventaireService _service;

        public TypeInventaireController(ITypeInventaireService service)
        {
            _service = service;
        }

        // GET: api/typeinventaire
        [HttpGet]
        public ActionResult<List<TypeInventaire>> GetAll()
        {
            var types = _service.ObtenirTous();
            return Ok(types);
        }

        // POST: api/typeinventaire
        public class TypeInventaireCreateDto
        {
            public string Libelle { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<TypeInventaire>> Import([FromBody] TypeInventaireCreateDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Libelle))
                return BadRequest("Libellé requis.");

            await _service.AjouterTypeInventaireAsync(dto.Libelle);

            // Optionnel : retourner le nouvel objet (ici simplifié)
            var types = _service.ObtenirTous();
            var created = types.Find(t => t.TypeInventaireLibelle == dto.Libelle);
            return Ok(created);
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("OK");
        }
    }
}