using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;

        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        public async Task<List<Site>> GetByClientId(int id)
        {
            return await _siteRepository.GetByClientId(id);
        }

        public async Task<List<Site>> GetBySocieteId(int id)
        {
            return await _siteRepository.GetBySocieteId(id);
        }

        public async Task<List<Site>> GetByIds(List<int?> ids)
        {
            return await _siteRepository.GetByIds(ids);
        }

        public async Task<List<Site>> GetSiteFilter(int clientId, string? societeRs, string? siteNom)
        {
            return await _siteRepository.GetSiteFilter(clientId, societeRs, siteNom);
        }

        public async Task<List<Site>> GetSitesByClientAndSocieteAsync(int clientId, string societeRs)
        {
            return await _siteRepository.GetSitesByClientAndSocieteAsync(clientId, societeRs);
        }

        public async Task<List<Site>> GetSitesBySocieteId(int societeId)
        {
            return await _siteRepository.GetSitesBySocieteId(societeId);
        }

        public async Task<List<Site>> GetSitesByClientIdAsync(int clientId)
        {
            return await _siteRepository.GetSitesByClientIdAsync(clientId);
        }
public async Task<Site> AddAsync(Site site)
{
    return await _siteRepository.AddAsync(site);
}

       public async Task<Site> UpdateAsync(Site site)
        {
            return await _siteRepository.UpdateAsync(site);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _siteRepository.DeleteAsync(id);
        }

        public async Task<List<Site>> GetAllAsync()
        {
            return await _siteRepository.GetAllAsync();
        }
    }
}