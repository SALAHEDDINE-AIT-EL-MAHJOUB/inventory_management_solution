using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IProduitRepository
    {
        Task<IEnumerable<Produit>> GetAllAsync();
        Task<Produit> GetByIdAsync(int id);
        Task AddAsync(Produit produit);
        Task UpdateAsync(Produit produit);
        Task DeleteAsync(int id);

        // Recherche par code produit (CodeBarre)
        Task<IEnumerable<Produit>> GetByCodeBarreAsync(string codeBarre);

        // Recherche par fournisseur
        Task<IEnumerable<Produit>> GetByFournisseurIdAsync(int fournisseurId);

        // Recherche par forme produit (ex: Allee, Zone, Rangee, Etage)
        Task<IEnumerable<Produit>> GetByFormProduitAlleeIdAsync(int alleeId);
        Task<IEnumerable<Produit>> GetByFormProduitZoneIdAsync(int zoneId);
        Task<IEnumerable<Produit>> GetByFormProduitRangeeIdAsync(int rangeeId);
        Task<IEnumerable<Produit>> GetByFormProduitEtageIdAsync(int etageId);
    }
}