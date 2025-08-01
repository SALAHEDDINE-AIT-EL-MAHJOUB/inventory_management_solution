using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IProduitService
    {
        Task<IEnumerable<Produit>> GetAllAsync();
        Task<Produit> GetByIdAsync(int id);
        Task AddAsync(Produit produit);
        Task UpdateAsync(Produit produit);
        Task DeleteAsync(int id);
        Task<IEnumerable<Produit>> GetByCodeBarreAsync(string codeBarre);
        Task<IEnumerable<Produit>> GetByFournisseurIdAsync(int fournisseurId);
        Task<IEnumerable<Produit>> GetByFormProduitAlleeIdAsync(int alleeId);
        Task<IEnumerable<Produit>> GetByFormProduitZoneIdAsync(int zoneId);
        Task<IEnumerable<Produit>> GetByFormProduitRangeeIdAsync(int rangeeId);
        Task<IEnumerable<Produit>>  GetByFormProduitEtageIdAsync(int etageId);
    }
}