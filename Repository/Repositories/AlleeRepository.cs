using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Repository.Data;

namespace Repository.Repositories
{
    public class AlleeRepository : GenericRepository<Allee>, IAlleeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Allee>> _logger;

        public AlleeRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Allee>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        // Créer une nouvelle allée
        public async Task AddAsync(Allee entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            await _context.Allees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        // Afficher toutes les allées (non supprimées)
        public async Task<IEnumerable<Allee>> GetAllAsync()
        {
            return await _context.Allees
                .Where(a => !a.IsDeleted)
                .ToListAsync();
        }

        // Afficher une allée par ID
        public async Task<Allee?> GetByIdAsync(int id)
        {
            return await _context.Allees
                .FirstOrDefaultAsync(a => a.AlleeId == id && !a.IsDeleted);
        }

        // Supprimer (soft delete) une allée
        public async Task DeleteAsync(int id)
        {
            var allee = await _context.Allees.FindAsync(id);
            if (allee != null)
            {
                allee.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        // Afficher toutes les allées (non supprimées) avec détails
        public async Task<List<Allee>> GetAllAlleesWithDetails()
        {
            return await _context.Allees
                .Include(a => a.Societe)
                .Include(a => a.Site)
                .Include(a => a.AlleeZone)
                .Where(a => !a.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<Allee>> GetAlleeByZoneId(int zoneId)
        {
            return await _context.Allees
                .Where(a => a.AlleeZoneId == zoneId && !a.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<Allee>> GetAlleeByClientId(int clientId)
        {
            return await _context.Allees
                .Where(a => a.SocieteId == clientId && !a.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<Allee>> GetByIds(List<int?> ids)
        {
            return await _context.Allees
                .Where(a => ids.Contains(a.AlleeId) && !a.IsDeleted)
                .ToListAsync();
        }

        // Inclure la zone et ses relations pour les méthodes de détails
        public async Task<Allee?> GetByIdWithSiteAndSocieteAsync(int id)
        {
            return await _context.Allees
                .Include(a => a.AlleeZone)
                    .ThenInclude(z => z.ZoneSite)
                        .ThenInclude(s => s.Societe)
                .FirstOrDefaultAsync(a => a.AlleeId == id && !a.IsDeleted);
        }

        public async Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom)
        {
            // Recherche par clientId (SocieteId) et nom d'allée
            return await _context.Allees
                .Where(a => a.SocieteId == clientId && a.AlleeNom == alleeNom && !a.IsDeleted)
                .Include(a => a.AlleeZone)
                    .ThenInclude(z => z.ZoneSite)
                        .ThenInclude(s => s.Societe)
                .ToListAsync();
        }

        public async Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName)
        {
            // Recherche par clientId (SocieteId) et nom de zone
            return await _context.Allees
                .Where(a => a.SocieteId == clientId && a.AlleeZone.ZoneNom == zoneName && !a.IsDeleted)
                .Select(a => a.AlleeNom)
                .ToListAsync();
        }
    }
}

