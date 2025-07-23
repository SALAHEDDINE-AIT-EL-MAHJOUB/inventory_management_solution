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
    public class FormProduitRepository : GenericRepository<FormProduit> , IFormProduitRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<GenericRepository<FormProduit>> _logger;

        public FormProduitRepository(ApplicationDbContext context,ILogger<GenericRepository<FormProduit>> logger):base(context,logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<FormProduit>> GetByProduitId(int id)
        {
            try
            {
                var res = await _context.FormProduits
                    .Where(p=>p.Id == id)
                    .ToListAsync();
                return res;
            }
            catch
            {
                throw new NotImplementedException();
            }
        }
        public async Task<List<FormProduit>> GetAllAsync(Expression<Func<FormProduit, bool>> predicate)
        {
            return await _context.FormProduits
                .Where(predicate)
                .ToListAsync();
        }
        public async Task<FormProduit?> GetByCodeBarreAsync(string codeBarre)
        {
            return await _context.FormProduits
                .FirstOrDefaultAsync(fp => fp.CodeBarre == codeBarre);
        }

       

    }
}
