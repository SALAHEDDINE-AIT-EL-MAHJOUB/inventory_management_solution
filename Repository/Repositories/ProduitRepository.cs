using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Data;

namespace Repository.Repositories
{
    public class ProduitRepository : IProduitRepository
    {
        private readonly ApplicationDbContext _context;

        public ProduitRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Produit>> GetAllAsync()
        {
            return await _context.Produits
                .Include(p => p.Fournisseur)
                .Include(p => p.GestionProduit)
                .Include(p => p.CodebarreProduits)
                .Where(p => !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<Produit> GetByIdAsync(int id)
        {
            return await _context.Produits
                .Include(p => p.Fournisseur)
                .Include(p => p.GestionProduit)
                .Include(p => p.CodebarreProduits)
                .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        }

        public async Task AddAsync(Produit produit)
        {
            await _context.Produits.AddAsync(produit);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Produit produit)
        {
            _context.Produits.Update(produit);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var produit = await _context.Produits.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
            if (produit != null)
            {
                produit.IsDeleted = true;
                _context.Produits.Update(produit);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Produit>> GetByCodeBarreAsync(string codeBarre)
        {
            // Recherche par code-barres commercial ou code-barres produit
            return await _context.Produits
                .Include(p => p.GestionProduit)
                .ThenInclude(gp => gp.CodebarreCommercial) // <-- use CodebarreCommercial (lowercase b)
                .Include(p => p.CodebarreProduits)
                .Where(p =>
                    (!p.IsDeleted) &&
                    (
                        p.CodebarreProduits.Any(cb => cb.Code == codeBarre) ||
                        p.GestionProduit.Any(gp => gp.CodebarreCommercial != null && gp.CodebarreCommercial.Code == codeBarre)
                    )
                )
                .ToListAsync();
        }

        public async Task<IEnumerable<Produit>> GetByFournisseurIdAsync(int fournisseurId)
        {
            return await _context.Produits
                .Where(p => p.FournisseurId == fournisseurId && !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitAlleeIdAsync(int alleeId)
        {
            return await _context.Produits
                .Include(p => p.GestionProduit)
                .Where(p => p.GestionProduit.Any(fp => fp.CodeBarreAlleeId == alleeId) && !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitZoneIdAsync(int zoneId)
        {
            return await _context.Produits
                .Include(p => p.GestionProduit)
                .Where(p => p.GestionProduit.Any(fp => fp.CodeBarreZoneId == zoneId) && !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitRangeeIdAsync(int rangeeId)
        {
            return await _context.Produits
                .Include(p => p.GestionProduit)
                .Where(p => p.GestionProduit.Any(fp => fp.CodeBarreRangeeId == rangeeId) && !p.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Produit>> GetByFormProduitEtageIdAsync(int etageId)
        {
            return await _context.Produits
                .Include(p => p.GestionProduit)
                .Where(p => p.GestionProduit.Any(fp => fp.CodeBarreEtageId == etageId) && !p.IsDeleted)
                .ToListAsync();
        }

        public async Task AjouterQuantiteAsync(int produitId, int quantite)
        {
            var produit = await _context.Produits.FirstOrDefaultAsync(p => p.Id == produitId && !p.IsDeleted);
            if (produit != null)
            {
                produit.Quantite += quantite;
                _context.Produits.Update(produit);
                await _context.SaveChangesAsync();
            }
        }
    }
}