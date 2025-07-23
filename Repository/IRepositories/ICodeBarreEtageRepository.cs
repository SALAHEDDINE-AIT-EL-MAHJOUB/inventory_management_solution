using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface ICodeBarreEtageRepository
    {
        Task<IEnumerable<CodeBarreEtage>> GetAllAsync();
        Task<CodeBarreEtage?> GetByIdAsync(int id);
        Task<CodeBarreEtage?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreEtage entity);
        void Delete(CodeBarreEtage entity);
        Task SaveAsync();
    }

}
