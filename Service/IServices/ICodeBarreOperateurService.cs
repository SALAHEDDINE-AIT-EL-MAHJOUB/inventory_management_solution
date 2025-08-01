using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreOperateurService
    {
        Task<IEnumerable<CodeBarreOperateur>> GetAllAsync();
        Task<CodeBarreOperateur?> GetByIdAsync(int id);
        Task<CodeBarreOperateur?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreOperateur entity);
        Task UpdateAsync(CodeBarreOperateur entity);
        Task DeleteAsync(CodeBarreOperateur entity);

         }
}