using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IGestionInventaireService
    {
        Task<GestionInventaire> CreateAsync(GestionInventaire entity);
        Task<GestionInventaire?> GetByIdAsync(int id);
        Task<IEnumerable<GestionInventaire>> GetAllAsync();
        Task UpdateAsync(GestionInventaire entity);
        Task DeleteAsync(int id);

        // Ajoute ces deux méthodes :
        Task<IEnumerable<Inventaire>> GetAllInventairesAsync();
        Task<IEnumerable<Produit>> GetAllProduitsAsync();

        // Ajoute dans IGestionInventaireService
        Task<List<GestionInventaire>> GetByInventaireIdsAsync(List<int> inventaireIds);
        Task<List<Inventaire>> GetInventairesByEquipeIdsAsync(List<int> equipeIds);
        Task<bool> DeclencherDoubleSaisieSiDifferenceAsync(int gestionInventaireId, int quantiteReference, int operateurVerificateurId);
        Task<Inventaire> AddInventaireAsync(Inventaire entity);

        Task<List<Operateur>> GetAllOperateursAsync();
    }
}