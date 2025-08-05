using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;

namespace Repository.Repositories
{
    public class SocieteRepository : GenericRepository<Societe>, ISocieteRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Societe>> _logger;

        public SocieteRepository(ApplicationDbContext context, ILogger<GenericRepository<Societe>> logger) : base (context,logger) {

            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Societe>> GetByIds(List<int?> ids)
        {
            return await _context.Societes
                 .Where(s => ids.Contains(s.Id))
                 .ToListAsync();
        }

        public async Task<List<Societe>> GetSocieteByClientId(int id)
        {
            try
            {
                return await _context.Societes
                    .Where(s => s.SocieteClientId == id && !s.IsDeleted)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching Sociétés by ClientId: {ClientId}", id);
                return new List<Societe>(); // Return empty list instead of null
            }
        }

        public async Task<List<Societe>> GetSocieteByClientIdFilter(int id, string? societers)
        {
            try
            {
                var query = _context.Societes
                    .Where(s => s.SocieteClientId == id && !s.IsDeleted);

                if (!string.IsNullOrEmpty(societers))
                {
                    query = query.Where(s => s.RS.Contains(societers));
                }

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error filtering Sociétés by ClientId: {ClientId} and SocieteRs: {SocieteRs}", id, societers);
                throw; // Re-throw with logging for better debugging
            }
        }

        public async Task UpdateSociete(Societe societe)
        {
            var existing = await _context.Societes.FindAsync(societe.Id);
            if (existing == null) return;

            // Met à jour uniquement les champs modifiables
            existing.Nom = societe.Nom;
            existing.Adresse = societe.Adresse;
            existing.VilleId = societe.VilleId;
            existing.ClientId = societe.ClientId;
            existing.RS = societe.RS;
            existing.IF = societe.IF;
            existing.Telephone = societe.Telephone;
            existing.Email = societe.Email;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteSociete(int id)
        {
            var societe = await _context.Societes.FindAsync(id);
            if (societe != null)
            {
                _context.Societes.Remove(societe);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Societe?> GetById(int id)
        {
            return await _context.Societes.FindAsync(id);
        }

        public async Task<Societe> CreateSociete(Societe societe)
        {
            _context.Societes.Add(societe);
            await _context.SaveChangesAsync();
            return societe;
        }

        public async Task<List<Societe>> GetAll()
        {
            return await _context.Societes
                .Include(s => s.SocietéVille)
                .Include(s => s.SocietéClient)
                .Where(s => !s.IsDeleted)
                .ToListAsync();
        }

        public async Task<bool> IsUniqueSocieteAsync(string ifValue, string nom, string email, int? excludeId = null)
        {
            var query = _context.Societes.AsQueryable();
            if (excludeId.HasValue)
                query = query.Where(s => s.Id != excludeId.Value);

            return !await query.AnyAsync(s =>
                (s.IF == ifValue && !string.IsNullOrEmpty(ifValue)) ||
                (s.Nom == nom && !string.IsNullOrEmpty(nom)) ||
                (s.Email == email && !string.IsNullOrEmpty(email))
            );
        }
    }
}
