using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IAlleeService
    {
        Task<IEnumerable<Allee>> GetAllAsync();
        Task<Allee?> GetByIdAsync(int id);
        Task AddAsync(Allee entity);
        Task<List<Allee>> GetAlleeByClientId(int clientId);
        Task<List<Allee>> GetAlleeByZoneId(int zoneId);
        Task<List<Allee>> GetByIds(List<int?> ids);
        Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom);
        Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName);
    }
}