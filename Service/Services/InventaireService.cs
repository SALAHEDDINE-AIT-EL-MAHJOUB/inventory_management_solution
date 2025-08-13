using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models; 
using Repository.Data; 


namespace Service.Services
{
    public class InventaireService : IInventaireService
    {
        private readonly IInventaireRepository _repository;

        public InventaireService(IInventaireRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Inventaire>> GetByClientIdAsync(int clientId)
        {
            return await _repository.GetByClientIdAsync(clientId);
        }

        public async Task<List<Inventaire>> GetBySiteIdAsync(int siteId)
        {
            return await _repository.GetBySiteIdAsync(siteId);
        }

        public async Task<Inventaire?> GetWithDetailsByIdAsync(int inventaireId)
        {
            return await _repository.GetWithDetailsByIdAsync(inventaireId);
        }

        public async Task<Inventaire?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task SaveAsync()
        {
            await _repository.SaveAsync();
        }

        public async Task<Inventaire?> GetInventaireActifPourOperateur(int operateurId)
        {
            return await _repository.GetInventaireActifPourOperateur(operateurId);
        }

        public async Task<List<Inventaire>> GetInventairesParOperateurIdAsync(int operateurId)
        {
            return await _repository.GetInventairesParOperateurIdAsync(operateurId);
        }

        public async Task AddAsync(Inventaire entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task<bool> UpdateTypeAsync(int inventaireId, int typeInventaireId)
        {
            return await _repository.UpdateTypeAsync(inventaireId, typeInventaireId);
        }

        public async Task<bool> UpdateStatutAsync(int inventaireId, int statutId)
        {
            return await _repository.UpdateStatutAsync(inventaireId, statutId);
        }

        public async Task<List<Inventaire>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<List<TypeInventaire>> GetTypesAsync()
        {
            return await _repository.GetTypesAsync();
        }

        public async Task<List<Statut>> GetStatutsAsync()
        {
            return await _repository.GetStatutsAsync();
        }

        public async Task<bool> AffecterProduitAsync(int inventaireId, int produitId)
        {
            return await _repository.AffecterProduitAsync(inventaireId, produitId);
        }

        public async Task<bool> ProduitExisteAsync(int produitId)
        {
            return await _repository.ProduitExisteAsync(produitId);
        }

        public async Task<List<Inventaire>> GetByEquipeIdsAsync(List<int> equipeIds)
        {
            return await _repository.GetByEquipeIdsAsync(equipeIds);
        }
    }
}