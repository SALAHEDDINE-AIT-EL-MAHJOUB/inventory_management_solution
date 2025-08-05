using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Service.IServices;

namespace Web.Controllers.client
{
    [ApiController]
    [Route("api/client-societes")] // <-- Change this route to avoid conflict
    public class SocietesController : ControllerBase
    {
        private readonly ISocieteService _societeService;
        private readonly IVilleService _villeService; // Ajoutez ceci

        public SocietesController(ISocieteService societeService, IVilleService villeService)
        {
            _societeService = societeService;
            _villeService = villeService; // Ajoutez ceci
        }

        // POST: api/societes
        [HttpPost]
        public async Task<IActionResult> CreateSociete([FromBody] CreateSocieteRequest request)
        {
            if (request == null || request.ClientId == null || request.VilleId == null)
                return BadRequest("ClientId et VilleId sont requis");

            // Vérification unicité AVANT la création
            if (!await _societeService.IsUniqueSocieteAsync(request.IF, request.Nom, request.Email))
                return BadRequest("IF, Nom ou Email déjà utilisé par une autre société.");

            try
            {
                // Récupérer le nom de la ville à partir de l'ID
                var ville = await _villeService.GetVilleById(request.VilleId.Value);
                if (ville == null)
                    return BadRequest("Ville introuvable");

                var societe = new Societe
                {
                    Nom = request.Nom,
                    Adresse = request.Adresse,
                    VilleId = request.VilleId.Value,
                    ClientId = request.ClientId.Value,
                    RS = request.RS,
                    IF = request.IF,
                    Telephone = request.Telephone,
                    Email = request.Email,
                    Ville = ville.Nom // <-- corrigez ici
                };

                var created = await _societeService.CreateSociete(societe);
                if (created == null)
                    return StatusCode(500, "Erreur lors de la création de la société");

                return Ok(created);
            }
            catch (Exception ex)
            {
                // Gestion spécifique pour les erreurs de clé dupliquée SQL Server
                if (ex.InnerException != null && ex.InnerException.Message.Contains("clé en double"))
                {
                    return BadRequest("Une société avec cet IF, ce nom ou cet email existe déjà.");
                }
                return StatusCode(500, "Erreur serveur : " + ex.Message);
            }
        }

        // GET: api/societes
        [HttpGet]
        public async Task<IActionResult> GetAllSocietes()
        {
            try
            {
                var societes = await _societeService.GetAll();
                var result = societes.Select(s => new SocieteDto {
                    Id = s.Id, // <-- Utilise "Id" ici
                    RaisonSociale = s.RS,
                    IF = s.IF,
                    Adresse = s.Adresse,
                    Telephone = s.Telephone,
                    Ville = s.Ville ?? "",
                    ClientId = s.ClientId,
                    Nom = s.Nom,
                    Email = s.Email
                }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Ajoutez ce log pour voir l’erreur exacte dans la console ou les logs
                return StatusCode(500, ex.ToString());
            }
        }

        // PUT: api/client-societes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSociete(int id, [FromBody] CreateSocieteRequest request)
        {
            if (request == null || request.ClientId == null || request.VilleId == null)
                return BadRequest("ClientId et VilleId sont requis");

            try
            {
                var societe = await _societeService.GetById(id);
                if (societe == null)
                    return NotFound("Société introuvable");

                // Vérification unicité
                if (!await _societeService.IsUniqueSocieteAsync(request.IF, request.Nom, request.Email, id))
                    return BadRequest("IF, Nom ou Email déjà utilisé par une autre société.");

                // Mise à jour des propriétés
                societe.Nom = request.Nom;
                societe.Adresse = request.Adresse;
                societe.VilleId = request.VilleId.Value;
                societe.ClientId = request.ClientId.Value;
                societe.RS = request.RS;
                societe.IF = request.IF;
                societe.Telephone = request.Telephone;
                societe.Email = request.Email;

                await _societeService.UpdateSociete(societe);

                return Ok(societe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        // DELETE: api/client-societes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSociete(int id)
        {
            try
            {
                var societe = await _societeService.GetById(id);
                if (societe == null)
                    return NotFound("Société introuvable");

                await _societeService.DeleteSociete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }

    public class CreateSocieteRequest
    {
        public int? ClientId { get; set; }
        public int? VilleId { get; set; }
        public string? Nom { get; set; }
        public string? Adresse { get; set; }
        public string? RS { get; set; }
        public string? IF { get; set; }
        public string? Telephone { get; set; }
        public string? Email { get; set; }
    }

    public class SocieteDto {
        public int Id { get; set; } // <-- Ce champ doit exister
    
        public string RaisonSociale { get; set; }
        public string IF { get; set; }
        public string Adresse { get; set; }
        public string Telephone { get; set; }
        public string Ville { get; set; }
        public int ClientId { get; set; }
        public string Nom { get; set; }
        public string Email { get; set; }
    }

    public class Ville
    {
        public int Id { get; set; }
        public string Nom { get; set; } 
        
    }
}

