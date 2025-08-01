using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
using System.Linq.Expressions;
using Domain.Constants;

namespace Repository.Repositories
{
    public class GestionProduitRepository : GenericRepository<GestionProduit>, IGestionProduitRepository
    {
        private readonly ApplicationDbContext _context;

        public GestionProduitRepository(ApplicationDbContext context, ILogger<GenericRepository<GestionProduit>> logger)
            : base(context, logger)
        {
            _context = context;
        }

        public async Task<IEnumerable<GestionProduit>> GetAllAsync()
        {
            return await _context.GestionProduit
                .Include(g => g.CodeBarreEtage)
                .Include(g => g.CodeBarreRangee)
                
                .Include(g => g.CodeBarreAllee)
                .Include(g => g.CodeBarreZone)
                .Include(g => g.ProduitEtage)
                .Include(g => g.GestionProduitProduit)
                .Include(g => g.Quantite)
                .Include(g => g.ResultatInventaires)
                .ToListAsync();
        }

        public async Task<GestionProduit?> GetByIdAsync(int id)
        {
            return await _context.GestionProduit
                .Include(g => g.CodeBarreEtage)
                .Include(g => g.CodeBarreRangee)
                
                .Include(g => g.CodeBarreAllee)
                .Include(g => g.CodeBarreZone)
                .Include(g => g.ProduitEtage)
                .Include(g => g.GestionProduitProduit)
                .Include(g => g.Quantite)
                .Include(g => g.ResultatInventaires)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task AddAsync(GestionProduit entity)
        {
            await _context.GestionProduit.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(GestionProduit entity)
        {
            _context.GestionProduit.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.GestionProduit.FindAsync(id);
            if (entity != null)
            {
                _context.GestionProduit.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // CodeBarreEtage
        public async Task AddCodeBarreEtageAsync(CodeBarreEtage entity)
        {
            await _context.CodeBarreEtages.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCodeBarreEtageAsync(CodeBarreEtage entity)
        {
            _context.CodeBarreEtages.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCodeBarreEtageAsync(int id)
        {
            var entity = await _context.CodeBarreEtages.FindAsync(id);
            if (entity != null)
            {
                _context.CodeBarreEtages.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // CodeBarreRangee
        public async Task AddCodeBarreRangeeAsync(CodeBarreRangee entity)
        {
            await _context.CodeBarreRangees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCodeBarreRangeeAsync(CodeBarreRangee entity)
        {
            _context.CodeBarreRangees.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCodeBarreRangeeAsync(int id)
        {
            var entity = await _context.CodeBarreRangees.FindAsync(id);
            if (entity != null)
            {
                _context.CodeBarreRangees.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // CodeBarreAllee
        public async Task AddCodeBarreAlleeAsync(CodeBarreAllee entity)
        {
            await _context.CodeBarreAllees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCodeBarreAlleeAsync(CodeBarreAllee entity)
        {
            _context.CodeBarreAllees.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCodeBarreAlleeAsync(int id)
        {
            var entity = await _context.CodeBarreAllees.FindAsync(id);
            if (entity != null)
            {
                _context.CodeBarreAllees.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // CodeBarreZone
        public async Task AddCodeBarreZoneAsync(CodeBarreZone entity)
        {
            await _context.CodeBarreZones.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCodeBarreZoneAsync(CodeBarreZone entity)
        {
            _context.CodeBarreZones.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCodeBarreZoneAsync(int id)
        {
            var entity = await _context.CodeBarreZones.FindAsync(id);
            if (entity != null)
            {
                _context.CodeBarreZones.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // CodeBarreCommercial
        public async Task AddCodeBarreCommercialAsync(CodeBarreCommercial entity)
        {
            await _context.CodeBarreCommercials.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCodeBarreCommercialAsync(CodeBarreCommercial entity)
        {
            _context.CodeBarreCommercials.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCodeBarreCommercialAsync(int id)
        {
            var entity = await _context.CodeBarreCommercials.FindAsync(id);
            if (entity != null)
            {
                _context.CodeBarreCommercials.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<GestionProduit>> SearchByCodeBarreOrProduitNomAsync(string searchTerm)
        {
            return await _context.GestionProduit
                .Include(g => g.CodebarreCommercial)
                .Where(g =>
                    (g.CodebarreCommercial != null && g.CodebarreCommercial.Code != null && g.CodebarreCommercial.Code.Contains(searchTerm)) ||
                    (g.ProduitNom != null && g.ProduitNom.Contains(searchTerm))
                )
                .ToListAsync();
        }
    }
}