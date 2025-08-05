using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RangeeRepository : IRangeeRepository
    {
        private readonly DbContext _context;
        private readonly DbSet<Rangee> _dbSet;

        public RangeeRepository(DbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Rangee>();
        }

        public async Task<IEnumerable<Rangee>> GetAllAsync()
        {
            return await _dbSet
                .Where(r => !r.IsDeleted)
                .ToListAsync();
        }

        public async Task<Rangee?> GetByIdAsync(int id)
        {
            return await _dbSet
                .FirstOrDefaultAsync(r => r.RangeeId == id && !r.IsDeleted);
        }

        public async Task AddAsync(Rangee rangee)
        {
            await _dbSet.AddAsync(rangee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Rangee rangee)
        {
            _dbSet.Update(rangee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var rangee = await _dbSet.FindAsync(id);
            if (rangee != null)
            {
                rangee.IsDeleted = true;
                _dbSet.Update(rangee);
                await _context.SaveChangesAsync();
            }
        }
    }
}