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
    public class CodeBarreZoneRepository : ICodeBarreZoneRepository
    {
        private readonly ApplicationDbContext _context;

        public CodeBarreZoneRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CodeBarreZone>> GetAllAsync()
        {
            return await _context.CodeBarreZones.Include(z => z.ZoneSite).ToListAsync();
        }

        public async Task<CodeBarreZone?> GetByIdAsync(int id)
        {
            return await _context.CodeBarreZones.Include(z => z.ZoneSite).FirstOrDefaultAsync(x => x.ZoneId == id);
        }

        public async Task<CodeBarreZone?> GetByCodeAsync(string code)
        {
            return await _context.CodeBarreZones
                .Include(z => z.ZoneSite)
                .FirstOrDefaultAsync(z => z.ZoneNom == code);
        }

        public async Task AddAsync(CodeBarreZone entity)
        {
            await _context.CodeBarreZones.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public void Delete(CodeBarreZone entity)
        {
            _context.CodeBarreZones.Remove(entity);
        }
      

        public async Task UpdateAsync(CodeBarreZone entity)
        {
            _context.CodeBarreZones.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(CodeBarreZone entity)
        {
            _context.CodeBarreZones.Remove(entity);
            await _context.SaveChangesAsync();
        }


        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
