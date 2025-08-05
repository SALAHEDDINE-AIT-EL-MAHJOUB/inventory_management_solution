using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ZoneService : IZoneService
    {
        private readonly IZoneRepository _zoneRepository;

        public ZoneService(IZoneRepository zoneRepository)
        {
            _zoneRepository = zoneRepository;
        }

        public async Task<List<Zone>> GetByIds(List<int?> ids)
        {
            return await _zoneRepository.GetByIds(ids);
        }

        public async Task<List<Zone>> GetZoneByClientId(int id)
        {
            return await _zoneRepository.GetZoneByClientId(id);
        }

        public async Task<List<Zone>> GetZoneBySiteId(int id)
        {
            return await _zoneRepository.GetZoneBySiteId(id);
        }

        public async Task<List<Zone>> GetZoneByName(int clientId, string zoneNom)
        {
            return await _zoneRepository.GetZoneByName(clientId, zoneNom);
        }

        public async Task<List<string>> GetZoneNamesBySiteName(int clientId, string siteName)
        {
            return await _zoneRepository.GetZoneNamesBySiteName(clientId, siteName);
        }

        public async Task<Zone> CreateZone(Zone zone)
        {
            return await _zoneRepository.CreateZone(zone);
        }
    }

   
}