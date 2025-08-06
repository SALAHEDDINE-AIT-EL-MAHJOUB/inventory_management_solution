using Domain.Entities;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Repository.IRepositories
{
    public interface IAlleeRepository : IGenericRepository<Allee>
    {
        public Task<List<Allee>> GetAlleeByZoneId(int id);
        public Task<List<Allee>> GetAlleeByClientId(int id);
        public Task<List<Allee>> GetByIds(List<int?> ids);
       Task<Allee?> GetByIdWithSiteAndSocieteAsync(int id);        Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom);

        Task<List<Allee>> GetAllAlleesWithDetails();
        Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName);
  Task<IEnumerable<Allee>> GetAllAsync();
        Task<Allee?> GetByIdAsync(int id);
        Task AddAsync(Allee entity);
        Task DeleteAsync(int id);
    }
}
