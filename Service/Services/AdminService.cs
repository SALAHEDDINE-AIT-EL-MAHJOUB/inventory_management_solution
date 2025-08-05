using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models.user;
namespace Service.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IUserRepository _userRepository; // Ajoute ce champ

        public AdminService(IAdminRepository adminRepository, IUserRepository userRepository)
        {
            _adminRepository = adminRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<Admin>> GetAllActiveAdminsAsync()
        {
            return await _adminRepository.GetAllActiveAdminsAsync();
        }

        public async Task<IEnumerable<Admin>> GetAllAsync()
        {
            return await _adminRepository.GetAllAsync();
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

        public async Task CreateAdminAsync(string userId, string adminName)
        {
            var admin = new Admin
            {
                UserId = userId,
                AdminName = adminName
                // Ajoute d'autres propriétés si nécessaire
            };
            await _adminRepository.AddAsync(admin);
        }

       public async Task AddUserAsync(User user)
{
    await _userRepository.AddAsync(user); 
}
        public async Task<User?> GetUserByUserNameAsync(string username)
        {
            return await _userRepository.GetUserByUserNameAsync(username);
        }

        public async Task<Admin?> GetByUserNameAsync(string username)
        {
            return await _adminRepository.GetByUserNameAsync(username);
        }

        public async Task<bool> RegisterAdminAsync(string username, string email, string adminName, string password)
        {
            // Vérifie si l'utilisateur existe déjà
            var existingUser = await _userRepository.GetUserByUserNameAsync(username);
            if (existingUser != null)
                return false; // Utilisateur déjà existant

            // Crée un nouvel utilisateur
            var user = new User
            {
                Id = Guid.NewGuid().ToString(), // Correction : génère un Id unique
                UserName = username,
                Email = email,
                PasswordHash = password // À remplacer par un hash sécurisé en production
            };
            await _userRepository.AddAsync(user);

            // Crée l'admin lié à l'utilisateur
            var admin = new Admin
            {
                UserId = user.Id, // Utilise l'Id généré
                AdminName = adminName,
                Email = email,
                IsSuperAdmin = false
            };
            await _adminRepository.AddAsync(admin);

            return true;
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateAsync(user);
            
        }
    }
}