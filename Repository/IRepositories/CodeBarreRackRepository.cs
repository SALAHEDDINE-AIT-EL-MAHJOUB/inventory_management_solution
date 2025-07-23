using System.Threading.Tasks;
using Domain.Entities;
using Domain.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.Data;
using System.Linq.Expressions;
namespace Repository.Repositories
{
    public class CodeBarreRackRepository : ICodeBarreRackRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreRackRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodeBarreRack>> GetAllAsync()
        {
            return await _context.CodeBarreRacks
                                 .Include(r => r.CodeBarreRackRack)
                                 .ToListAsync();
        }

        public async Task<CodeBarreRack?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreRacks
                                 .Include(r => r.CodeBarreRackRack)
                                 .FirstOrDefaultAsync(x => x.CodeBarreRackId == id);
        }

        public void Delete(CodeBarreRack entity)
        {
            _context.CodeBarreRacks.Remove(entity);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<CodeBarreRack?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreRacks
                                 .Include(c => c.CodeBarreRackRack)
                                 .FirstOrDefaultAsync(c => c.Code == code);
        }

        public async Task AddAsync(CodeBarreRack entity)
        {
            await _context.CodeBarreRacks.AddAsync(entity);
            await _context.SaveChangesAsync();
        }
    }
}
