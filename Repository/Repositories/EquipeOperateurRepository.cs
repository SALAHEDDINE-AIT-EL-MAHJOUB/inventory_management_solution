using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
using System.Linq.Expressions;
namespace Repository.Repositories
{
    public class EquipeOperateurRepository : GenericRepository<EquipeOperateur>, IEquipeOperateurRepository
    {
        private readonly ApplicationDbContext _context;

        public EquipeOperateurRepository(ApplicationDbContext context, ILogger<GenericRepository<EquipeOperateur>> logger)
            : base(context, logger)
        {
            _context = context;
        }

        public async Task<List<EquipeOperateur>> GetByEquipeIdAsync(int equipeId)
        {
            return await _context.EquipeOperateurs
                .Include(eo => eo.EquipeOperateurOperateur)
                .Where(eo => eo.EquipeOperateurEquipeId == equipeId)
                .ToListAsync();
        }
    }
}
