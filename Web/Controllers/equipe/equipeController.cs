using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

// Ajoutez ce DTO dans un dossier Dtos si besoin
public class EquipeCreateDto
{
    public string Nom { get; set; }
    public string Description { get; set; }
    public int SiteId { get; set; }
    public List<int> OperateurIds { get; set; }
}

public class EquipeWithMembersDto
{
    public int EquipeId { get; set; }
    public string Nom { get; set; }
    public string Description { get; set; }
    public int SiteId { get; set; }
    public List<string> Membres { get; set; }
}

namespace Web.Controllers.equipe
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipeController : ControllerBase
    {
        private readonly IEquipeService _equipeService;
        private readonly IEquipeOperateurService _equipeOperateurService;
        private readonly IInventaireService _inventaireService;

        public EquipeController(IEquipeService equipeService, IEquipeOperateurService equipeOperateurService, IInventaireService inventaireService)
        {
            _equipeService = equipeService;
            _equipeOperateurService = equipeOperateurService;
            _inventaireService = inventaireService;
        }

        // GET: api/Equipe
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipeWithMembersDto>>> GetAll()
        {
            var equipes = await _equipeService.GetAllAsync();
            var result = new List<EquipeWithMembersDto>();

            foreach (var eq in equipes)
            {
                var equipeOperateurs = await _equipeOperateurService.GetByEquipeIdAsync(eq.EquipeId);
                var membres = equipeOperateurs
                    .Select(eo => eo.EquipeOperateurOperateur?.Nom)
                    .Where(nom => !string.IsNullOrEmpty(nom))
                    .ToList();

                result.Add(new EquipeWithMembersDto
                {
                    EquipeId = eq.EquipeId,
                    Nom = eq.Nom,
                    Description = eq.Description,
                    SiteId = eq.SiteId,
                    Membres = membres
                });
            }
            return Ok(result);
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

            // 1. Créer l'équipe (sans EquipeInventaireId pour l'instant)
            var equipe = new Equipe
            {
                Nom = dto.Nom,
                Description = dto.Description,
                SiteId = dto.SiteId
            };
            await _equipeService.AddAsync(equipe);

            // 2. Créer l'inventaire associé à l'équipe (sans ProduitId)
            var inventaire = new Inventaire
            {
                EquipeId = equipe.EquipeId,
                InventaireDate = DateTime.UtcNow,
                InventaireLibelle = $"Inventaire  {dto.Nom}",
                InventaireSiteId = dto.SiteId
                
            };
            await _inventaireService.AddAsync(inventaire);

            // 3. Mettre à jour l'équipe avec l'ID de l'inventaire
            equipe.EquipeInventaireId = inventaire.InventaireId;
            await _equipeService.UpdateAsync(equipe);

            // 4. Ajouter les opérateurs à l'équipe
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

        // PUT: api/Equipe/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EquipeCreateDto dto)
        {
            var equipe = await _equipeService.GetByIdAsync(id);
            if (equipe == null)
                return NotFound();

            equipe.Nom = dto.Nom;
            equipe.Description = dto.Description;
            equipe.SiteId = dto.SiteId;
            await _equipeService.UpdateAsync(equipe);

            // --- Mettre à jour les opérateurs de l'équipe ---
            var anciens = await _equipeOperateurService.GetByEquipeIdAsync(id);
            foreach (var eo in anciens)
                await _equipeOperateurService.DeleteAsync(eo);

            foreach (var operateurId in dto.OperateurIds)
            {
                var nouveau = new EquipeOperateur
                {
                    EquipeOperateurEquipeId = id,
                    EquipeOperateurOperateurId = operateurId
                };
                await _equipeOperateurService.AddAsync(nouveau);
            }

            return NoContent();
        }

        // DELETE: api/Equipe/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var equipe = await _equipeService.GetByIdAsync(id);
            if (equipe == null)
                return NotFound();

            await _equipeService.DeleteAsync(equipe);
            return NoContent();
        }
    }
}