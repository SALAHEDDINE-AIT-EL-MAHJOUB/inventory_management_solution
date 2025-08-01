using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IResultatInventaireService
    {
        Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(ResultatInventaire entity);
        Task<ResultatInventaire?> GetByIdAsync(int id);
        Task UpdateAsync(ResultatInventaire entity);
        Task<bool> ExisteAsync(int gestionProduitId, int operateurId, int inventaireId, int etapeComptage);
        Task<List<int>> GetGestionProduitIdsScannesAsync(int operateurId, int inventaireId, int etapeComptage);
        Task<List<ResultatInventaire>> GetResultatsParInventaireEtOperateurAsync(int inventaireId, int operateurId);
        Task<List<ResultatInventaire>> GetByInventaireAndProduitAsync(int inventaireId, int gestionProduitId);
        Task<ResultatInventaire?> GetByInventaireProduitOperateurEtapeAsync(int inventaireId, int gestionProduitId, int operateurId, int etapeComptage);
        Task<bool> ExisteParGestionProduitEtInventaireAsync(int gestionProduit, int inventaireId, int etapeComptage);
    }
}

