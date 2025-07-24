using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        public async Task<IEnumerable<Admin>> GetAllActiveAdminsAsync()
        {
            return await _adminRepository.GetAllActiveAdminsAsync();
        }

        public async Task<Admin?> GetByIdAsync(int id)
        {
            return await _adminRepository.GetByIdAsync(id);
        }

        public async Task<Admin?> GetByUserIdAsync(string userId)
        {
            return await _adminRepository.GetByUserIdAsync(userId);
        }

        public async Task<Admin?> GetByEmailAsync(string email)
        {
            return await _adminRepository.GetByEmailAsync(email);
        }

        public async Task<bool> IsSuperAdminAsync(string userId)
        {
            return await _adminRepository.IsSuperAdminAsync(userId);
        }

        public async Task AddAsync(Admin entity)
        {
            await _adminRepository.AddAsync(entity);
        }

        public async Task UpdateAsync(Admin entity)
        {
            await _adminRepository.UpdateAsync(entity);
        }

         public async Task DeleteAsync(Admin entity)
        {
            await _adminRepository.DeleteAsync(entity);
        }
    }
}