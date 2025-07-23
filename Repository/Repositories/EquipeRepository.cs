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
    public class EquipeRepository : GenericRepository<Equipe>, IEquipeRepository
    {
        private readonly ApplicationDbContext _context;

        public EquipeRepository(ApplicationDbContext context, ILogger<GenericRepository<Equipe>> logger)
            : base(context, logger)
        {
            _context = context;
        }

        public async Task<List<Equipe>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _context.Equipes
                .Include(e => e.EquipeOperateurs)
                .Where(e => e.EquipeInventaireId == inventaireId)
                .ToListAsync();
        }

        public async Task<Equipe?> GetByIdAsync(int equipeId)
        {
            return await _context.Equipes
                .Include(e => e.EquipeOperateurs)
                .FirstOrDefaultAsync(e => e.EquipeId == equipeId);
        }

        public async Task<List<Equipe>> GetByIdsAsync(List<int> ids)
        {
            return await _context.Equipes.Where(e => ids.Contains(e.EquipeId)).ToListAsync();
        }

        public async Task<int?> GetEquipeIdByOperateurEtInventaireAsync(int operateurId, int inventaireId)
        {
            return await _context.EquipeOperateurs
                .Where(eo =>
                    eo.EquipeOperateurOperateurId == operateurId &&
                    eo.EquipeOperateurEquipe!.EquipeInventaireId == inventaireId
                )
                .Select(eo => (int?)eo.EquipeOperateurEquipeId)
                .FirstOrDefaultAsync(); // Retourne null si pas trouvé
        }

    }
}
