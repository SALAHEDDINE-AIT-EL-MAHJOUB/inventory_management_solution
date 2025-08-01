using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IGestionProduitRepository
    {
        Task<IEnumerable<GestionProduit>> GetAllAsync();
        Task<GestionProduit?> GetByIdAsync(int id);
        Task AddAsync(GestionProduit entity);
        Task UpdateAsync(GestionProduit entity);
        Task DeleteAsync(int id);
    //     GestionProduit des code barre 
Task AddCodeBarreEtageAsync(CodeBarreEtage entity);
        Task UpdateCodeBarreEtageAsync(CodeBarreEtage entity);
        Task DeleteCodeBarreEtageAsync(int id);

        Task AddCodeBarreRangeeAsync(CodeBarreRangee entity);
        Task UpdateCodeBarreRangeeAsync(CodeBarreRangee entity);
        Task DeleteCodeBarreRangeeAsync(int id);

        Task AddCodeBarreAlleeAsync(CodeBarreAllee entity);
        Task UpdateCodeBarreAlleeAsync(CodeBarreAllee entity);
        Task DeleteCodeBarreAlleeAsync(int id);

        Task AddCodeBarreZoneAsync(CodeBarreZone entity);
        Task UpdateCodeBarreZoneAsync(CodeBarreZone entity);
        Task DeleteCodeBarreZoneAsync(int id);

        Task AddCodeBarreCommercialAsync(CodeBarreCommercial entity);
        Task UpdateCodeBarreCommercialAsync(CodeBarreCommercial entity);
        Task DeleteCodeBarreCommercialAsync(int id);
   
        // Recherche par code-barres ou nom de produit
        Task<IEnumerable<GestionProduit>> SearchByCodeBarreOrProduitNomAsync(string searchTerm);
    }
}