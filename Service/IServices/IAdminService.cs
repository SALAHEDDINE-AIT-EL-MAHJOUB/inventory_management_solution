using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IAdminService
    {
        Task<IEnumerable<Admin>> GetAllActiveAdminsAsync();
        Task<Admin?> GetByIdAsync(int id);
        Task<Admin?> GetByUserIdAsync(string userId);
        Task<Admin?> GetByEmailAsync(string email);
        Task<bool> IsSuperAdminAsync(string userId);
        Task AddAsync(Admin entity);
        Task UpdateAsync(Admin entity);
        Task DeleteAsync(Admin entity);
    }
}