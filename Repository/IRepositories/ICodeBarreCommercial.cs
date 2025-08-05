using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreCommercialRepository
    {
        Task<IEnumerable<CodeBarreCommercial>> GetAllAsync();
        Task<CodeBarreCommercial?> GetByIdAsync(int commercialId);
        Task AddAsync(CodeBarreCommercial entity);
        Task UpdateAsync(CodeBarreCommercial entity);
        Task DeleteAsync(int commercialId);
    }
}