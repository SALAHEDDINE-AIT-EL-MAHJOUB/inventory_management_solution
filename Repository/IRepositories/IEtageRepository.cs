using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IEtageRepository
    {
        Task<IEnumerable<Etage>> GetAllAsync();
        Task<Etage?> GetByIdAsync(int id);
        Task AddAsync(Etage entity);
        Task UpdateAsync(Etage entity);
        Task DeleteAsync(Etage entity);
        Task SaveAsync();
    }
}