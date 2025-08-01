using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ISocieteService
    {
        Task<List<Societe>> GetByIds(List<int?> ids);
        Task<List<Societe>> GetSocieteByClientId(int id);
         Task<List<Societe>> GetSocieteByClientIdFilter(int id, string? societers);
    }
}