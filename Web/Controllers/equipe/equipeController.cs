using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

// Ajoutez ce DTO dans un dossier Dtos si besoin
public class EquipeCreateDto
{
    public string Nom { get; set; }
    public string Description { get; set; }
    public int SiteId { get; set; }
    public List<int> OperateurIds { get; set; }
}

namespace Web.Controllers.equipe
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeController : ControllerBase
    {
        private readonly IEquipeService _equipeService;
        private readonly IEquipeOperateurService _equipeOperateurService;

        public EquipeController(IEquipeService equipeService, IEquipeOperateurService equipeOperateurService)
        {
            _equipeService = equipeService;
            _equipeOperateurService = equipeOperateurService;
        }

        // GET: api/Equipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipe>>> GetAll()
        {
            var equipes = await _equipeService.GetAllAsync();
            return Ok(equipes);
        }

        // GET: api/Equipe/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Equipe>> GetById(int id)
        {
            var equipe = await _equipeService.GetByIdAsync(id);
            if (equipe == null)
                return NotFound();
            return Ok(equipe);
        }

        // POST: api/Equipe
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] EquipeCreateDto dto)
        {
            if (dto == null || dto.OperateurIds == null || dto.OperateurIds.Count == 0)
                return BadRequest("Opérateurs requis.");

            var equipe = new Equipe
            {
                Nom = dto.Nom,
                Description = dto.Description,
                SiteId = dto.SiteId
            };

            await _equipeService.AddAsync(equipe);

            // Ajoute les opérateurs à l’équipe
            foreach (var operateurId in dto.OperateurIds)
            {
                var equipeOperateur = new EquipeOperateur
                {
                    EquipeOperateurEquipeId = equipe.EquipeId,
                    EquipeOperateurOperateurId = operateurId
                };
                await _equipeOperateurService.AddAsync(equipeOperateur);
            }

            return CreatedAtAction(nameof(GetById), new { id = equipe.EquipeId }, equipe);
        }
    }
}