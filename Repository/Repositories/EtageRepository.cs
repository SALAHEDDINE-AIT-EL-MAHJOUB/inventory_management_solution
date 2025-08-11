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
                .Where(e => !e.IsDeleted)
                .Include(e => e.CodeBarreEtages)
                .Include(e => e.EtageRangee)
                .Include(e => e.Produits)
                .Include(e => e.Zone)
                .Include(e => e.Societe)
                .Include(e => e.Allee)
                .Include(e => e.Site)
                .Include(e => e.CodeBarreetage)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Etage?> GetByIdAsync(int id)
        {
            return await _context.Etages
                .Include(e => e.CodeBarreEtages)
                .Include(e => e.EtageRangee)
                .Include(e => e.Produits)
                .Include(e => e.Zone)
                .Include(e => e.Societe)
                .Include(e => e.Allee)
                .Include(e => e.Site)
                .Include(e => e.CodeBarreetage)
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        }

        public async Task AddAsync(Etage entity)
        {
            await _context.Etages.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Etage entity)
        {
            var existing = await _context.Etages.FindAsync(entity.Id);
            if (existing == null || existing.IsDeleted)
                return;

            _context.Entry(existing).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Etage entity)
        {
            var existing = await _context.Etages.FindAsync(entity.Id);
            if (existing == null || existing.IsDeleted)
                return;

            existing.IsDeleted = true;
            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Etage>> GetByRangeeIdAsync(int rangeeId)
        {
            return await _context.Etages
                .Where(e => e.RangeeId == rangeeId && !e.IsDeleted)
                .ToListAsync();
        }
    }
}