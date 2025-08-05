using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

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
    }
}