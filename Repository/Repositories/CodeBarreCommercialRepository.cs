using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CodeBarreCommercialRepository : ICodeBarreCommercialRepository
    {
        private readonly DbContext _context;

        public CodeBarreCommercialRepository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodeBarreCommercial>> GetAllAsync()
        {
            return await _context.Set<CodeBarreCommercial>().ToListAsync();
        }

        public async Task<CodeBarreCommercial?> GetByIdAsync(int commercialId)
        {
            return await _context.Set<CodeBarreCommercial>().FindAsync(commercialId);
        }

        public async Task AddAsync(CodeBarreCommercial entity)
        {
            await _context.Set<CodeBarreCommercial>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(CodeBarreCommercial entity)
        {
            _context.Set<CodeBarreCommercial>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int commercialId)
        {
            var entity = await GetByIdAsync(commercialId);
            if (entity != null)
            {
                _context.Set<CodeBarreCommercial>().Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}