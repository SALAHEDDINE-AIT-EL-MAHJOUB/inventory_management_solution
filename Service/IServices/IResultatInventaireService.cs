using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IResultatInventaireService
    {
        Task<IEnumerable<ResultatInventaire>> GetAllAsync();
        Task<ResultatInventaire?> GetByIdAsync(int id);
        Task<IEnumerable<ResultatInventaire>> GetByProduitIdAsync(int produitId);
        Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(ResultatInventaire entity);
        Task UpdateAsync(ResultatInventaire entity);
        Task DeleteAsync(int id);
        Task<ResultatInventaire> AssignerProduitAsync(int gestionProduitId, int? equipeId, int? operateurId);
    }
}

