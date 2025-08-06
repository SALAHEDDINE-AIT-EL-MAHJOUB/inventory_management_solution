using System.Threading.Tasks;
using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
namespace Repository.Repositories

{
    
    public class AlleeRepository : GenericRepository<Allee>, IAlleeRepository
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<GenericRepository<Allee>> _logger;

        public AlleeRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Allee>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

public async Task<IEnumerable<Allee>> GetAllAsync()
{
    return await _context.Allees
        .Include(a => a.AlleeZone) // Assure l'inclusion de la zone
        .ToListAsync();
}

public async Task<Allee?> GetByIdAsync(int id)
{
    return await _context.Allees
        .FirstOrDefaultAsync(a => a.AlleeId == id && (a.IsDeleted == false || a.IsDeleted == null));
}
        public async Task AddAsync(Allee entity)
        {
            await base.AddAsync(entity); 
            await base.SaveChangesAsync();
}



        public async Task<List<Allee>> GetAlleeByClientId(int id)
        {
            try
            {
                var res = await _context.Allees
                    .Include(a => a.AlleeZone)
                        .ThenInclude(z => z.ZoneSite)
                            .ThenInclude(s => s.Societe)
                    .Where(a => a.AlleeZone != null && a.AlleeZone.ZoneSite != null && a.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == id)
                    .Where(a => a.IsDeleted == false || a.IsDeleted == null)
                    .Select(a => new Allee
                    {
                        AlleeId = a.AlleeId,
                        AlleeNom = a.AlleeNom,
                        AlleeZoneId = a.AlleeZoneId,
                        zoneNom = a.AlleeZone.ZoneNom,
                        societeNom = a.AlleeZone.ZoneSite.Societe.Nom,
                        siteNom = a.AlleeZone.ZoneSite.SiteNom, // <-- Ajouté ici
                        IsDeleted = a.IsDeleted,
                        AlleeZone = a.AlleeZone,
                        CodeBarreAllee = a.CodeBarreAllee,
                        Rangees = a.Rangees
                    })
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting alleys by client ID."); // Log the error
                return new List<Allee>();
            }
        }

        public async Task<List<Allee>> GetAlleeByZoneId(int id)
        {
            try
            {
                var res = await _context.Allees
                    .Include(a => a.AlleeZone)
                        .ThenInclude(z => z.ZoneSite)
                            .ThenInclude(s => s.Societe)
                    .Where(a => a.AlleeZoneId == id)
                    .Where(a => a.IsDeleted == false || a.IsDeleted == null)
                    .Select(a => new Allee
                    {
                        AlleeId = a.AlleeId,
                        AlleeNom = a.AlleeNom,
                        AlleeZoneId = a.AlleeZoneId,
                        zoneNom = a.AlleeZone.ZoneNom,
                        societeNom = a.AlleeZone.ZoneSite.Societe.Nom,
                        siteNom = a.AlleeZone.ZoneSite.SiteNom, // Ajout du nom du site
                        IsDeleted = a.IsDeleted,
                        AlleeZone = a.AlleeZone,
                        CodeBarreAllee = a.CodeBarreAllee,
                        Rangees = a.Rangees
                    })
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting alleys by zone ID."); // Log the error
                return new List<Allee>(); // Retourne une liste vide en cas d'erreur
            }
        }

        public async Task<List<Allee>> GetByIds(List<int?> ids)
        {
            return await _context.Allees
              .Where(z => ids.Contains(z.AlleeId))
              .Where(z => z.IsDeleted == false || z.IsDeleted == null) // <-- AJOUTEZ CE FILTRE
              .ToListAsync();
        }

        // --- NOUVELLE MÉTHODE : Rechercher une allée par son nom exact ---
        public async Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom)
        {
            try
            {
                // Recherche par nom exact (insensible à la casse) et par clientId
                var query = _context.Allees
                    .Where(a => a.AlleeZone != null && a.AlleeZone.ZoneSite != null && a.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId &&
                                 a.AlleeNom != null && a.AlleeNom.ToLower() == alleeNom.ToLower())
                    .Where(a => a.IsDeleted == false || a.IsDeleted == null) // <-- AJOUTEZ CE FILTRE
                    .AsNoTracking();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting alley by name.");
                throw;
            }
        }

        public async Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName)
        {
            try
            {
                var query = _context.Allees
                    .Include(a => a.AlleeZone)
                        .ThenInclude(z => z.ZoneSite)
                            .ThenInclude(s => s.Societe)
                                .ThenInclude(soc => soc.SocietéClient)
                    .Where(a =>
                        a.IsDeleted == false || a.IsDeleted == null && // <-- AJOUTEZ CE FILTRE POUR ALLÉE
                        a.AlleeZone != null && (a.AlleeZone.IsDeleted == false || a.AlleeZone.IsDeleted == null) && // AJOUTEZ CE FILTRE POUR ALLÉE.ZONE
                        a.AlleeZone.ZoneNom != null &&
                        a.AlleeZone.ZoneNom.ToLower() == zoneName.ToLower() &&
                        a.AlleeZone.ZoneSite != null && (a.AlleeZone.ZoneSite.IsDeleted == false || a.AlleeZone.ZoneSite.IsDeleted == null) && // AJOUTEZ CE FILTRE POUR ALLÉE.ZONE.SITE
                        a.AlleeZone.ZoneSite.Societe != null && (a.AlleeZone.ZoneSite.Societe.IsDeleted == false || a.AlleeZone.ZoneSite.Societe.IsDeleted == null) && // AJOUTEZ CE FILTRE POUR ALLÉE.ZONE.SITE.SOCIETE
                        a.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                        a.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .Select(a => a.AlleeNom!)
                    .Distinct()
                    .ToListAsync();

                return await query;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting allée names for zone '{zoneName}'.");
                throw;
            }
        }
        public async Task DeleteAsync(int id)
        {
            var allee = await _context.Allees.FindAsync(id);
            if (allee != null)
            {
                _context.Allees.Remove(allee);
                await _context.SaveChangesAsync();
            }
        }
    }
}