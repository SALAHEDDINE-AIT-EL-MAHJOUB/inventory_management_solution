using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IClientRepository : IGenericRepository<Client>
    {
        public Task<User?> GetUserByName(string userName);

        public Task<Client?> GetClientUserById(string id);

        public Task<Client?> GetClientByEmail(string email);

        
        public Task<Client?> GetByIdAsync(int id, bool includeRelated = true);
        public Task<Client?> GetByEmailAsync(string email, bool includeRelated = true);
        public Task<Client?> GetByNameAsync(string name, bool includeRelated = true);
        Task<IEnumerable<Client>> GetAllAsync(Expression<Func<Client, bool>>? predicate = null);

    }
}
