using Microsoft.AspNetCore.Mvc;
using Service.IServices;
using Service.Dtos.Operateur;

[ApiController]
[Route("api/[controller]")]
public class OperateurAuthController : ControllerBase
{
    private readonly IOperateurAuthService _authService;

    public OperateurAuthController(IOperateurAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] OperateurCreateDto dto)
    {
        var (success, errors) = await _authService.RegisterAsync(dto);
        if (!success)
        {
            // Log errors for debugging
            Console.WriteLine("Registration errors: " + string.Join(", ", errors ?? new string[0]));
            return BadRequest(new { Message = "Registration failed.", Errors = errors });
        }
        return Ok("Registration successful.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] OperateurLoginDto dto)
    {
        var userId = await _authService.LoginAsync(dto);
        if (userId == null) return Unauthorized();
        return Ok(new { UserId = userId });
    }
}