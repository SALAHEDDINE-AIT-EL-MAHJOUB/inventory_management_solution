using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IOperationInventaireRepository
    {
        Task<IEnumerable<OperationInventaire>> GetAllAsync();
        Task<OperationInventaire?> GetByIdAsync(int id);
        Task AddAsync(OperationInventaire entity);
        Task UpdateAsync(OperationInventaire entity);
        Task DeleteAsync(int id);

        // Ajoutez cette méthode :
        Task<IEnumerable<OperationInventaire>> GetByZoneIdAsync(int zoneId);
        Task<IEnumerable<OperationInventaire>> GetByInventaireIdAsync(int inventaireId);
    }
}
