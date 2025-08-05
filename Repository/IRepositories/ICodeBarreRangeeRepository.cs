using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreRangeeRepository
    {
        Task AddAsync(CodeBarreRangee entity);
        Task<CodeBarreRangee?> GetByIdAsync(int id);
        Task<IEnumerable<CodeBarreRangee>> GetAllAsync();
        Task<CodeBarreRangee?> GetByCodeAsync(string code);
        Task UpdateAsync(CodeBarreRangee entity);
        Task DeleteAsync(CodeBarreRangee entity);
        Task SaveAsync();
        void Delete(CodeBarreRangee entity);


    }
}
