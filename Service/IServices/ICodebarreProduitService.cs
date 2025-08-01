using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodebarreProduitService
    {
        Task<IEnumerable<CodebarreProduit>> GetAllAsync();
        Task<CodebarreProduit?> GetByIdAsync(int id);
        Task<CodebarreProduit?> GetByCodeAsync(string code);
        Task AddAsync(CodebarreProduit entity);
        Task UpdateAsync(CodebarreProduit entity);
        Task DeleteAsync(CodebarreProduit entity);
    }
}