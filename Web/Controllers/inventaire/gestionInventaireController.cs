using Service.IServices;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.inventaire
{
    [ApiController]
    [Route("api/[controller]")]
    public class GestionInventaireController : ControllerBase
    {
        private readonly IGestionInventaireService _service;

        public GestionInventaireController(IGestionInventaireService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestionInventaire>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GestionInventaire>> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<GestionInventaire>> Create([FromBody] GestionInventaire entity)
        {
            // Si l'InventaireId n'est pas fourni, on prend le dernier inventaire actif
            if (entity.InventaireId == 0)
            {
                var inventaires = await _service.GetAllInventairesAsync();
                var dernierInventaire = inventaires
                    .OrderByDescending(i => i.InventaireDate)
                    .FirstOrDefault();
                if (dernierInventaire == null)
                    return BadRequest("Aucun inventaire trouvé.");
                entity.InventaireId = dernierInventaire.InventaireId;
            }

            // Si le ProduitId n'est pas fourni, on prend le premier produit disponible
            if (entity.ProduitId == 0)
            {
                var produits = await _service.GetAllProduitsAsync();
                var premierProduit = produits.FirstOrDefault();
                if (premierProduit == null)
                    return BadRequest("Aucun produit trouvé.");
                entity.ProduitId = premierProduit.Id;
            }

            // Vérifie s'il existe déjà une ligne pour cet inventaire/produit
            var existants = await _service.GetAllAsync();
            var existant = existants.FirstOrDefault(x => x.InventaireId == entity.InventaireId && x.ProduitId == entity.ProduitId);
            if (existant != null)
            {
                existant.QuantiteInventaire = entity.QuantiteInventaire;
                existant.Statut = entity.Statut;
                await _service.UpdateAsync(existant);
                return Ok(existant);
            }

            var created = await _service.CreateAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPost("declencher-double-saisie")]
        public async Task<IActionResult> DeclencherDoubleSaisie(
            [FromQuery] int gestionInventaireId,
            [FromQuery] int quantiteReference,
            [FromQuery] int operateurVerificateurId)
        {
            var gestion = await _service.GetByIdAsync(gestionInventaireId);
            if (gestion == null)
                return NotFound("GestionInventaire non trouvée.");

            gestion.operateurdoubleinventaireId = operateurVerificateurId;
            gestion.QuantiteInventairedouble = quantiteReference;

            await _service.UpdateAsync(gestion);

            return Ok("Double saisie enregistrée sur la ligne existante.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, GestionInventaire entity)
        {
            if (id != entity.Id)
                return BadRequest();

            await _service.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("tableau")]
        public async Task<ActionResult<IEnumerable<object>>> GetTableau()
        {
            var gestionInventaires = await _service.GetAllAsync();

            // Récupérer tous les opérateurs pour faire la correspondance ID -> nom
            var operateurs = await _service.GetAllOperateursAsync();

            var tableau = gestionInventaires.Select(gi => new {
                Id = gi.Id,
                InventaireId = gi.InventaireId, 
                InventaireNom = gi.Inventaire?.InventaireLibelle,
                ProduitNom = gi.Produit?.Nom,
                QuantiteProduit = gi.Produit?.Quantite,
                QuantiteInventaire = gi.QuantiteInventaire,
                QuantiteInventaireDouble = gi.QuantiteInventairedouble,
                OperateurDoubleInventaireId = gi.operateurdoubleinventaireId,
                OperateurDoubleNom = operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId) != null
                    ? (operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId).Nom + " " + operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId).Prenom)
                    : "",
                Statut = gi.Statut ? "Validé" : "Non validé",
                // Ajoute ici d'autres champs si besoin, par exemple :
                // DateCreation = gi.DateCreation,
                // etc.
            });
            return Ok(tableau);
        }

        [HttpGet("tableau/{inventaireId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetTableauByInventaire(int inventaireId)
        {
            var gestionInventaires = await _service.GetAllAsync();
            var operateurs = await _service.GetAllOperateursAsync();

            var tableau = gestionInventaires
                .Where(gi => gi.InventaireId == inventaireId)
                .Select(gi => new {
                    Id = gi.Id, 
                    inventaireNom = gi.Inventaire?.InventaireLibelle,
                    produitNom = gi.Produit?.Nom,
                    quantiteProduit = gi.Produit?.Quantite,
                    quantiteInventaire = gi.QuantiteInventaire,
                    quantiteInventaireDouble = gi.QuantiteInventairedouble,
                    operateurDoubleInventaireId = gi.operateurdoubleinventaireId,
                    operateurDoubleNom = operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId) != null
                        ? (operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId).Nom + " " + operateurs.FirstOrDefault(op => op.Id == gi.operateurdoubleinventaireId).Prenom)
                        : "",
                    statut = gi.Statut ? "Validé" : "Non validé"
                });
            return Ok(tableau);
        }
    }

    public class CreateInventaireDto
    {
        public int ProduitId { get; set; }
    }
}