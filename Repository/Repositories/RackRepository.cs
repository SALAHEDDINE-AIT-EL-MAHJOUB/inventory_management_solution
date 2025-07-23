using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Domain.Entities;
using Domain.IRepositories;
using Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RackRepository : GenericRepository<Rack>, IRackRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Rack>> _logger;

        public RackRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Rack>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Rack>> GetByAlleeId(int id)
        {
            try
            {
                var res = await _context.Racks
                    .Include(r => r.RackAllee) // Include related data if you need to filter by Allee's IsDeleted
                    .Where(r => r.RackAlleeId == id)
                    .Where(r => r.IsDeleted == false || r.IsDeleted == null) // Filter for deleted Racks
                                                                             // Add filters for included navigation properties if they have IsDeleted
                    .Where(r => r.RackAllee == null || r.RackAllee.IsDeleted == false || r.RackAllee.IsDeleted == null)
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting racks by Allee ID {id}.");
                return null; // Consider rethrowing or handling gracefully in production
            }
        }

        public async Task<List<Rack>> GetRackByName(int clientId, string rackNom)
        {
            try
            {
                var query = _context.Racks
                    // Ensure navigation properties are loaded if used in the Where clause later.
                    .Include(r => r.RackAllee)
                        .ThenInclude(a => a.AlleeZone)
                            .ThenInclude(z => z.ZoneSite)
                                .ThenInclude(s => s.Societe)
                                    .ThenInclude(soc => soc.SocietéClient) // Include Client as it's used in filter
                    .Where(r =>
                        (r.IsDeleted == false || r.IsDeleted == null) && // Filter for deleted Racks
                        r.RackNom != null && r.RackNom.ToLower() == rackNom.ToLower() &&
                        r.RackAllee != null && (r.RackAllee.IsDeleted == false || r.RackAllee.IsDeleted == null) && // Filter for deleted Allees
                        r.RackAllee.AlleeZone != null && (r.RackAllee.AlleeZone.IsDeleted == false || r.RackAllee.AlleeZone.IsDeleted == null) && // Filter for deleted Zones
                        r.RackAllee.AlleeZone.ZoneSite != null && (r.RackAllee.AlleeZone.ZoneSite.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.IsDeleted == null) && // Filter for deleted Sites
                        r.RackAllee.AlleeZone.ZoneSite.Societe != null && (r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == null) && // Filter for deleted Societes
                        r.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                        r.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .AsNoTracking();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting rack by exact name.");
                throw; // Re-throwing ensures the error propagates up
            }
        }

        public async Task<List<Rack>> GetByIds(List<int?> ids)
        {
            // Filter out nulls from the 'ids' list to ensure proper LINQ to Entities translation
            var nonNullIds = ids.Where(id => id.HasValue).Select(id => id.Value).ToList();

            return await _context.Racks
                // Include navigation properties if their IsDeleted status also needs to be considered
                .Include(r => r.RackAllee)
                    .ThenInclude(a => a.AlleeZone)
                        .ThenInclude(z => z.ZoneSite)
                            .ThenInclude(s => s.Societe)
                // Filter by the non-nullable IDs and IsDeleted status for Rack itself
                .Where(r => nonNullIds.Contains(r.RackId) && (r.IsDeleted == false || r.IsDeleted == null))
                // Add filters for included navigation properties if they have IsDeleted
                .Where(r => r.RackAllee == null || r.RackAllee.IsDeleted == false || r.RackAllee.IsDeleted == null)
                .Where(r => r.RackAllee.AlleeZone == null || r.RackAllee.AlleeZone.IsDeleted == false || r.RackAllee.AlleeZone.IsDeleted == null)
                .Where(r => r.RackAllee.AlleeZone.ZoneSite == null || r.RackAllee.AlleeZone.ZoneSite.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.IsDeleted == null)
                .Where(r => r.RackAllee.AlleeZone.ZoneSite.Societe == null || r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == null)
                .ToListAsync();
        }


        public async Task<List<string>> GetRackNamesByAlleeName(int clientId, string alleeName)
        {
            try
            {
                var query = _context.Racks
                    .Include(r => r.RackAllee)
                        .ThenInclude(a => a.AlleeZone)
                            .ThenInclude(z => z.ZoneSite)
                                .ThenInclude(s => s.Societe)
                                    .ThenInclude(soc => soc.SocietéClient)
                    .Where(r =>
                        (r.IsDeleted == false || r.IsDeleted == null) && // Filter for deleted Racks
                        r.RackNom != null && // Ensure RackNom is not null before ToLower()
                        r.RackAllee != null && (r.RackAllee.IsDeleted == false || r.RackAllee.IsDeleted == null) && // Filter for deleted Allees
                        r.RackAllee.AlleeNom != null && r.RackAllee.AlleeNom.ToLower() == alleeName.ToLower() &&
                        r.RackAllee.AlleeZone != null && (r.RackAllee.AlleeZone.IsDeleted == false || r.RackAllee.AlleeZone.IsDeleted == null) && // Filter for deleted Zones
                        r.RackAllee.AlleeZone.ZoneSite != null && (r.RackAllee.AlleeZone.ZoneSite.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.IsDeleted == null) && // Filter for deleted Sites
                        r.RackAllee.AlleeZone.ZoneSite.Societe != null && (r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == false || r.RackAllee.AlleeZone.ZoneSite.Societe.IsDeleted == null) && // Filter for deleted Societes
                        r.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                        r.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .Select(r => r.RackNom!) // Select only the RackNom, use ! for null-forgiving if you're sure it's not null here
                    .Distinct()
                    .ToListAsync();

                return await query;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting rack names for Allee '{alleeName}'.");
                throw;
            }
        }
    }
}