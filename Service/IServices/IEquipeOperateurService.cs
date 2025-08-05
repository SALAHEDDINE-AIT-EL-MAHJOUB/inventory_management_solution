using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IEquipeOperateurService
    {
        Task<IEnumerable<EquipeOperateur>> GetAllAsync();
        Task<EquipeOperateur?> GetByIdAsync(int id);
        Task AddAsync(EquipeOperateur entity);
        Task UpdateAsync(EquipeOperateur entity);
        Task DeleteAsync(EquipeOperateur entity);
 }
}