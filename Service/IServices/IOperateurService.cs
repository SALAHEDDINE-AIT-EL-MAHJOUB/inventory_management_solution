using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IOperateurService
    {
        Task<IEnumerable<Operateur>> GetAllAsync();
        Task<Operateur?> GetByIdAsync(int id);
        Task<Operateur?> GetByUserIdAsync(string userId);
        Task<List<Operateur>> GetBySiteIdAsync(int siteId);
        Task AddAsync(Operateur entity);
        Task UpdateAsync(Operateur entity);
        Task DeleteAsync(Operateur entity);
    }
}