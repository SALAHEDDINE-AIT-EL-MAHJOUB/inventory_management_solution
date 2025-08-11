using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Web.Controllers.produit
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProduitController : ControllerBase
    {
        private readonly IProduitService _produitService;
        private readonly ISocieteService _societeService;
        private readonly ISiteService _siteService;
        private readonly IZoneService _zoneService;
        private readonly IAlleeService _alleeService;
        private readonly IRangeeService _rangeeService;
        private readonly IEtageService _etageService;

        public ProduitController(
            IProduitService produitService,
            ISocieteService societeService,
            ISiteService siteService,
            IZoneService zoneService,
            IAlleeService alleeService,
            IRangeeService rangeeService,
            IEtageService etageService)
        {
            _produitService = produitService;
            _societeService = societeService;
            _siteService = siteService;
            _zoneService = zoneService;
            _alleeService = alleeService;
            _rangeeService = rangeeService;
            _etageService = etageService;
        }

        // GET: api/Produit/societes
        [HttpGet("societes")]
        public async Task<ActionResult<IEnumerable<Societe>>> GetSocietes()
        {
            try
            {
                var societes = await _societeService.GetAll();
                return Ok(societes);
            }
            catch (Exception ex)
            {
                // Log ex.Message ici si tu as un logger
                return StatusCode(500, "Erreur serveur : " + ex.Message);
            }
        }

        // GET: api/Produit/sites/{societeId}
        [HttpGet("sites/{societeId}")]
        public async Task<ActionResult<IEnumerable<Site>>> GetSites(int societeId)
        {
            var sites = await _siteService.GetBySocieteId(societeId);
            return Ok(sites);
        }

        // GET: api/Produit/zones/{siteId}
        [HttpGet("zones/{siteId}")]
        public async Task<ActionResult<IEnumerable<Zone>>> GetZones(int siteId)
        {
            var zones = await _zoneService.GetZoneBySiteId(siteId);
            return Ok(zones);
        }

        // GET: api/Produit/allees/{zoneId}
        [HttpGet("allees/{zoneId}")]
        public async Task<ActionResult<IEnumerable<Allee>>> GetAllees(int zoneId)
        {
            var allees = await _alleeService.GetAlleeByZoneId(zoneId);
            return Ok(allees);
        }

        // GET: api/Produit/rangees/{alleeId}
        [HttpGet("rangees/{alleeId}")]
        public async Task<ActionResult<IEnumerable<Rangee>>> GetRangees(int alleeId)
        {
            var rangees = await _rangeeService.GetByAlleeIdAsync(alleeId);
            return Ok(rangees);
        }

        // GET: api/Produit/etages/{rangeeId}
        [HttpGet("etages/{rangeeId}")]
        public async Task<ActionResult<IEnumerable<Etage>>> GetEtages(int rangeeId)
        {
            var etages = await _etageService.GetByRangeeIdAsync(rangeeId);
            return Ok(etages);
        }

        // POST: api/Produit
        [HttpPost]
        public async Task<IActionResult> PostProduit([FromBody] ProduitCreateRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var produit = new Produit
            {
                Nom = request.Nom,
                Prix = request.Prix,
                Quantite = request.Quantite, // <-- Assure-toi que cette ligne existe
                CodeBarre = request.CodeBarre,
                SocieteId = request.SocieteId,
                SiteId = request.SiteId,
                ZoneId = request.ZoneId,
                AlleeId = request.AlleeId,
                RangeeId = request.RangeeId,
                EtageId = request.EtageId,
                FournisseurId = request.FournisseurId
            };

            await _produitService.AddAsync(produit);
            return Ok(produit);
        }

        // GET: api/Produit/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Produit>> GetById(int id)
        {
            var produit = await _produitService.GetByIdAsync(id);
            if (produit == null)
                return NotFound();
            return Ok(produit);
        }

        // GET: api/Produit
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produit>>> GetAll()
        {
            var produits = await _produitService.GetAllAsync();
            return Ok(produits);
        }

        // PUT: api/Produit/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProduitCreateRequest request)
        {
            if (request == null ||
                request.SocieteId <= 0 ||
                request.SiteId <= 0 ||
                request.ZoneId <= 0 ||
                request.AlleeId <= 0 ||
                request.RangeeId <= 0 ||
                request.EtageId <= 0 ||
                request.FournisseurId <= 0 ||
                string.IsNullOrWhiteSpace(request.Nom))
            {
                return BadRequest("Tous les champs sont obligatoires.");
            }

            var produit = await _produitService.GetByIdAsync(id);
            if (produit == null)
                return NotFound();

            // Met à jour les propriétés
            produit.Nom = request.Nom;
            produit.CodeBarre = request.CodeBarre;
            produit.Prix = request.Prix;
            produit.SocieteId = request.SocieteId;
            produit.SiteId = request.SiteId;
            produit.ZoneId = request.ZoneId;
            produit.AlleeId = request.AlleeId;
            produit.RangeeId = request.RangeeId;
            produit.EtageId = request.EtageId;
            produit.FournisseurId = request.FournisseurId;

            await _produitService.UpdateAsync(produit);

            return NoContent();
        }

        // PATCH: api/Produit/{id}/ajouter-quantite
        [HttpPatch("{id}/ajouter-quantite")]
        public async Task<IActionResult> AjouterQuantite(int id, [FromBody] AjouterQuantiteRequest request)
        {
            if (request == null || request.Quantite <= 0)
                return BadRequest("La quantité doit être supérieure à zéro.");

            var produit = await _produitService.GetByIdAsync(id);
            if (produit == null)
                return NotFound();

            await _produitService.AjouterQuantiteAsync(id, request.Quantite);
            return NoContent();
        }

        // DELETE: api/Produit/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var produit = await _produitService.GetByIdAsync(id);
            if (produit == null)
                return NotFound();

            await _produitService.DeleteAsync(id);
            return NoContent();
        }

        public class AjouterQuantiteRequest
        {
            public int Quantite { get; set; }
        }

    }

    public class ProduitCreateRequest
    {
        public string Nom { get; set; }
        public string CodeBarre { get; set; }
        public decimal Prix { get; set; }
        public int Quantite { get; set; } 
        public int SocieteId { get; set; }
        public int SiteId { get; set; }
        public int ZoneId { get; set; }
        public int AlleeId { get; set; }
        public int RangeeId { get; set; }
        public int EtageId { get; set; }
        public int FournisseurId { get; set; }
    }
}