using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllAsync();
        Task<Client?> GetByIdAsync(int id, bool includeRelated = true);
        Task<Client?> GetByEmailAsync(string email, bool includeRelated = true);
        Task<Client?> GetByNameAsync(string name, bool includeRelated = true);
        Task<Client?> GetClientUserById(string id);
        Task<Client?> GetClientByEmail(string email);
        Task AddAsync(Client entity);
        Task UpdateAsync(Client entity);
        Task DeleteAsync(Client entity);
    }
}