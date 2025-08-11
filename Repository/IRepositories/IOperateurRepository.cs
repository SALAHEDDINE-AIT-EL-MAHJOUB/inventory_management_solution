using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IOperateurRepository : IGenericRepository<Operateur>
    {
        public Task<Operateur?> GetOperateurByUserId(string id);
 Task AddAsync(Operateur operateur);
      Task<int> CountAsync();
        public Task<List<Operateur>> GetOperateurBySiteId(int siteId);
    }
}