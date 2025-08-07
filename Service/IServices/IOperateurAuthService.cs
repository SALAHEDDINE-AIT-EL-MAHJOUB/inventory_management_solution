using System.Threading.Tasks;
using Service.Dtos.Operateur;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
public interface IOperateurAuthService
{
    Task<(bool Success, IEnumerable<string>? Errors)> RegisterAsync(OperateurCreateDto dto);
    Task<string?> LoginAsync(OperateurLoginDto dto);
}