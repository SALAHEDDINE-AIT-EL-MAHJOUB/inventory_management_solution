using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Domain.Entities;
using Repository.IRepositories;
using Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq; // Make sure this is present for LINQ methods like Where, ToListAsync

namespace Repository.Repositories
{
    public class SiteRepository : GenericRepository<Site>, ISiteRepository
    {
        private new readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Site>> _logger;

        public SiteRepository(ApplicationDbContext context, ILogger<GenericRepository<Site>> logger) : base(context, logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Site>> GetByClientId(int id)
        {
            try
            {
                var res = await _context.Sites
                    .Include(s => s.Societe) // Include Societe to filter by ClientId
                    .Where(s => s.Societe != null && s.Societe.SocietéClient != null && s.Societe.SocietéClient.ClientId == id && !s.IsDeleted).
                    ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sites by client ID.");
                throw;
            }
        }



        public async Task<List<Site>> GetBySocieteId(int id)
        {
            try
            {
                var res = await _context.Sites.
                    Where(s => s.SocieteId == id && !s.IsDeleted)
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sites by societe ID.");
                throw;
            }
        }

        public async Task<List<Site>> GetByIds(List<int?> ids)
        {
            var nonNullIds = ids.Where(id => id.HasValue).Select(id => id.Value).ToList();

            return await _context.Sites
                .Where(s => nonNullIds.Contains(s.Id))
                .ToListAsync();
        }

        public async Task<List<Site>> GetSiteFilter(int clientId, string? societeRs, string? siteNom)
        {
            try
            {
                IQueryable<Site> query = _context.Sites
                    .Include(s => s.Societe)
                    .Where(s =>
                        s.Societe != null &&
                        s.Societe.SocietéClient != null &&
                        s.Societe.SocietéClient.ClientId == clientId &&
                        !s.IsDeleted
                    );

                if (!string.IsNullOrWhiteSpace(societeRs))
                {
                    // FIXED: Corrected property name from 'SocietRS'/'SocieteRS' to 'SocietéRs'
                    query = query.Where(s =>
                        s.Societe!.RS != null && // Use SocietéRs (with accent)
                        s.Societe.RS.ToLower().Contains(societeRs.ToLower()) // Use SocietéRs (with accent)
                    );
                }

                if (!string.IsNullOrWhiteSpace(siteNom))
                {
                    query = query.Where(s =>
                        s.SiteNom != null &&
                        s.SiteNom.ToLower().Contains(siteNom.ToLower())
                    );
                }

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting filtered sites.");
                throw;
            }
        }

        public async Task<List<Site>> GetSitesByClientAndSocieteAsync(int clientId, string societeRs)
        {
            return await _context.Sites
                .Include(s => s.Societe)
                .Where(s =>
                    s.Societe != null &&
                    s.Societe.SocieteClientId == clientId &&
                    s.Societe.RS == societeRs &&
                    !s.IsDeleted
                )
                .ToListAsync();
        }

        public async Task<List<Site>> GetSitesBySocieteId(int societeId)
        {
            try
            {
                return await _context.Sites
                    .Where(s => s.SocieteId == societeId && !s.IsDeleted)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération des sites pour la société {SocieteId}", societeId);
                return new List<Site>();
            }
        }

        public async Task<List<Site>> GetSitesByClientIdAsync(int clientId)
        {
            return await _context.Sites
                .Where(s => !s.IsDeleted && s.Societe != null && s.Societe.SocieteClientId == clientId)
                .ToListAsync();
        }

        public async Task<Site> AddAsync(Site site)
        {
            _context.Sites.Add(site);
            await _context.SaveChangesAsync();
            return site;
        }

        public async Task<Site> UpdateAsync(Site site)
        {
            var existing = await _context.Sites.FindAsync(site.Id);
            if (existing == null)
                return null;

            // Met à jour les propriétés nécessaires
            existing.SiteNom = site.SiteNom;
            existing.Adress = site.Adress;
            existing.SiteTelephone = site.SiteTelephone;
            existing.Email = site.Email;
            existing.IsDeleted = site.IsDeleted;
            existing.SocieteId = site.SocieteId;
            existing.SiteVilleId = site.SiteVilleId;
            existing.SiteSocieteId = site.SiteSocieteId;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var site = await _context.Sites.FindAsync(id);
            if (site == null)
                return false;

            _context.Sites.Remove(site);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Site>> GetAllAsync()
        {
            return await _context.Sites
                .Include(s => s.Societe)
                .Include(s => s.SiteVille)
                .ToListAsync();
        }
    }
}