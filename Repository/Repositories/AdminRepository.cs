using Domain.Entities;
using Domain.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class AdminRepository : GenericRepository<Admin>, IAdminRepository
    {
        private readonly DbContext _context;

        public AdminRepository(DbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Admin> GetByUserIdAsync(string userId)
        {
            return await _context.Set<Admin>().FirstOrDefaultAsync(a => a.UserId == userId);
        }

        public async Task<Admin> GetByEmailAsync(string email)
        {
            return await _context.Set<Admin>().FirstOrDefaultAsync(a => a.Email == email);
        }

        public async Task<IEnumerable<Admin>> GetAllActiveAdminsAsync()
        {
            return await _context.Set<Admin>().Where(a => !a.IsDeleted).ToListAsync();
        }

        public async Task<bool> IsSuperAdminAsync(string userId)
        {
            var admin = await _context.Set<Admin>().FirstOrDefaultAsync(a => a.UserId == userId);
            return admin != null && admin.IsSuperAdmin;
        }

        public async Task AddAsync(Admin entity)
        {
            await _context.Set<Admin>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Admin entity)
        {
            _context.Set<Admin>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Admin entity)
        {
            _context.Set<Admin>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<Admin?> GetByIdAsync(int id)
        {
            return await _context.Set<Admin>().FindAsync(id);
        }
    }
}