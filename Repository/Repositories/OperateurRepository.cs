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
                var res = await _context.Operateurs
                    .Include(o => o.User) // Charge la relation User avec UserName
                    .FirstOrDefaultAsync(o => o.UserId == id);
                return res;
            }
            catch
            {
                throw new NotImplementedException();
            }
        }

        //public async Task<List<Operateur>> GetOperateurBySiteId(int siteId)
        //{
        //    try
        //    {
        //        var res = await _context.Operateurs
        //            .Include(o => o.User) // Charge la relation User avec UserName
        //            .Where(o => o.OperateurSiteId == siteId)
        //            .ToListAsync();
        //        return res;
        //    }
        //    catch
        //    {
        //        throw new NotImplementedException();
        //    }
        //}

        public async Task<List<Operateur>> GetOperateurBySiteId(int siteId)
        {
            try
            {
                var res = await _context.Operateurs
                    .Include(o => o.User) // Charge la relation User
                    .Where(o => o.SiteId == siteId)
                    .ToListAsync();

                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting operators by site ID");
                throw; // Il vaut mieux propager l'exception originale que de lancer NotImplementedException
            }
        }

    }
}