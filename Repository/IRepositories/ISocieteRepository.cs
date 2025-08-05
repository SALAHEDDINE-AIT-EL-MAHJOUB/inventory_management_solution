using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ISocieteRepository : IGenericRepository<Societe>
    {
        public Task<List<Societe>> GetSocieteByClientId(int id);
        public Task<List<Societe>> GetByIds(List<int?> ids);
        public Task<List<Societe>> GetSocieteByClientIdFilter(int id,string? societers);
        Task UpdateSociete(Societe societe);
        Task DeleteSociete(int id);
        Task<Societe?> GetById(int id);
        Task<bool> IsUniqueSocieteAsync(string ifValue, string nom, string email, int? excludeId = null);
        Task<Societe?> CreateSociete(Societe societe);
        Task<List<Societe>> GetAll();
    }
}
