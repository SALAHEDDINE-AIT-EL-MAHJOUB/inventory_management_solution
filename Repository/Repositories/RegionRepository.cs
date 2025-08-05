using Domain.Entities;
using Repository.Data;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repositories
{
    public class RegionRepository : IRegionRepository
    {
        private readonly ApplicationDbContext _context;

        public RegionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Region>> GetAllAsync()
        {
            return await _context.Regions.Include(r => r.Villes).ToListAsync();
        }

        public async Task<Region?> GetByIdAsync(int id)
        {
            return await _context.Regions.Include(r => r.Villes).FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Region> AddAsync(Region region)
        {
            _context.Regions.Add(region);
            await _context.SaveChangesAsync();
            return region;
        }

        public async Task UpdateAsync(Region region)
        {
            _context.Entry(region).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var region = await _context.Regions
                .Include(r => r.Villes)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (region == null)
                throw new Exception("Région non trouvée.");

            if (region.Villes != null && region.Villes.Any())
                throw new Exception("Impossible de supprimer une région qui contient des villes.");

            _context.Regions.Remove(region);
            await _context.SaveChangesAsync();
        }
    }
}