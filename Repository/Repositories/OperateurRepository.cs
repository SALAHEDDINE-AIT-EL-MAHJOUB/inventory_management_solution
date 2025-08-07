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
    public class OperateurRepository : GenericRepository<Operateur>, IOperateurRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Operateur>> _logger;

        public OperateurRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Operateur>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Operateur?> GetOperateurByUserId(string id)
        {
            try
            {
                return await _context.Operateurs
                    .Include(o => o.User)
                    .Include(o => o.Site)
                    .FirstOrDefaultAsync(o => o.UserId == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting operator by user ID");
                throw;
            }
        }

        public async Task<List<Operateur>> GetOperateurBySiteId(int siteId)
        {
            try
            {
                return await _context.Operateurs
                    .Include(o => o.User)
                    .Include(o => o.Site)
                    .Where(o => o.SiteId == siteId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting operators by site ID");
                throw;
            }
        }
        
        public async Task AddAsync(Operateur operateur)
        {
            _context.Operateurs.Add(operateur);
            await _context.SaveChangesAsync();
        }
    }
}