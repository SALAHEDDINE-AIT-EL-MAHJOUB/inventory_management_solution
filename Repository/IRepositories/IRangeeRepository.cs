using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IRangeeRepository
    {
        Task<IEnumerable<Rangee>> GetAllAsync();
        Task<Rangee?> GetByIdAsync(int id);
        Task AddAsync(Rangee rangee);
        Task UpdateAsync(Rangee rangee);
        Task DeleteAsync(int id);

        Task<IEnumerable<Societe>> GetSocietesAsync();
        Task<IEnumerable<Site>> GetSitesBySocieteIdAsync(int societeId);
        Task<IEnumerable<Zone>> GetZonesBySiteIdAsync(int siteId);
        Task<IEnumerable<Allee>> GetAlleesByZoneIdAsync(int zoneId);

        Task AddRangeeAsync(string rangeeNom, int societeId, int siteId, int zoneId, int alleeId);
    }
}