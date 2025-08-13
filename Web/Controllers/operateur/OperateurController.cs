using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Service.Dtos.Operateur;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/operateur")]
public class OperateurController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IOperateurService _operateurService;
    private readonly IEquipeService _equipeService;
    private readonly IGestionInventaireService _gestionInventaireService;
    private readonly IInventaireService _inventaireService;
    public OperateurController(
        UserManager<User> userManager,
        IOperateurService operateurService,
        IEquipeService equipeService,
        IGestionInventaireService gestionInventaireService,
        IInventaireService inventaireService 
    )
    {
        _userManager = userManager;
        _operateurService = operateurService;
        _equipeService = equipeService;
        _gestionInventaireService = gestionInventaireService;
        _inventaireService = inventaireService; 
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? siteId)
    {
        if (siteId.HasValue)
        {
            var operateurs = await _operateurService.GetBySiteIdAsync(siteId.Value);
            return Ok(operateurs);
        }
        var allOperateurs = await _operateurService.GetAllAsync();
        return Ok(allOperateurs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var operateur = await _operateurService.GetByIdAsync(id);
        if (operateur == null) return NotFound();
        return Ok(operateur);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OperateurCreateDto dto)
    {
        var created = await _operateurService.CreateAsync(dto);
        if (created == null) return BadRequest("Creation failed.");
        return Ok(created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OperateurUpdateDto dto)
    {
        var updated = await _operateurService.UpdateAsync(id, dto);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _operateurService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentOperateur()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var operateur = await _operateurService.GetByUserIdAsync(userId);
        if (operateur == null)
            return NotFound();

        return Ok(operateur);
    }

    [HttpGet("{id}/produits-inventaire")]
    public async Task<IActionResult> GetProduitsInventaire(int id)
    {
        // 1. Récupérer les équipes de l'opérateur
        var equipes = await _equipeService.GetByOperateurIdAsync(id);
        var equipeIds = equipes.Select(e => e.EquipeId).ToList();

        // Récupère les inventaires liés à ces équipes (à ajouter si besoin)
        var inventaires = await _inventaireService.GetByEquipeIdsAsync(equipeIds);
        var inventaireIds = inventaires.Select(i => i.InventaireId).ToList();

        // 3. Récupérer les lignes GestionInventaire pour ces inventaires
        var gestions = await _gestionInventaireService.GetByInventaireIdsAsync(inventaireIds);

        // 4. Formater la réponse
        var result = gestions.Select(g => new {
            gestionInventaireId = g.Id,
            produitId = g.ProduitId,
            produitNom = g.Produit?.Nom,
            quantiteInventaire = g.QuantiteInventaire,
            codeBarre = g.CodeBarreProduit 
        });

        return Ok(result);
    }

    public class UpdateQuantiteInventaireDto
    {
        public int GestionInventaireId { get; set; }
        public int NouvelleQuantite { get; set; }
    }

    [HttpPut("gestion-inventaire/{gestionInventaireId}/quantite")]
    public async Task<IActionResult> UpdateQuantiteInventaire(int gestionInventaireId, [FromBody] UpdateQuantiteInventaireDto dto)
    {
        if (dto == null || dto.NouvelleQuantite < 0)
            return BadRequest();

        var gestion = await _gestionInventaireService.GetByIdAsync(gestionInventaireId);
        if (gestion == null)
            return NotFound();

        gestion.QuantiteInventaire = dto.NouvelleQuantite;
        await _gestionInventaireService.UpdateAsync(gestion);

        return NoContent();
    }

    [HttpGet("{operateurId}/double-inventaire")]
    public async Task<IActionResult> GetDoubleInventaireProduits(int operateurId)
    {
        var gestions = await _gestionInventaireService.GetAllAsync();
        var doubleSaisies = gestions
            .Where(gi => gi.operateurdoubleinventaireId == operateurId)
            .Select(gi => new {
                gestionInventaireId = gi.Id,
                produitId = gi.ProduitId,
                produitNom = gi.Produit?.Nom,
                quantiteInventaire = gi.QuantiteInventaire,
                quantiteInventaireDouble = gi.QuantiteInventairedouble,
                inventaireId = gi.InventaireId,
                codeBarre = gi.CodeBarreProduit 
            })
            .ToList();

        return Ok(doubleSaisies);
    }

    [HttpPut("double-inventaire/{gestionInventaireId}/quantite-double")]
    public async Task<IActionResult> UpdateQuantiteDoubleInventaire(int gestionInventaireId, [FromBody] int nouvelleQuantite)
    {
        var gestion = await _gestionInventaireService.GetByIdAsync(gestionInventaireId);
        if (gestion == null)
            return NotFound();

        gestion.QuantiteInventairedouble = nouvelleQuantite;
        await _gestionInventaireService.UpdateAsync(gestion);

        return NoContent();
    }

    [HttpGet("{operateurId}/taches-stats")]
    public async Task<IActionResult> GetTachesStats(int operateurId)
    {
        var gestions = await _gestionInventaireService.GetAllAsync();
        var lignes = gestions.Where(g => g.operateurdoubleinventaireId == operateurId).ToList();

        int realisees = lignes.Count(g => (g.QuantiteInventairedouble ?? 0) > 0);
        int nonRealisees = lignes.Count(g => (g.QuantiteInventairedouble ?? 0) == 0);

        return Ok(new { realisees, nonRealisees });
    }

}