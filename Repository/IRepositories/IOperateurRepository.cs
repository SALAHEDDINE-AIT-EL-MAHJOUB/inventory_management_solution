using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface IOperateurRepository : IGenericRepository<Operateur>
    {
        public Task<Operateur?> GetOperateurByUserId(string id);

        public Task<List<Operateur>> GetOperateurBySiteId(int siteId);
    }
}