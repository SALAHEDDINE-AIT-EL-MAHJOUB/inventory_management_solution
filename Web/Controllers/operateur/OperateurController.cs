using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Service.Dtos.Operateur;
using System.Threading.Tasks;

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
    public async Task<IActionResult> GetAll()
    {
        var operateurs = await _operateurService.GetAllAsync();
        return Ok(operateurs);
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
}