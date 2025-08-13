using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class GestionInventaireRepository : IGestionInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public GestionInventaireRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GestionInventaire> CreateAsync(GestionInventaire entity)
        {
            _context.GestionInventaires.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<GestionInventaire?> GetByIdAsync(int id)
        {
            return await _context.GestionInventaires
                .Include(g => g.Inventaire)
                .Include(g => g.Produit)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<IEnumerable<GestionInventaire>> GetAllAsync()
        {
            return await _context.GestionInventaires
                .Include(gi => gi.Inventaire)
                .Include(gi => gi.Produit)
                .ToListAsync();
        }

        public async Task<List<GestionInventaire>> GetByInventaireIdsAsync(List<int> inventaireIds)
        {
            return await _context.GestionInventaires
                .Include(g => g.Produit)
                .Where(g => inventaireIds.Contains(g.InventaireId))
                .ToListAsync();
        }

        public async Task UpdateAsync(GestionInventaire entity)
        {
            _context.GestionInventaires.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.GestionInventaires.FindAsync(id);
            if (entity != null)
            {
                _context.GestionInventaires.Remove(entity);
                await _context.SaveChangesAsync();
            }

        }
        public async Task<Inventaire> CreateAsync(Inventaire entity)
        {
            _context.Inventaires.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}