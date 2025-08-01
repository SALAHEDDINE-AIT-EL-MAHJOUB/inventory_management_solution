using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IEtageService
    {
        Task<IEnumerable<Etage>> GetAllAsync();
        Task<Etage?> GetByIdAsync(int id);
        Task AddAsync(Etage entity);
        Task UpdateAsync(Etage entity);
        Task DeleteAsync(Etage entity);
        Task SaveAsync();
    }
}