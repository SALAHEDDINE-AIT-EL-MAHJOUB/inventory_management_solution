using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreRackRepository
    {
        Task<CodeBarreRack?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreRack entity);
        Task<IEnumerable<CodeBarreRack>> GetAllAsync();
        Task<CodeBarreRack?> GetByIdAsync(int id);
        void Delete(CodeBarreRack entity);
        Task SaveAsync();

    }
}
