using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreAlleeService
    {
        Task<IEnumerable<CodeBarreAllee>> GetAllAsync();
        Task<CodeBarreAllee?> GetByIdAsync(int id);
        Task AddAsync(CodeBarreAllee entity);
        Task UpdateAsync(CodeBarreAllee entity);
        Task DeleteAsync(CodeBarreAllee entity);
        Task<CodeBarreAllee?> GetByCodeAsync(string code);

        // Déclenche une alerte si le code-barres est inconnu
        Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId);
    }
}