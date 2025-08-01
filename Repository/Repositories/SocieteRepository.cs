using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;

namespace Repository.Repositories
{
    public class SocieteRepository : GenericRepository<Societe>, ISocieteRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Societe>> _logger;

        public SocieteRepository(ApplicationDbContext context, ILogger<GenericRepository<Societe>> logger) : base (context,logger) {

            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Societe>> GetByIds(List<int?> ids)
        {
            return await _context.Societes
                 .Where(s => ids.Contains(s.Id))
                 .ToListAsync();
        }

        public async Task<List<Societe>> GetSocieteByClientId(int id)
        {
            try
            {
                return await _context.Societes
                    .Where(s => s.SocieteClientId == id && !s.IsDeleted)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching Sociétés by ClientId: {ClientId}", id);
                return new List<Societe>(); // Return empty list instead of null
            }
        }

        public async Task<List<Societe>> GetSocieteByClientIdFilter(int id, string? societers)
        {
            try
            {
                var query = _context.Societes
                    .Where(s => s.SocieteClientId == id && !s.IsDeleted);

                if (!string.IsNullOrEmpty(societers))
                {
                    query = query.Where(s => s.RS.Contains(societers));
                }

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error filtering Sociétés by ClientId: {ClientId} and SocieteRs: {SocieteRs}", id, societers);
                throw; // Re-throw with logging for better debugging
            }
        }
    }
}
