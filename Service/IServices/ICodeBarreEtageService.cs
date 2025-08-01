using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreEtageService
    {
        Task<IEnumerable<CodeBarreEtage>> GetAllAsync();
        Task<CodeBarreEtage?> GetByIdAsync(int id);
        Task<CodeBarreEtage?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreEtage entity);
        Task UpdateAsync(CodeBarreEtage entity);
        Task DeleteAsync(CodeBarreEtage entity);

       
    }
}