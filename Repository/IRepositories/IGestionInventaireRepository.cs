using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IGestionInventaireRepository
    {
        Task<GestionInventaire> CreateAsync(GestionInventaire entity);
        Task<GestionInventaire?> GetByIdAsync(int id);
        Task<IEnumerable<GestionInventaire>> GetAllAsync();
        Task UpdateAsync(GestionInventaire entity);
        Task DeleteAsync(int id);
        Task<List<GestionInventaire>> GetByInventaireIdsAsync(List<int> inventaireIds);

    }
}