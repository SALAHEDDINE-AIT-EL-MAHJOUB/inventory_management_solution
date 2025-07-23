using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface ISocieteRepository : IGenericRepository<Societe>
    {
        public Task<List<Societe>> GetSocieteByClientId(int id);
        public Task<List<Societe>> GetByIds(List<int?> ids);
        public Task<List<Societe>> GetSocieteByClientIdFilter(int id,string? societers);
    }
}
