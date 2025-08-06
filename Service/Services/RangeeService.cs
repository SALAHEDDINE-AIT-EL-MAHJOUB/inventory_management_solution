using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RangeeService : IRangeeService
    {
        private readonly IRangeeRepository _rangeeRepository;

        public RangeeService(IRangeeRepository rangeeRepository)
        {
            _rangeeRepository = rangeeRepository;
        }

        public async Task<IEnumerable<Rangee>> GetAllAsync()
        {
            return await _rangeeRepository.GetAllAsync();
        }

        public async Task<Rangee?> GetByIdAsync(int id)
        {
            return await _rangeeRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Rangee rangee)
        {
            await _rangeeRepository.AddAsync(rangee);
        }

        public async Task UpdateAsync(Rangee rangee)
        {
            await _rangeeRepository.UpdateAsync(rangee);
        }

        public async Task DeleteAsync(int id)
        {
            await _rangeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Societe>> GetSocietesAsync()
        {
            return await _rangeeRepository.GetSocietesAsync();
        }

        public async Task<IEnumerable<Site>> GetSitesBySocieteIdAsync(int societeId)
        {
            return await _rangeeRepository.GetSitesBySocieteIdAsync(societeId);
        }

        public async Task<IEnumerable<Zone>> GetZonesBySiteIdAsync(int siteId)
        {
            return await _rangeeRepository.GetZonesBySiteIdAsync(siteId);
        }

        public async Task<IEnumerable<Allee>> GetAlleesByZoneIdAsync(int zoneId)
        {
            return await _rangeeRepository.GetAlleesByZoneIdAsync(zoneId);
        }

        public async Task AddRangeeAsync(string rangeeNom, int societeId, int siteId, int zoneId, int alleeId)
        {
            await _rangeeRepository.AddRangeeAsync(rangeeNom, societeId, siteId, zoneId, alleeId);
        }
    }
}