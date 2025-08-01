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
    public class CodeBarreEtageRepository : ICodeBarreEtageRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreEtageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodeBarreEtage>> GetAllAsync()
        {
            return await _context.CodeBarreEtages.Include(e => e.CodeBarreEtageEtage).ToListAsync();
        }

        public async Task<CodeBarreEtage?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreEtages.Include(e => e.CodeBarreEtageEtage)
                .FirstOrDefaultAsync(e => e.CodeBarreEtageId == id);
        }

        public async Task<CodeBarreEtage?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreEtages.Include(e => e.CodeBarreEtageEtage)
                .FirstOrDefaultAsync(e => e.Code == code);
        }

        public async Task AddAsync(CodeBarreEtage entity)
        {
            await _context.CodeBarreEtages.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public void Delete(CodeBarreEtage entity)
        {
            _context.CodeBarreEtages.Remove(entity);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(CodeBarreEtage entity)
        {
            _context.CodeBarreEtages.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(CodeBarreEtage entity)
        {
            _context.CodeBarreEtages.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

}
