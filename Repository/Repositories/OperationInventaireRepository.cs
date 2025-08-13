using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class OperationInventaireRepository : IOperationInventaireRepository
{
    private readonly ApplicationDbContext _context;

    public OperationInventaireRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OperationInventaire>> GetAllAsync() =>
        await _context.OperationInventaires.ToListAsync();

    public async Task<OperationInventaire?> GetByIdAsync(int id) =>
        await _context.OperationInventaires.FindAsync(id);

    public async Task AddAsync(OperationInventaire entity)
    {
        _context.OperationInventaires.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(OperationInventaire entity)
    {
        _context.OperationInventaires.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.OperationInventaires.FindAsync(id);
        if (entity != null)
        {
            _context.OperationInventaires.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    // Ajoutez cette méthode :
    public async Task<IEnumerable<OperationInventaire>> GetByZoneIdAsync(int zoneId)
    {
        return await _context.OperationInventaires
            .Where(o => o.OperationInventaireZoneId == zoneId)
            .ToListAsync();
    }

    public async Task<IEnumerable<OperationInventaire>> GetByInventaireIdAsync(int inventaireId)
    {
        return await _context.OperationInventaires
            .Where(o => o.OperationInventaireInventaireId == inventaireId)
            .ToListAsync();
    }
}
