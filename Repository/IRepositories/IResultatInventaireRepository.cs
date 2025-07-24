using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IResultatInventaireRepository
    {
        Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId);

        // Ajout nécessaire pour la mise à jour :
        Task<ResultatInventaire?> GetByIdAsync(int id);
        void Update(ResultatInventaire entity);

        Task SaveAsync();
        Task<List<ResultatInventaire>> GetByInventaireAndProduitAsync(int inventaireId, int gestionProduitId);

        Task<ResultatInventaire?> GetByInventaireProduitOperateurEtapeAsync(
    int inventaireId, int gestionProduitId, int operateurId, int etapeComptage);

        Task AddAsync(ResultatInventaire entity);
        Task UpdateAsync(ResultatInventaire entity);
        Task SaveChangesAsync();
        Task<bool> ExisteAsync(int gestionProduitId, int operateurId, int inventaireId, int etapeComptage);
        Task<List<int>> GetGestionProduitIdsScannesAsync(int operateurId, int inventaireId, int etapeComptage);
        Task<List<ResultatInventaire>> GetResultatsParInventaireEtOperateurAsync(int inventaireId, int operateurId);

        Task<bool> ExisteParGestionProduitEtInventaireAsync(int gestionProduitId, int inventaireId, int etapeComptage);

    }
}
