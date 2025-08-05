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
        Task<Societe?> GetById(int id);
        Task<Societe> CreateSociete(Societe societe);
        Task UpdateSociete(Societe societe);
        Task DeleteSociete(int id);
        Task<List<Societe>> GetAll();
        Task<bool> IsUniqueSocieteAsync(string ifValue, string nom, string email, int? excludeId = null);
    }
}