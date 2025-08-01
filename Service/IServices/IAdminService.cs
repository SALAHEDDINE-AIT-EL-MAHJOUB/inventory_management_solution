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
        Task<IEnumerable<Admin>> GetAllAsync();
        Task CreateAdminAsync(string userId, string adminName); // Ajouté
        Task AddUserAsync(User user); // Ajoute cette ligne
        Task<User?> GetUserByUserNameAsync(string username);
        Task<Admin?> GetByUserNameAsync(string username);
        Task<bool> RegisterAdminAsync(string username, string email, string adminName, string password);
        Task UpdateUserAsync(User user);
    }
}