using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IResultatInventaireRepository
    {
        Task<IEnumerable<ResultatInventaire>> GetAllAsync();
        Task<ResultatInventaire?> GetByIdAsync(int id);
        Task<IEnumerable<ResultatInventaire>> GetByProduitIdAsync(int produitId);
        Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(ResultatInventaire entity);
        Task UpdateAsync(ResultatInventaire entity);
        Task DeleteAsync(int id);

        /// <summary>
        /// Assigne un produit à une équipe et/ou un opérateur.
        /// </summary>
        Task<ResultatInventaire> AssignerProduitAsync(int gestionProduitId, int? equipeId, int? operateurId);
    }
}
