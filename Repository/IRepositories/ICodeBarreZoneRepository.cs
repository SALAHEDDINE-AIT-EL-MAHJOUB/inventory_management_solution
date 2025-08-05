using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreZoneRepository
    {
        Task<IEnumerable<CodeBarreZone>> GetAllAsync();
        Task<CodeBarreZone?> GetByIdAsync(int id);
        Task<CodeBarreZone?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreZone entity);
        void Delete(CodeBarreZone entity);
        Task UpdateAsync(CodeBarreZone entity);
        Task DeleteAsync(CodeBarreZone entity);

        Task SaveAsync();
        
       
       

    }
}
