using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ICodeBarreEtageRepository
    {
        Task<IEnumerable<CodeBarreEtage>> GetAllAsync();
        Task<CodeBarreEtage?> GetByIdAsync(int id);
        Task<CodeBarreEtage?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreEtage entity);
        Task UpdateAsync(CodeBarreEtage entity); // Ajoute cette ligne
        Task DeleteAsync(CodeBarreEtage entity); // Ajoute cette ligne
        Task SaveAsync();
    }
}
