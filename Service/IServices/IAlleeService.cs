using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IAlleeService
    {
        Task AddAsync(Allee entity);
        Task<IEnumerable<Allee>> GetAllAsync();
        Task<List<Allee>> GetAllAlleesWithDetails();
        Task<Allee?> GetByIdAsync(int id);
        Task DeleteAsync(int id);
        Task<Allee?> GetByIdWithSiteAndSocieteAsync(int id);
        Task<List<Allee>> GetAlleeByClientId(int clientId);
        Task<List<Allee>> GetAlleeByZoneId(int zoneId);
        Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom);
        Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName);
    }
}