using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Web.Controllers.inventaire
{
    [ApiController]
    [Route("api/inventaire")]
    public class InventaireController : ControllerBase
    {
        private readonly IInventaireService _inventaireService;
        private readonly IGestionInventaireService _gestionInventaireService;
        private readonly IProduitService _produitService; // Ajoutez cette ligne

        public InventaireController(
            IInventaireService inventaireService,
            IGestionInventaireService gestionInventaireService,
            IProduitService produitService // Ajoutez ce paramètre
        )
        {
            _inventaireService = inventaireService;
            _gestionInventaireService = gestionInventaireService;
            _produitService = produitService; // Ajoutez cette ligne
        }

        // GET: api/inventaire
        [HttpGet]
        public async Task<ActionResult<List<Inventaire>>> GetAll()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            return Ok(inventaires);
        }

        // GET: api/inventaire/statut-counts
        [HttpGet("statut-counts")]
        public async Task<ActionResult<Dictionary<string, int>>> GetInventaireStatutCounts()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            var counts = inventaires
                .GroupBy(i => i.InventaireStatut?.StatutNom ?? "Inconnu") // <-- Utilise StatutNom
                .ToDictionary(g => g.Key, g => g.Count());
            return Ok(counts);
        }

        // GET: api/inventaire/type-counts
        [HttpGet("type-counts")]
        public async Task<ActionResult<Dictionary<string, int>>> GetInventaireTypeCounts()
        {
            var inventaires = await _inventaireService.GetAllAsync();
            var counts = inventaires
                .GroupBy(i => i.InventaireTypeInventaire?.TypeInventaireLibelle ?? "Inconnu")
                .ToDictionary(g => g.Key, g => g.Count());
            return Ok(counts);
        }

        // PUT: api/inventaire/{id}/statut
        public class UpdateStatutDto
        {
            public int StatutId { get; set; }
        }

        [HttpPut("{id}/statut")]
        public async Task<IActionResult> UpdateStatut(int id, [FromBody] UpdateStatutDto dto)
        {
            if (dto == null)
                return BadRequest("Données manquantes.");

            var result = await _inventaireService.UpdateStatutAsync(id, dto.StatutId);
            if (!result)
                return NotFound("Inventaire non trouvé ou erreur de mise à jour.");

            return NoContent();
        }

        // PUT: api/inventaire/{id}/type
        public class UpdateTypeDto
        {
            public int TypeInventaireId { get; set; }
        }

        [HttpPut("{id}/type")]
        public async Task<IActionResult> UpdateType(int id, [FromBody] UpdateTypeDto dto)
        {
            if (dto == null)
                return BadRequest("Données manquantes.");

            var result = await _inventaireService.UpdateTypeAsync(id, dto.TypeInventaireId);
            if (!result)
                return NotFound("Inventaire non trouvé ou erreur de mise à jour.");

            return NoContent();
        }
 
        // PUT: api/inventaire/{id}/produit
        public class AffecterProduitDto
        {
            public int ProduitId { get; set; }
        }

        [HttpPut("{id}/produit")]
        public async Task<IActionResult> AffecterProduit(int id, [FromBody] AffecterProduitDto dto)
        {
            if (dto == null)
                return BadRequest("Données manquantes.");

            // 1. Affecter le produit à l'inventaire (logique existante)
            var result = await _inventaireService.AffecterProduitAsync(id, dto.ProduitId);
            if (!result)
                return NotFound("Inventaire ou produit non trouvé.");

            // 2. Vérifier si une entrée GestionInventaire existe déjà
            var allGestion = await _gestionInventaireService.GetAllAsync();
            var existant = allGestion.FirstOrDefault(g => g.InventaireId == id && g.ProduitId == dto.ProduitId);

            // 3. Si non, créer l'entrée GestionInventaire
            if (existant == null)
            {
                // Récupérer le produit pour obtenir le code-barres
                var produit = await _produitService.GetByIdAsync(dto.ProduitId);
                if (produit == null)
                    return NotFound("Produit non trouvé.");

                var gestionInventaire = new GestionInventaire
                {
                    InventaireId = id,
                    ProduitId = dto.ProduitId,
                    QuantiteInventaire = 0,
                    Statut = false,
                    CodeBarreProduit = produit.CodeBarre
                };
                await _gestionInventaireService.CreateAsync(gestionInventaire);
            }

            return NoContent();
        }

        // POST: api/inventaire
        public class CreateInventaireDto
        {

            public int ProduitId { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateInventaireDto dto)
        {
           var produitExiste = await _inventaireService.ProduitExisteAsync(dto.ProduitId);
            if (!produitExiste)
                return BadRequest("Le produit spécifié n'existe pas.");

            // 1. Créer l'inventaire
            var inventaire = new Inventaire
            {
                ProduitId = dto.ProduitId
               
            };
            await _inventaireService.AddAsync(inventaire);

            var gestionInventaire = new GestionInventaire
            {
                InventaireId = inventaire.InventaireId,
                ProduitId = dto.ProduitId,
                QuantiteInventaire = 0,
                Statut = false
            };
            await _gestionInventaireService.CreateAsync(gestionInventaire);

            return CreatedAtAction(nameof(GetAll), new { id = inventaire.InventaireId }, inventaire);
        }
    }
}