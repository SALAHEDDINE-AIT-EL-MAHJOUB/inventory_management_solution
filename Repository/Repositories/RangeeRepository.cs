using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RangeeRepository : GenericRepository<Rangee>, IRangeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Rangee>> _logger;

        public RangeeRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Rangee>> logger)
            : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Rangee>> GetByRackId(int id)
        {
            try
            {
                var res = await _context.Rangees
                    .Where(r => r.RangeeRackId == id && !r.IsDeleted) // Filter by IsDeleted
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting rangées by Rack ID.");
                throw;
            }
        }

        public async Task<List<Rangee>> GetByIds(List<int?> ids)
        {
            var nonNullIds = ids.Where(id => id.HasValue).Select(id => id.Value).ToList();

            return await _context.Rangees
                .Where(r => nonNullIds.Contains(r.RangeeId) && !r.IsDeleted) // Filter by IsDeleted
                .ToListAsync();
        }

        public async Task<List<Rangee>> GetRangeeByName(int clientId, string rangeeNom)
        {
            try
            {
                var query = _context.Rangees
                    .Include(r => r.RangeeRack)
                        .ThenInclude(rk => rk!.RackAllee)
                            .ThenInclude(a => a!.AlleeZone)
                                .ThenInclude(z => z!.ZoneSite)
                                    .ThenInclude(s => s!.Societe)
                                        .ThenInclude(soc => soc!.SocietéClient)
                    .Where(r =>
                        !r.IsDeleted && // Assuming Rangée.IsDeleted is bool (non-nullable)
                        r.RangeeRack != null && (r.RangeeRack.IsDeleted == false || r.RangeeRack.IsDeleted == null) && // Handles bool? IsDeleted on Rack
                        r.RangeeRack.RackAllee != null && (r.RangeeRack.RackAllee.IsDeleted == false || r.RangeeRack.RackAllee.IsDeleted == null) && // Handles bool? IsDeleted on Allee
                        r.RangeeRack.RackAllee.AlleeZone != null && (r.RangeeRack.RackAllee.AlleeZone.IsDeleted == false || r.RangeeRack.RackAllee.AlleeZone.IsDeleted == null) && // Handles bool? IsDeleted on Zone
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite != null && (r.RangeeRack.RackAllee.AlleeZone.ZoneSite.IsDeleted == false || r.RangeeRack.RackAllee.AlleeZone.ZoneSite.IsDeleted == null) && // Handles bool? IsDeleted on Site
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe != null && (r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == false || r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == null) && // Handles bool? IsDeleted on Societe
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null && // Client is not null for filtering
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId && // Filter by client ID
                        r.RangeeNom != null && r.RangeeNom.ToLower() == rangeeNom.ToLower() // Case-insensitive name comparison
                    )
                    .AsNoTracking();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting Rangee by exact name.");
                throw;
            }
        }

        // Method: GetRangeeNamesByRackName
        public async Task<List<string>> GetRangeeNamesByRackName(int clientId, string rackName)
        {
            try
            {
                var query = _context.Rangees
                    .Include(r => r.RangeeRack)
                        .ThenInclude(rk => rk!.RackAllee)
                            .ThenInclude(a => a!.AlleeZone)
                                .ThenInclude(z => z!.ZoneSite)
                                    .ThenInclude(s => s!.Societe)
                                        .ThenInclude(soc => soc!.SocietéClient)
                    .Where(r =>
                        !r.IsDeleted && // Assuming Rangee.IsDeleted is bool (non-nullable)
                        r.RangeeRack != null && r.RangeeRack.IsDeleted != true && // Corrected for bool? IsDeleted on Rack
                        r.RangeeRack.RackAllee != null && r.RangeeRack.RackAllee.IsDeleted != true && // Corrected for bool? IsDeleted on Allee
                        r.RangeeRack.RackAllee.AlleeZone != null && r.RangeeRack.RackAllee.AlleeZone.IsDeleted != true && // Corrected for bool? IsDeleted on Zone
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite != null && r.RangeeRack.RackAllee.AlleeZone.ZoneSite.IsDeleted != true && // Corrected for bool? IsDeleted on Site
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe != null && r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted != true && // Corrected for bool? IsDeleted on Societe
                        r.RangeeRack.RackNom != null &&
                        r.RangeeRack.RackNom.ToLower() == rackName.ToLower() && // Match rack name
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                        r.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .Select(r => r.RangeeNom!) // Select only the RangeeNom
                    .Distinct();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting rangée names for rack '{rackName}'.");
                throw;
            }
        }
    }
}