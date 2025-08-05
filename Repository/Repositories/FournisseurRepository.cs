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
    public class FournisseurRepository : IFournisseurRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<FournisseurRepository> _logger;

        public FournisseurRepository(ApplicationDbContext context, ILogger<FournisseurRepository> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<IEnumerable<Fournisseur>> GetAllAsync()
        {
            return await _context.Fournisseurs.AsNoTracking().ToListAsync();
        }

        public async Task<Fournisseur> GetByIdAsync(int id)
        {
            return await _context.Fournisseurs.FindAsync(id);
        }

        public async Task AddAsync(Fournisseur fournisseur)
        {
            await _context.Fournisseurs.AddAsync(fournisseur);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Fournisseur fournisseur)
        {
            _context.Fournisseurs.Update(fournisseur);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
         
        var entity = await _context.Fournisseurs.FindAsync(id);
        if (entity != null)
        {
            _context.Fournisseurs.Remove(entity);
            await _context.SaveChangesAsync();
        }

        }
    }
}