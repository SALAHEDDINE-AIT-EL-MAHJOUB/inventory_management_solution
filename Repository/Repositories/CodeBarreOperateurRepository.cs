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
    public class CodeBarreOperateurRepository : ICodeBarreOperateurRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreOperateurRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(CodeBarreOperateur entity)
        {
            await _context.CodeBarreOperateurs.AddAsync(entity);
        }

        public async Task<CodeBarreOperateur?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreOperateurs
                .Include(x => x.CodeBarreOperateurOperateur)
                .FirstOrDefaultAsync(x => x.CodeBarreOperateurId == id);
        }

        public async Task<IEnumerable<CodeBarreOperateur>> GetAllAsync()
        {
            return await _context.CodeBarreOperateurs
            .Include(x => x.CodeBarreOperateurOperateur)
                .ToListAsync();
        }

        public async Task<CodeBarreOperateur?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreOperateurs
                .Include(x => x.CodeBarreOperateurOperateur)
                .FirstOrDefaultAsync(x => x.Code == code);
        }

        public Task UpdateAsync(CodeBarreOperateur entity)
        {
            _context.CodeBarreOperateurs.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(CodeBarreOperateur entity)
        {
            _context.CodeBarreOperateurs.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Delete(CodeBarreOperateur entity)
        {
            _context.CodeBarreOperateurs.Remove(entity);
        }
    }
}
