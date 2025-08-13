using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ResultatInventaireRepository : IResultatInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public ResultatInventaireRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResultatInventaire>> GetAllAsync() =>
            await _context.ResultatInventaires.ToListAsync();

        public async Task<ResultatInventaire?> GetByIdAsync(int id) =>
            await _context.ResultatInventaires.FindAsync(id);

        public async Task<IEnumerable<ResultatInventaire>> GetByProduitIdAsync(int produitId) =>
            await _context.ResultatInventaires
                .Where(r => r.GestionProduitProduitId == produitId)
                .ToListAsync();

        public async Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId) =>
            await _context.ResultatInventaires
                .Where(r => r.ResultatInventaireInventaireId == inventaireId)
                .ToListAsync();

        public async Task AddAsync(ResultatInventaire entity)
        {
            _context.ResultatInventaires.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ResultatInventaire entity)
        {
            _context.ResultatInventaires.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.ResultatInventaires.FindAsync(id);
            if (entity != null)
            {
                _context.ResultatInventaires.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ResultatInventaire> AssignerProduitAsync(int gestionProduitId, int? equipeId, int? operateurId)
        {
            var resultat = new ResultatInventaire
            {
                GestionProduitProduitId = gestionProduitId,
                ResultatInventaireEquipeId = equipeId,
                ResultatInventaireOperateurId = operateurId,
                DateComptage = DateTime.Now,
                ÉtapeComptage = 1
            };

            _context.ResultatInventaires.Add(resultat);
            await _context.SaveChangesAsync();
            return resultat;
        }
    }
}
