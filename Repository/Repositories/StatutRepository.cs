using Domain.Entities;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repositories
{
    public class StatutRepository : IStatutRepository
    {
        private readonly ApplicationDbContext _context;

        public StatutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Statut>> GetAllAsync()
        {
            return await _context.Statut.ToListAsync();
        }

        public async Task<Statut?> GetByIdAsync(int id)
        {
            return await _context.Statut.FirstOrDefaultAsync(s => s.StatutId == id);
        }
    }
}