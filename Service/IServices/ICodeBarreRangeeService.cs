using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreRangeeService
    {
        Task<IEnumerable<CodeBarreRangee>> GetAllAsync();
        Task<CodeBarreRangee?> GetByIdAsync(int id);
        Task<CodeBarreRangee?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreRangee entity);
        Task UpdateAsync(CodeBarreRangee entity);
        Task DeleteAsync(CodeBarreRangee entity);

    
    }
}