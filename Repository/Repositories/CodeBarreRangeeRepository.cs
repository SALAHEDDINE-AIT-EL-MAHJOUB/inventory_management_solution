using System.Threading.Tasks;
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
    public class CodeBarreRangeeRepository : ICodeBarreRangeeRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreRangeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(CodeBarreRangee entity)
        {
            await _context.CodeBarreRangees.AddAsync(entity);
        }

        public async Task<CodeBarreRangee?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreRangees
                .Include(c => c.CodeBarreRangéeRangée)
                .FirstOrDefaultAsync(x => x.CodeBarreRangéeId == id);
        }

        public async Task<IEnumerable<CodeBarreRangee>> GetAllAsync()
        {
            return await _context.CodeBarreRangees
            .Include(c => c.CodeBarreRangéeRangée)
                .ToListAsync();
        }

        public async Task<CodeBarreRangee?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreRangees
                .Include(c => c.CodeBarreRangéeRangée)
                .FirstOrDefaultAsync(x => x.Code == code);
        }

        public Task UpdateAsync(CodeBarreRangee entity)
        {
            _context.CodeBarreRangees.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(CodeBarreRangee entity)
        {
            _context.CodeBarreRangees.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Delete(CodeBarreRangee entity)
        {
            _context.CodeBarreRangees.Remove(entity);
        }
    }
}
