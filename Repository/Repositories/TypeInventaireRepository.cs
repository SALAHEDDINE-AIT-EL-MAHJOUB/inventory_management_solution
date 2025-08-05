using Domain.Entities;
using Repository.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Data;

namespace Repository.Repositories
{
    public class TypeInventaireRepository : ITypeInventaireRepository
    {
        private readonly ApplicationDbContext _context;
        public TypeInventaireRepository(ApplicationDbContext context) => _context = context;

        public async Task<TypeInventaire?> GetByIdAsync(int id) =>
            await _context.TypeInventaires.FindAsync(id);

        public async Task<TypeInventaire?> GetByLibelleAsync(string libelle) =>
            await _context.TypeInventaires.FirstOrDefaultAsync(t => t.TypeInventaireLibelle == libelle);

        public async Task<IEnumerable<TypeInventaire>> GetAllAsync() =>
            await _context.TypeInventaires.ToListAsync();

        public async Task AddAsync(TypeInventaire entity)
        {
            await _context.TypeInventaires.AddAsync(entity);
            await SaveAsync();
        }

        public async Task SaveAsync() => await _context.SaveChangesAsync();

        public void Delete(TypeInventaire entity)
        {
            _context.TypeInventaires.Remove(entity);
        }
    }
}
