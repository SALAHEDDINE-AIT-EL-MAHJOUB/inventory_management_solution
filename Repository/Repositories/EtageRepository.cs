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
    public class EtageRepository : GenericRepository<Etage>, IEtageRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Etage>> _logger;

        public EtageRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Etage>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Etage>> GetByRangeeId(int id)
        {
            try
            {
                var res = await _context.Etages
                    .Where(e => e.RangeeId == id && !e.IsDeleted) // MODIFIED: Filter by IsDeleted
                    .Include(e => e.EtageRangee)
                    .ThenInclude(r => r.RangeeRack)
                    .ThenInclude(ra => ra.RackAllee)
                    .ThenInclude(z => z.AlleeZone)
                    .ThenInclude(s => s.ZoneSite)
                    .ThenInclude(so => so.Societe)
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération des étages par ID de Rangee.");
                throw;
            }
        }

        public async Task<List<Etage>> GetEtagesByRangeeName(int clientId, string rangeeNom)
        {
            try
            {
                var query = _context.Etages
                    .Include(e => e.EtageRangee)
                        .ThenInclude(r => r.RangeeRack)
                            .ThenInclude(rack => rack.RackAllee)
                                .ThenInclude(allee => allee.AlleeZone)
                                    .ThenInclude(zone => zone.ZoneSite)
                                        .ThenInclude(site => site.Societe)
                                            .ThenInclude(soc => soc.SocietéClient)
                    .Where(e =>
                        !e.IsDeleted &&
                        e.EtageRangee != null &&
                        !e.EtageRangee.IsDeleted &&
                        e.EtageRangee.RangeeNom!.ToLower() == rangeeNom.ToLower() &&
                        e.EtageRangee.RangeeRack != null &&
                        e.EtageRangee.RangeeRack.RackAllee != null &&
                        e.EtageRangee.RangeeRack.RackAllee.AlleeZone != null &&
                        e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite != null &&
                        e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe != null &&
                        e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                        e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                    )
                    .AsNoTracking();

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération des étages par nom de Rangee.");
                throw;
            }
        }


        public async Task<int?> GetEquipeIdByOperateurEtInventaireAsync(int operateurId, int inventaireId)
        {
            return await _context.EquipeOperateurs
                .Where(eo => eo.EquipeOperateurOperateurId == operateurId && eo.EquipeOperateurEquipe!.EquipeInventaireId == inventaireId)
                .Select(eo => (int?)eo.EquipeOperateurEquipeId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Etage>> GetEtagesByClientId(int clientId)
        {
            return await _context.Etages
                .Include(e => e.EtageRangee)
                    .ThenInclude(r => r.RangeeRack)
                        .ThenInclude(rack => rack.RackAllee)
                            .ThenInclude(allee => allee.AlleeZone)
                                .ThenInclude(zone => zone.ZoneSite)
                                    .ThenInclude(site => site.Societe)
                                        .ThenInclude(soc => soc.SocietéClient)
                .Where(e =>
                    !e.IsDeleted &&
                    e.EtageRangee != null &&
                    e.EtageRangee.RangeeRack != null &&
                    e.EtageRangee.RangeeRack.RackAllee != null &&
                    e.EtageRangee.RangeeRack.RackAllee.AlleeZone != null &&
                    e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite != null &&
                    e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe != null &&
                    e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient != null &&
                    e.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocietéClient.ClientId == clientId
                )
                .ToListAsync();
        }



    }
}