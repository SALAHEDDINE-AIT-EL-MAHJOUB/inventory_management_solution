using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data;

public class OperateurRepository : IOperateurRepository
{
    private readonly ApplicationDbContext _context;
    public OperateurRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Operateur>> GetAllAsync()
    {
        return await _context.Operateurs.ToListAsync();
    }

    public async Task<Operateur?> GetByIdAsync(int id)
    {
        return await _context.Operateurs.FindAsync(id);
    }

    public async Task<Operateur?> GetOperateurByUserId(string userId)
    {
        return await _context.Operateurs.FirstOrDefaultAsync(o => o.UserId == userId);
    }

    public async Task<List<Operateur>> GetOperateurBySiteId(int siteId)
    {
        return await _context.Operateurs.Where(o => o.SiteId == siteId).ToListAsync();
    }

    public async Task<Operateur> AddAsync(Operateur entity)
    {
        _context.Operateurs.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Operateur entity)
    {
        _context.Operateurs.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Operateurs.FindAsync(id);
        if (entity != null)
        {
            _context.Operateurs.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<int> CountAsync()
    {
        return await _context.Operateurs.CountAsync();
    }
}