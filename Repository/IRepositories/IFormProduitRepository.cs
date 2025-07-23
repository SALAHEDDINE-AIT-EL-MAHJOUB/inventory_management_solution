using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IFormProduitRepository : IGenericRepository<FormProduit>
    {
        public Task<List<FormProduit>> GetByProduitId(int id);
        Task<List<FormProduit>> GetAllAsync(Expression<Func<FormProduit, bool>> predicate);
        Task<FormProduit?> GetByCodeBarreAsync(string codeBarre);

    }
}
