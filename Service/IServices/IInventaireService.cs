using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IInventaireService
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