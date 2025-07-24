using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface IFournisseurRepository
    {
        Task<IEnumerable<Fournisseur>> GetAllAsync();
        Task<Fournisseur> GetByIdAsync(int id);
        Task AddAsync(Fournisseur fournisseur);
        Task UpdateAsync(Fournisseur fournisseur);
        Task DeleteAsync(int id);
    }
}