using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
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

        public async Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _repository.GetByInventaireIdAsync(inventaireId);
        }

        public async Task AddAsync(ResultatInventaire entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task<ResultatInventaire?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task UpdateAsync(ResultatInventaire entity)
        {
            await _repository.UpdateAsync(entity);
            await _repository.SaveChangesAsync();
        }

        public async Task<bool> ExisteAsync(int gestionProduitId, int operateurId, int inventaireId, int etapeComptage)
        {
            return await _repository.ExisteAsync(gestionProduitId, operateurId, inventaireId, etapeComptage);
        }

        public async Task<List<int>> GetGestionProduitIdsScannesAsync(int operateurId, int inventaireId, int etapeComptage)
        {
            return await _repository.GetGestionProduitIdsScannesAsync(operateurId, inventaireId, etapeComptage);
        }

        public async Task<List<ResultatInventaire>> GetResultatsParInventaireEtOperateurAsync(int inventaireId, int operateurId)
        {
            return await _repository.GetResultatsParInventaireEtOperateurAsync(inventaireId, operateurId);
        }

        public async Task<List<ResultatInventaire>> GetByInventaireAndProduitAsync(int inventaireId, int gestionProduitId)
        {
            return await _repository.GetByInventaireAndProduitAsync(inventaireId, gestionProduitId);
        }

        public async Task<ResultatInventaire?> GetByInventaireProduitOperateurEtapeAsync(int inventaireId, int gestionProduitId, int operateurId, int etapeComptage)
        {
            return await _repository.GetByInventaireProduitOperateurEtapeAsync(inventaireId, gestionProduitId, operateurId, etapeComptage);
        }

        public async Task<bool> ExisteParGestionProduitEtInventaireAsync(int gestionProduit, int inventaireId, int etapeComptage)
        {
            return await _repository.ExisteParGestionProduitEtInventaireAsync(gestionProduit, inventaireId, etapeComptage);
        }
    }
}