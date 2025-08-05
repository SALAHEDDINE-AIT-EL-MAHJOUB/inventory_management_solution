using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreOperateurRepository
    {
        Task AddAsync(CodeBarreOperateur entity);
        Task<CodeBarreOperateur?> GetByIdAsync(int id);
        Task<IEnumerable<CodeBarreOperateur>> GetAllAsync();
        Task<CodeBarreOperateur?> GetByCodeAsync(string code);
        Task UpdateAsync(CodeBarreOperateur entity);
        Task DeleteAsync(CodeBarreOperateur entity);
        Task SaveAsync();
        void Delete(CodeBarreOperateur entity);
    }
}
