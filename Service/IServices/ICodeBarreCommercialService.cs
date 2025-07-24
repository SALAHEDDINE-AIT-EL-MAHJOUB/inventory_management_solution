using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreCommercialService
    {
        Task<IEnumerable<CodeBarreCommercial>> GetAllAsync();
        Task<CodeBarreCommercial?> GetByIdAsync(int commercialId);
        Task AddAsync(CodeBarreCommercial entity);
        Task UpdateAsync(CodeBarreCommercial entity);
        Task DeleteAsync(CodeBarreCommercial entity);
        Task<CodeBarreCommercial?> GetByCodeAsync(string code);
    }
}