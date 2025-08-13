using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IOperationInventaireService
    {
        Task<IEnumerable<OperationInventaire>> GetAllAsync();
        Task<OperationInventaire?> GetByIdAsync(int id);
        Task<IEnumerable<OperationInventaire>> GetByZoneIdAsync(int zoneId);
        Task<IEnumerable<OperationInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(OperationInventaire entity);
        Task UpdateAsync(OperationInventaire entity);
        Task DeleteAsync(int id);
    }
}