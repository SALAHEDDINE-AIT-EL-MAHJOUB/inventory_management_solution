using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IAdminRepository : IGenericRepository<Admin>
    {
        Task<Admin> GetByUserIdAsync(string userId);
        Task<Admin> GetByEmailAsync(string email);
        Task<IEnumerable<Admin>> GetAllActiveAdminsAsync();
        Task<bool> IsSuperAdminAsync(string userId);

        // Ajoutez ces méthodes si elles ne sont pas déjà dans IGenericRepository<T>

        Task AddAsync(Admin entity);
        Task UpdateAsync(Admin entity);
        Task DeleteAsync(Admin entity);

        Task<Admin?> GetByIdAsync(int id); // <--- ADD THIS for direct ID lookup
Task AddAsync(User user);
        Task<Admin?> GetByUserNameAsync(string username);
    }
}
