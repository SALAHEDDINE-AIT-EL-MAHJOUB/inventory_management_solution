using Service.Dtos.Operateur;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IOperateurService
    {
        Task<IEnumerable<Operateur>> GetAllAsync();
        Task<Operateur?> GetByIdAsync(int id);
        Task<Operateur?> CreateAsync(OperateurCreateDto dto);
        Task<bool> UpdateAsync(int id, OperateurUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}