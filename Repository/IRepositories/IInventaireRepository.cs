using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IInventaireRepository : IGenericRepository<Inventaire>
    {
        Task<List<Inventaire>> GetByClientIdAsync(int clientId);
        Task<List<Inventaire>> GetBySiteIdAsync(int siteId);
        Task<Inventaire?> GetWithDetailsByIdAsync(int inventaireId);
        Task<Inventaire?> GetByIdAsync(int id);
        Task SaveAsync();
        Task<Inventaire?> GetInventaireActifPourOperateur(int operateurId);
        Task<List<Inventaire>> GetInventairesParOperateurIdAsync(int operateurId);


    }
}