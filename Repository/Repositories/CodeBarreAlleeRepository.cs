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

    public class CodeBarreAlleeRepository : ICodeBarreAlleeRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreAlleeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodeBarreAllee>> GetAllAsync()
        {
            return await _context.CodeBarreAllees.Include(a => a.CodeBarreAlleeAllee).ToListAsync();
        }

        public async Task<CodeBarreAllee?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreAllees.Include(a => a.CodeBarreAlleeAllee).FirstOrDefaultAsync(x => x.CodeBarreAlleeId == id);
        }

        public async Task AddAsync(CodeBarreAllee entity)
        {
            await _context.CodeBarreAllees.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public void Delete(CodeBarreAllee entity)
        {
            _context.CodeBarreAllees.Remove(entity);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<CodeBarreAllee?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreAllees
                .Include(c => c.CodeBarreAlleeAllee)
                .FirstOrDefaultAsync(c => c.Code == code);
        }

        public async Task UpdateAsync(CodeBarreAllee entity)
        {
            _context.CodeBarreAllees.Update(entity);
            await _context.SaveChangesAsync();
        }
      

public async Task DeleteAsync(CodeBarreAllee entity)
{
    _context.CodeBarreAllees.Remove(entity);
    await _context.SaveChangesAsync();
}



    }
}