using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq; // Add this using directive for List<T> methods if not already present
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IRangeeRepository : IGenericRepository<Rangee>
    {
        // Method to get a list of Rangée entities by their associated Rack ID
        Task<List<Rangee>> GetByRackId(int id);

        // Method to get a list of Rangée entities by their exact name for a given client
        Task<List<Rangee>> GetRangeeByName(int clientId, string rangeeNom);

        // Method to get a list of Rangée entities by a list of their IDs
        // This is crucial for efficient fetching in handlers that get multiple related entities
        Task<List<Rangee>> GetByIds(List<int?> ids);

        Task<List<string>> GetRangeeNamesByRackName(int clientId, string rackName);

    }
}