using Domain.Entities;
using Service.IServices;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ResultatInventaireService : IResultatInventaireService
    {
        private readonly IResultatInventaireRepository _repository;

        public ResultatInventaireService(IResultatInventaireRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ResultatInventaire>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<ResultatInventaire?> GetByIdAsync(int id) =>
            await _repository.GetByIdAsync(id);

        public async Task<IEnumerable<ResultatInventaire>> GetByProduitIdAsync(int produitId) =>
            await _repository.GetByProduitIdAsync(produitId);

        public async Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId) =>
            await _repository.GetByInventaireIdAsync(inventaireId);

        public async Task AddAsync(ResultatInventaire entity) =>
            await _repository.AddAsync(entity);

        public async Task UpdateAsync(ResultatInventaire entity) =>
            await _repository.UpdateAsync(entity);

        public async Task DeleteAsync(int id) =>
            await _repository.DeleteAsync(id);

        public async Task<ResultatInventaire> AssignerProduitAsync(int gestionProduitId, int? equipeId, int? operateurId) =>
            await _repository.AssignerProduitAsync(gestionProduitId, equipeId, operateurId);
    }
}