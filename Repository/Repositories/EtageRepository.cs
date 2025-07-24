using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class EtageRepository : IEtageRepository
    {
        private readonly ApplicationDbContext _context;

        public EtageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Etage>> GetAllAsync()
        {
            return await _context.Etages
                .Include(e => e.CodeBarreEtages)
                .Include(e => e.EtageRangee)
                .Include(e => e.Produits)
                .ToListAsync();
        }

        public async Task<Etage?> GetByIdAsync(int id)
        {
            return await _context.Etages
                .Include(e => e.CodeBarreEtages)
                .Include(e => e.EtageRangee)
                .Include(e => e.Produits)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddAsync(Etage entity)
        {
            await _context.Etages.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Etage entity)
        {
            _context.Etages.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Etage entity)
        {
            _context.Etages.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}