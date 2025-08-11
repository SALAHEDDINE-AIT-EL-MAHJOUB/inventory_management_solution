using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ProduitService : IProduitService
    {
        private readonly IProduitRepository _produitRepository;

        public ProduitService(IProduitRepository produitRepository)
        {
            _produitRepository = produitRepository;
        }

        public async Task<IEnumerable<Produit>> GetAllAsync()
        {
            return await _produitRepository.GetAllAsync();
        }

        public async Task<Produit> GetByIdAsync(int id)
        {
            return await _produitRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Produit produit)
        {
            await _produitRepository.AddAsync(produit);
        }

        public async Task UpdateAsync(Produit produit)
        {
            await _produitRepository.UpdateAsync(produit);
        }

        public async Task DeleteAsync(int id)
        {
            await _produitRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Produit>> GetByCodeBarreAsync(string codeBarre)
        {
            return await _produitRepository.GetByCodeBarreAsync(codeBarre);
        }

        public async Task<IEnumerable<Produit>> GetByFournisseurIdAsync(int fournisseurId)
        {
            return await _produitRepository.GetByFournisseurIdAsync(fournisseurId);
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitAlleeIdAsync(int alleeId)
        {
            return await _produitRepository.GetByFormProduitAlleeIdAsync(alleeId);
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitZoneIdAsync(int zoneId)
        {
            return await _produitRepository.GetByFormProduitZoneIdAsync(zoneId);
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitRangeeIdAsync(int rangeeId)
        {
            return await _produitRepository.GetByFormProduitRangeeIdAsync(rangeeId);
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitEtageIdAsync(int etageId)
        {
            return await _produitRepository.GetByFormProduitEtageIdAsync(etageId);
        }

        public async Task AjouterQuantiteAsync(int produitId, int quantite)
        {
            await _produitRepository.AjouterQuantiteAsync(produitId, quantite);
        }
    }
}