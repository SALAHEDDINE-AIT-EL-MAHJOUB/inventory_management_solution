using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IZoneRepository : IGenericRepository<Zone>
    {
        public Task<List<Zone>> GetZoneBySiteId(int id);
        public Task<List<Zone>> GetZoneByClientId(int id);
        public Task<List<Zone>> GetByIds(List<int?> ids);
        Task<List<Zone>> GetZoneByName(int clientId, string zoneNom);
        Task<Zone> CreateZone(Zone zone);

        // New method to get zone names by site name and client ID
        Task<List<string>> GetZoneNamesBySiteName(int clientId, string siteName);
        Task<List<Zone>> GetZoneBySocieteId(int societeId);
        Task<List<Zone>> GetZoneBySocieteName(string societeNom);
            Task<Zone?> GetByIdWithSiteAndSocieteAsync(int id);
    }
}
