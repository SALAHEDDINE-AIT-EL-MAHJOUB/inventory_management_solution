using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IZoneService
    {
        Task<Zone> CreateZone(Zone zone);
        Task<List<Zone>> GetByIds(List<int?> ids);
        Task<List<Zone>> GetZoneByClientId(int id);
        Task<List<Zone>> GetZoneBySiteId(int id);
        Task<List<Zone>> GetZoneByName(int clientId, string zoneNom);
        Task<List<string>> GetZoneNamesBySiteName(int clientId, string siteName);
    }
}