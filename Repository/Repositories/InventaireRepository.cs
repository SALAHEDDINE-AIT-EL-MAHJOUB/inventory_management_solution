using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
using System.Linq.Expressions;
using Domain.Constants;
namespace Repository.Repositories
{
    public class InventaireRepository : GenericRepository<Inventaire>, IInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public InventaireRepository(ApplicationDbContext context, ILogger<GenericRepository<Inventaire>> logger)
            : base(context, logger)
        {
            _context = context;
        }


        public async Task<List<Inventaire>> GetByClientIdAsync(int clientId)
        {
            return await _context.Inventaires
                .Include(i => i.InventaireSite)
                    .ThenInclude(s => s.Societe)
                        .ThenInclude(ss => ss.SocietéClient)
                .Where(i =>
                    i.InventaireSite != null &&
                    i.InventaireSite.Societe != null &&
                    i.InventaireSite.Societe.SocietéClient.ClientId == clientId
                )
                .ToListAsync();
        }


        public async Task<List<Inventaire>> GetBySiteIdAsync(int siteId)
        {
            return await _context.Inventaires
                .Include(i => i.InventaireStatut)
                .Include(i => i.InventaireTypeInventaire)
                .Where(i => i.InventaireSiteId == siteId)
                .ToListAsync();
        }

        public async Task<Inventaire?> GetWithDetailsByIdAsync(int inventaireId)
        {
            return await _context.Inventaires
                .Include(i => i.InventaireStatut)
                .Include(i => i.InventaireTypeInventaire)
                .Include(i => i.InventaireSite)
                .Include(i => i.Equipes).ThenInclude(e => e.EquipeOperateurs)
                .Include(i => i.OperationInventaires)
                .Include(i => i.ResultatInventaires)
                .FirstOrDefaultAsync(i => i.InventaireId == inventaireId);
        }

        public async Task<Inventaire?> GetByIdAsync(int id)
        {
            return await _context.Inventaires.FindAsync(id);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<Inventaire?> GetInventaireActifPourOperateur(int operateurId)
        {
            return await _context.EquipeOperateurs
                .Where(eo => eo.EquipeOperateurOperateurId == operateurId)
                .Select(eo => eo.EquipeOperateurEquipe)
                .Select(e => e.EquipeInventaire)
                .Where(inv => inv.InventaireStatutId == (int)StatutIds.EnCours)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Inventaire>> GetInventairesParOperateurIdAsync(int operateurId)
        {
            return await _context.EquipeOperateurs
                .Where(eo => eo.EquipeOperateurOperateurId == operateurId)
                .Select(eo => eo.EquipeOperateurEquipe!.EquipeInventaire!)
                .Where(i => i != null)
                .Distinct()
                .Include(i => i.InventaireTypeInventaire)
                .Include(i => i.InventaireSite)
                .Include(i => i.Equipes)
                .ToListAsync();
        }

        public async Task<bool> UpdateTypeAsync(int inventaireId, int typeInventaireId)
        {
            var inventaire = await _context.Inventaires.FindAsync(inventaireId);
            if (inventaire == null)
                return false;

            inventaire.InventaireTypeInventaireId = typeInventaireId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStatutAsync(int inventaireId, int statutId)
        {
            var inventaire = await _context.Inventaires.FindAsync(inventaireId);
            if (inventaire == null)
                return false;

            inventaire.InventaireStatutId = statutId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Inventaire>> GetAllAsync()
        {
            return await _context.Inventaires
                .Include(i => i.InventaireStatut)
                .Include(i => i.InventaireTypeInventaire)
                .ToListAsync();
        }

        public async Task<List<TypeInventaire>> GetTypesAsync()
        {
            return await _context.TypeInventaires.ToListAsync();
        }

        public async Task<List<Statut>> GetStatutsAsync()
        {
            return await _context.Statut.ToListAsync();
        }
public async Task<int> CountAsync()
{
    return await _context.Sites.CountAsync();
}
    }
}