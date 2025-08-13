using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IOperateurRepository
{
    Task<List<Operateur>> GetAllAsync();
    Task<Operateur?> GetByIdAsync(int id);
    Task<Operateur?> GetOperateurByUserId(string userId);
    Task<List<Operateur>> GetOperateurBySiteId(int siteId);
    Task<Operateur> AddAsync(Operateur entity);
    Task UpdateAsync(Operateur entity);
    Task DeleteAsync(int id);
    Task<int> CountAsync();
}