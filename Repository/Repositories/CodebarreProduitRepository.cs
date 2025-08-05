using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.IRepositories;
using Microsoft.EntityFrameworkCore;
using Repository.Data;

namespace Repository.Repositories
{
    public class CodebarreProduitRepository : ICodebarreProduitRepository
    {
        private readonly ApplicationDbContext _context;

        public CodebarreProduitRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodebarreProduit>> GetAllAsync()
        {
            return await _context.CodebarreProduits
                .Include(c => c.Produit)
                .ToListAsync();
        }

        public async Task<CodebarreProduit?> GetByIdAsync(int id)
        {
            return await _context.CodebarreProduits
                .Include(c => c.Produit)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<CodebarreProduit?> GetByCodeAsync(string code)
        {
            return await _context.CodebarreProduits
                .Include(c => c.Produit)
                .FirstOrDefaultAsync(c => c.Code == code);
        }

        public Task AddAsync(CodebarreProduit entity)
        {
            _context.CodebarreProduits.Add(entity);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(CodebarreProduit entity)
        {
            _context.CodebarreProduits.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(CodebarreProduit entity)
        {
            _context.CodebarreProduits.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}