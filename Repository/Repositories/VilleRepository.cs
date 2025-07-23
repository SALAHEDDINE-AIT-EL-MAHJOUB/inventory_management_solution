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
    public class VilleRepository : GenericRepository<Ville>, IVilleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Ville>> _logger;

        public VilleRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Ville>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Ville>> GetByIds(List<int?> ids)
        {
            return await _context.Villes
                .Where(v=>ids.Contains(v.Id))
                .ToListAsync();
        }
    }
}
