using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;

namespace Repository.Repositories
{
    public class ResultatInventaireRepository : IResultatInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public ResultatInventaireRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResultatInventaire>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _context.ResultatInventaires
                .Include(r => r.ResultatInventaireFormProduit)
                .Include(r => r.ResultatInventaireEquipe)
                .Include(r => r.ResultatInventaireOperateur)
                .Where(r => r.ResultatInventaireInventaireId == inventaireId)
                .ToListAsync();
        }

        public async Task AddAsync(ResultatInventaire entity)
        {
            await _context.ResultatInventaires.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<ResultatInventaire?> GetByIdAsync(int id)
        {
            return await _context.ResultatInventaires
                .FirstOrDefaultAsync(r => r.ResultatInventaireId == id);
        }

        public void Update(ResultatInventaire entity)
        {
            _context.ResultatInventaires.Update(entity);
            _context.SaveChanges();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<ResultatInventaire>> GetByInventaireAndProduitAsync(int inventaireId, int formProduitId)
        {
            return await _context.ResultatInventaires
                .Where(r => r.ResultatInventaireInventaireId == inventaireId
                         && r.ResultatInventaireFormProduitId == formProduitId)
                .ToListAsync();
        }

        public async Task<ResultatInventaire?> GetByInventaireProduitOperateurEtapeAsync(
    int inventaireId, int formProduitId, int operateurId, int etapeComptage)
        {
            return await _context.ResultatInventaires
                .FirstOrDefaultAsync(r =>
                    r.ResultatInventaireInventaireId == inventaireId &&
                    r.ResultatInventaireFormProduitId == formProduitId &&
                    r.ResultatInventaireOperateurId == operateurId &&
                    r.ÉtapeComptage == etapeComptage
                );
        }

        

        public Task UpdateAsync(ResultatInventaire entity)
        {
            _context.ResultatInventaires.Update(entity);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExisteAsync(int formProduitId, int operateurId, int inventaireId, int etapeComptage)
        {
            return await _context.ResultatInventaires.AnyAsync(r =>
                r.ResultatInventaireFormProduitId == formProduitId &&
                r.ResultatInventaireOperateurId == operateurId &&
                r.ResultatInventaireInventaireId == inventaireId &&
                r.ÉtapeComptage == etapeComptage);
        }
        public async Task<List<int>> GetFormProduitIdsScannesAsync(int operateurId, int inventaireId, int etapeComptage)
        {
            return await _context.ResultatInventaires
                 .Where(r =>
                     r.ResultatInventaireOperateurId == operateurId &&
                     r.ResultatInventaireInventaireId == inventaireId &&
                     r.ÉtapeComptage == etapeComptage)
                 .Select(r => r.ResultatInventaireFormProduitId)
                 .Where(id => id.HasValue)
                 .Select(id => id.Value)
                 .ToListAsync();

        }

        public async Task<List<ResultatInventaire>> GetResultatsParInventaireEtOperateurAsync(int inventaireId, int operateurId)
        {
            return await _context.ResultatInventaires
                .Include(r => r.ResultatInventaireFormProduit)
                    .ThenInclude(fp => fp.FormProduitProduit)
                        .ThenInclude(p => p.ProduitEtage)
                .Where(r =>
                    r.ResultatInventaireInventaireId == inventaireId &&
                    r.ResultatInventaireOperateurId == operateurId)
                .ToListAsync();
        }

        public async Task<bool> ExisteParFormProduitEtInventaireAsync(int formProduitId, int inventaireId, int etapeComptage)
        {
            return await _context.ResultatInventaires.AnyAsync(r =>
                r.ResultatInventaireFormProduitId == formProduitId &&
                r.ResultatInventaireInventaireId == inventaireId &&
                r.ÉtapeComptage == etapeComptage
            );
        }

    }
}
