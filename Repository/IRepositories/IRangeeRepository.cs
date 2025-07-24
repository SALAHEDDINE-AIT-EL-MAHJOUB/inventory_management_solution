using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories{
    public interface IRangeeRepository
    {
        Task<IEnumerable<Rangee>> GetAllAsync();
        Task<Rangee?> GetByIdAsync(int id);
        Task AddAsync(Rangee rangee);
        Task UpdateAsync(Rangee rangee);
        Task DeleteAsync(int id);
    }
}