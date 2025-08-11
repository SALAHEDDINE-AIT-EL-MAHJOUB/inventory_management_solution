using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Service.Dtos.Operateur;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class OperateurController : ControllerBase
{
    private readonly IOperateurService _operateurService;

    public OperateurController(IOperateurService operateurService)
    {
        _operateurService = operateurService;
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

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var operateur = await _operateurService.GetByUserIdAsync(userId);
        if (operateur == null) return NotFound();

        return Ok(operateur);
    }
}