using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IRangeeService
    {
        Task<IEnumerable<Rangee>> GetAllAsync();
        Task<Rangee?> GetByIdAsync(int id);
        Task AddAsync(Rangee entity);
        Task UpdateAsync(Rangee entity);
        Task DeleteAsync(Rangee entity);
    }
}