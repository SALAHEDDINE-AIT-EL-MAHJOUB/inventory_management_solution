using Domain.Entities;

namespace Domain.IRepositories
{
    public interface IResultatInventaireRepository
    {
        Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId);

        // Ajout nécessaire pour la mise à jour :
        Task<ResultatInventaire?> GetByIdAsync(int id);
        void Update(ResultatInventaire entity);

        Task SaveAsync();
        Task<List<ResultatInventaire>> GetByInventaireAndProduitAsync(int inventaireId, int formProduitId);

        Task<ResultatInventaire?> GetByInventaireProduitOperateurEtapeAsync(
    int inventaireId, int formProduitId, int operateurId, int etapeComptage);

        Task AddAsync(ResultatInventaire entity);
        Task UpdateAsync(ResultatInventaire entity);
        Task SaveChangesAsync();
        Task<bool> ExisteAsync(int formProduitId, int operateurId, int inventaireId, int etapeComptage);
        Task<List<int>> GetFormProduitIdsScannesAsync(int operateurId, int inventaireId, int etapeComptage);
        Task<List<ResultatInventaire>> GetResultatsParInventaireEtOperateurAsync(int inventaireId, int operateurId);

        Task<bool> ExisteParFormProduitEtInventaireAsync(int formProduitId, int inventaireId, int etapeComptage);

    }
}
