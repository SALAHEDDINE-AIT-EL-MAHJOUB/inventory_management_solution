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
    public class ProduitRepository :GenericRepository<Produit> , IProduitRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<Produit>> _logger;
        public ProduitRepository(ApplicationDbContext dbContext, ILogger<GenericRepository<Produit>> logger) : base(dbContext, logger)
        {
            _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<Produit>> GetByEtageId(int id)
        {
            try
            {
                var res = await _context.Produits
                    .Where(p=>p.ProduitEtageId == id)
                    .ToListAsync();
                return res;
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        public async Task<List<Produit>> GetAllProduitsAsync()
        {
            return await _context.Produits
        .Include(p => p.ProduitEtage) 
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<Produit>> GetProduitsByClientIdAsync(int clientId)
        {
            return await _context.Produits
                    .Include(p => p.ProduitEtage)
                        .ThenInclude(e => e.EtageRangee)
                            .ThenInclude(r => r.RangeeRack)
                                .ThenInclude(rk => rk.RackAllee)
                                    .ThenInclude(a => a.AlleeZone)
                                        .ThenInclude(z => z.ZoneSite)
                                            .ThenInclude(s => s.Societe)
                    .Include(p => p.FormProduits) 
                    .Where(p =>
                        p.ProduitEtage != null &&
                        p.ProduitEtage.EtageRangee != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack.RackAllee != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe != null &&
                        p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Societe.SocieteClientId == clientId
                    )
                    .ToListAsync();

        }

        public async Task<List<Produit>> GetProduitsParSite(int siteId)
        {
            return await _context.Produits
                .Include(p => p.ProduitEtage)
                    .ThenInclude(e => e.EtageRangee)
                        .ThenInclude(r => r.RangeeRack)
                            .ThenInclude(rack => rack.RackAllee)
                                .ThenInclude(allée => allée.AlleeZone)
                                    .ThenInclude(zone => zone.ZoneSite)
                .Where(p => p.ProduitEtage != null &&
                            p.ProduitEtage.EtageRangee != null &&
                            p.ProduitEtage.EtageRangee.RangeeRack != null &&
                            p.ProduitEtage.EtageRangee.RangeeRack.RackAllee != null &&
                            p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone != null &&
                            p.ProduitEtage.EtageRangee.RangeeRack.RackAllee.AlleeZone.ZoneSite.Id == siteId)
                .ToListAsync();
        }



    }
}
