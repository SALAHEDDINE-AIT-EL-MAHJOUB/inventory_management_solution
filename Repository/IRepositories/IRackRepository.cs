using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IRackRepository : IGenericRepository<Rack>
    {
        public Task<List<Rack>> GetByAlleeId(int id);

        // New method: Search for a rack by its exact name
        Task<List<Rack>> GetRackByName(int clientId, string rackNom);

        Task<List<Rack>> GetByIds(List<int?> ids);

        Task<List<string>> GetRackNamesByAlleeName(int clientId, string alleeName);

    }
}
