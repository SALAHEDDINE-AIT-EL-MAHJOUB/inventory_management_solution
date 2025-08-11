using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IInventaireRepository : IGenericRepository<Inventaire>
    {
        Task<List<Inventaire>> GetByClientIdAsync(int clientId);
        Task<List<Inventaire>> GetBySiteIdAsync(int siteId);
        Task<Inventaire?> GetWithDetailsByIdAsync(int inventaireId);
        Task<Inventaire?> GetByIdAsync(int id);
        Task SaveAsync();
        Task<int> CountAsync();
        Task<Inventaire?> GetInventaireActifPourOperateur(int operateurId);
        Task<List<Inventaire>> GetInventairesParOperateurIdAsync(int operateurId);
        Task<bool> UpdateTypeAsync(int inventaireId, int typeInventaireId);
        Task<bool> UpdateStatutAsync(int inventaireId, int statutId);
        Task<List<Inventaire>> GetAllAsync();
        Task<List<TypeInventaire>> GetTypesAsync();
        Task<List<Statut>> GetStatutsAsync();
    


    }
}