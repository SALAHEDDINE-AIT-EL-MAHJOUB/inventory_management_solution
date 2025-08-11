using Domain.Entities;
using Repository.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Data;

namespace Repository.Repositories
{
    public class TypeInventaireRepository : ITypeInventaireRepository
    {
        private readonly ApplicationDbContext _context;

        public TypeInventaireRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AjouterTypeInventaireAsync(string libelle)
        {
            var type = new TypeInventaire { TypeInventaireLibelle = libelle };
            _context.TypeInventaires.Add(type);
            await _context.SaveChangesAsync();
        }

        public List<TypeInventaire> ObtenirTous()
        {
            return _context.TypeInventaires.ToList();
        }
    }
}