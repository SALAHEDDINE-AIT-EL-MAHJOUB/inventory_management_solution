using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

public interface IInventaireService
{
    Task<List<Inventaire>> GetByClientIdAsync(int clientId);
    Task<List<Inventaire>> GetBySiteIdAsync(int siteId);
    Task<Inventaire?> GetWithDetailsByIdAsync(int inventaireId);
    Task<Inventaire?> GetByIdAsync(int id);
    Task SaveAsync();
    Task<Inventaire?> GetInventaireActifPourOperateur(int operateurId);
    Task<List<Inventaire>> GetInventairesParOperateurIdAsync(int operateurId);
    Task AddAsync(Inventaire entity);
    Task<bool> UpdateTypeAsync(int inventaireId, int typeInventaireId);
    Task<bool> UpdateStatutAsync(int inventaireId, int statutId);
    Task<List<Inventaire>> GetAllAsync();
    Task<List<TypeInventaire>> GetTypesAsync();
    Task<List<Statut>> GetStatutsAsync();
    Task<bool> AffecterProduitAsync(int inventaireId, int produitId);
    Task<bool> ProduitExisteAsync(int produitId);
    Task<List<Inventaire>> GetByEquipeIdsAsync(List<int> equipeIds);
}