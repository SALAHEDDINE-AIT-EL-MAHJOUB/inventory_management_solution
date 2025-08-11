using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IStatutRepository
    {
        Task<List<Statut>> GetAllAsync();
        Task<Statut?> GetByIdAsync(int id);
    }
}