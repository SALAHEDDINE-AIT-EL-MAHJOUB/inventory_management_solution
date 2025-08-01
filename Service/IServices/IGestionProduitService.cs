using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IGestionProduitService
    {
        Task<IEnumerable<GestionProduit>> GetAllAsync();
        Task<GestionProduit?> GetByIdAsync(int id);
        Task AddAsync(GestionProduit entity);
        Task UpdateAsync(GestionProduit entity);
        Task DeleteAsync(int id);

        // Optionally, expose search
        Task<IEnumerable<GestionProduit>> SearchByCodeBarreOrProduitNomAsync(string searchTerm);

        // Optionally, expose barcode entity management if needed by service layer
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
    }
}