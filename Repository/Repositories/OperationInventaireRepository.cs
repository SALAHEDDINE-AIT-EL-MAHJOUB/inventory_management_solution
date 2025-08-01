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
    public class OperationInventaireRepository : GenericRepository<OperationInventaire>, IOperationInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public OperationInventaireRepository(ApplicationDbContext context, ILogger<GenericRepository<OperationInventaire>> logger)
            : base(context, logger)
        {
            _context = context;
        }

        public async Task<List<OperationInventaire>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _context.OperationInventaires
                .Include(o => o.OperationInventaireZone)
                .Include(o => o.OperationInventaireInventaire)
                .Where(o => o.OperationInventaireInventaireId == inventaireId)
                .ToListAsync();
        }
        public async Task AddAsync(OperationInventaire operation)
        {
            await _context.OperationInventaires.AddAsync(operation);
            await _context.SaveChangesAsync();
        }

    }
}
