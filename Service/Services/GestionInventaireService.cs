using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class GestionInventaireService : IGestionInventaireService
    {
        private readonly IGestionInventaireRepository _repository;
        private readonly IInventaireRepository _inventaireRepository;
        private readonly IProduitRepository _produitRepository;
        private readonly IOperateurRepository _operateurRepository; // Ajoute cette ligne

        public GestionInventaireService(
            IGestionInventaireRepository repository,
            IInventaireRepository inventaireRepository,
            IProduitRepository produitRepository,
            IOperateurRepository operateurRepository // Ajoute ce paramètre
        )
        {
            _repository = repository;
            _inventaireRepository = inventaireRepository;
            _produitRepository = produitRepository;
            _operateurRepository = operateurRepository; // Ajoute cette ligne
        }

        public async Task<GestionInventaire> CreateAsync(GestionInventaire entity)
        {
            return await _repository.CreateAsync(entity);
        }

        public async Task<GestionInventaire?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<GestionInventaire>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task UpdateAsync(GestionInventaire entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Inventaire>> GetAllInventairesAsync()
        {
            return await _inventaireRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Produit>> GetAllProduitsAsync()
        {
            return await _produitRepository.GetAllAsync();
        }

        public async Task<List<GestionInventaire>> GetByInventaireIdsAsync(List<int> inventaireIds)
        {
            return await _repository.GetByInventaireIdsAsync(inventaireIds);
        }

        public async Task<List<Inventaire>> GetInventairesByEquipeIdsAsync(List<int> equipeIds)
        {
            return await _inventaireRepository.GetByEquipeIdsAsync(equipeIds);
        }

        public async Task<bool> DeclencherDoubleSaisieSiDifferenceAsync(int gestionInventaireId, int quantiteReference, int operateurVerificateurId)
        {
            var gestionInventaire = await _repository.GetByIdAsync(gestionInventaireId);
            if (gestionInventaire == null)
                return false;

            if (gestionInventaire.QuantiteInventaire != quantiteReference)
            {
                gestionInventaire.QuantiteInventairedouble = null; // En attente de saisie
                gestionInventaire.operateurdoubleinventaireId = operateurVerificateurId;
                await _repository.UpdateAsync(gestionInventaire);
                return true;
            }
            return false;
        }

        public async Task<Inventaire> AddInventaireAsync(Inventaire entity)
        {
            return await _inventaireRepository.CreateAsync(entity);
        }

        public async Task<List<Operateur>> GetAllOperateursAsync()
        {
            return await _operateurRepository.GetAllAsync();
        }
    }
}