using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ISiteRepository : IGenericRepository<Site>
    {
Task<int> CountAsync();
        public Task<List<Site>> GetBySocieteId(int id);
        public Task<List<Site>> GetByClientId(int id);
        Task<List<Site>> GetByIds(List<int?> ids);
        Task<List<Site>> GetSiteFilter(int clientId, string? societers, string? sitenom);

        Task<List<Site>> GetSitesByClientAndSocieteAsync(int clientId, string societeRs);

        Task<List<Site>> GetSitesBySocieteId(int societeId);

        Task<List<Site>> GetSitesByClientIdAsync(int clientId);
        Task<Site> AddAsync(Site site);
        Task<Site> UpdateAsync(Site site);
        
        Task<bool> DeleteAsync(int id);
        Task<List<Site>> GetAllAsync();
    }
}
