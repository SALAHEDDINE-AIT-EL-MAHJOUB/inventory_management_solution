using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
namespace Repository.Repositories
{
    public class ZoneRepository : GenericRepository<Zone>, IZoneRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Zone>> _logger;

        public ZoneRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Zone>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public Task<List<Zone>> GetByIds(List<int?> ids)
        {
            return _context.Zones
                .Where(z => ids.Contains(z.ZoneId) && (z.IsDeleted == false || z.IsDeleted == null))
                .ToListAsync();
        }

        public async Task<List<Zone>> GetZoneByClientId(int id)
        {
            try
            {
                var res = await _context.Zones
                    .Include(z => z.ZoneSite)
                        .ThenInclude(site => site!.Societe)
                            .ThenInclude(societe => societe.SocietéClient)
                    .Where(z =>
                        (z.IsDeleted == false || z.IsDeleted == null) &&
                        z.ZoneSite != null &&
                        (z.ZoneSite.IsDeleted == false || z.ZoneSite.IsDeleted == null) &&
                        z.ZoneSite.Societe != null &&
                        (z.ZoneSite.Societe.IsDeleted == false || z.ZoneSite.Societe.IsDeleted == null) &&
                        z.ZoneSite.Societe.SocietéClient != null &&
                        z.ZoneSite.Societe.SocietéClient.ClientId == id
                    )
                    .AsNoTracking()
                    .ToListAsync();

                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting zones by client ID: {ClientId}", id);
                throw;
            }
        }

        public async Task<List<Zone>> GetZoneBySiteId(int id)
        {
            try
            {
                var res = await _context.Zones
                    .Where(z => z.ZoneSiteId == id && (z.IsDeleted == false || z.IsDeleted == null))
                    .AsNoTracking()
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting zones by site ID: {SiteId}", id);
                throw;
            }
        }

        public async Task<List<Zone>> GetZoneByName(int clientId, string zoneNom)
        {
            try
            {
                var query = _context.Zones
                    .Include(z => z.ZoneSite)
                        .ThenInclude(s => s!.Societe)
                            .ThenInclude(soc => soc!.SocietéClient)
                    .Where(z =>
                        (z.IsDeleted == false || z.IsDeleted == null) &&
                        z.ZoneSite != null && (z.ZoneSite.IsDeleted == false || z.ZoneSite.IsDeleted == null) &&
                        z.ZoneSite.Societe != null && (z.ZoneSite.Societe.IsDeleted == false || z.ZoneSite.Societe.IsDeleted == null) &&
                        z.ZoneSite.Societe.SocietéClient != null &&
                        z.ZoneSite.Societe.SocietéClient.ClientId == clientId &&
                        z.ZoneNom != null && z.ZoneNom.ToLower() == zoneNom.ToLower()
                    )
                    .AsNoTracking();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving zones by exact name for ClientId: {ClientId}, ZoneNom: {ZoneNom}", clientId, zoneNom);
                throw;
            }
        }

        public async Task<List<string>> GetZoneNamesBySiteName(int clientId, string siteName)
        {
            try
            {
                return await _context.Zones
                    .Include(z => z.ZoneSite)
                        .ThenInclude(s => s!.Societe)
                            .ThenInclude(soc => soc!.SocietéClient)
                    .Where(z =>
                        (z.IsDeleted == false || z.IsDeleted == null) &&
                        z.ZoneSite != null && (z.ZoneSite.IsDeleted == false || z.ZoneSite.IsDeleted == null) &&
                        z.ZoneSite.Societe != null && (z.ZoneSite.Societe.IsDeleted == false || z.ZoneSite.Societe.IsDeleted == null) &&
                        z.ZoneSite.Societe.SocietéClient != null &&
                        z.ZoneSite.SiteNom != null &&
                        z.ZoneSite.SiteNom.ToLower() == siteName.ToLower() &&
                        z.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .Select(z => z.ZoneNom!)
                    .Distinct()
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting zone names for site '{siteName}' and client '{clientId}'.");
                throw;
            }
        }


        public async Task<Zone> CreateZone(Zone zone)
        {
            _context.Zones.Add(zone);
            await _context.SaveChangesAsync();
            return zone;
        }

        public async Task<Zone?> GetByIdAsync(int id)
        {
            return await _context.Zones.FindAsync(id);
        }

        public async Task<List<Zone>> GetAllAsync()
        {
            return await _context.Zones
                .Where(z => z.IsDeleted == false || z.IsDeleted == null)
                .AsNoTracking()
                .ToListAsync();
        }
         public async Task<List<Zone>> GetZoneBySocieteId(int societeId)
        {
            return await _context.Zones
                .Where(z => z.SocieteId == societeId && (z.IsDeleted == null || z.IsDeleted == false))
                .ToListAsync();
        }

        public async Task<List<Zone>> GetZoneBySocieteName(string societeNom)
        {
            return await _context.Zones
                .Where(z => z.SocieteNom != null && z.SocieteNom.ToLower() == societeNom.ToLower() && (z.IsDeleted == null || z.IsDeleted == false))
                .ToListAsync();
        }
    }
}