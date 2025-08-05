using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ISiteService
    {
        Task<Site> AddAsync(Site site);
        Task<Site> UpdateAsync(Site site);
        Task<bool> DeleteAsync(int id);
        Task<List<Site>> GetAllAsync(); // Ajoute cette ligne
        Task<List<Site>> GetByClientId(int id);
        Task<List<Site>> GetBySocieteId(int id);
        Task<List<Site>> GetByIds(List<int?> ids);
        Task<List<Site>> GetSiteFilter(int clientId, string? societeRs, string? siteNom);
        Task<List<Site>> GetSitesByClientAndSocieteAsync(int clientId, string societeRs);
        Task<List<Site>> GetSitesBySocieteId(int societeId);
        Task<List<Site>> GetSitesByClientIdAsync(int clientId);
    }
}