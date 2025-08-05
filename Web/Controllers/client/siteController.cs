using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Web.Controllers.client
{
    [ApiController]
    [Route("api/[controller]")]
    public class SiteController : ControllerBase
    {
        private readonly ISiteService _siteService;

        public SiteController(ISiteService siteService)
        {
            _siteService = siteService;
        }

       

        [HttpGet("societe/{societeId}")]
        public async Task<ActionResult<List<Site>>> GetBySocieteId(int societeId)
        {
            var sites = await _siteService.GetBySocieteId(societeId);
            return Ok(sites);
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var sites = await _siteService.GetAllAsync();
                // Projette uniquement les champs simples pour éviter la boucle
                var result = sites.Select(s => new {
                    s.Id,
                    s.SiteNom,
                    s.Adress,
                    s.SiteTelephone,
                    s.Email,
                    s.SiteVilleId,
                    s.SocieteId
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPost]
        public async Task<ActionResult<Site>> Add([FromBody] Site site)
        {
            // Supprimez toutes les variantes possibles
            ModelState.Remove("Societe");
            ModelState.Remove("SiteVille");
            ModelState.Remove("site.Societe");
            ModelState.Remove("site.SiteVille");

            if (!ModelState.IsValid)
            {
                var errors = string.Join("; ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
                return BadRequest(errors);
            }
            try
            {
                var createdSite = await _siteService.AddAsync(site);
                return Ok(createdSite);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Site>> Update(int id, [FromBody] Site site)
        {
            if (id != site.Id)
                return BadRequest();

            var updatedSite = await _siteService.UpdateAsync(site);
            return Ok(updatedSite);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _siteService.DeleteAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}