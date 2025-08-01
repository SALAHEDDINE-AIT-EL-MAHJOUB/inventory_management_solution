using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IFournisseurService
    {
        Task<IEnumerable<Fournisseur>> GetAllAsync();
        Task<Fournisseur?> GetByIdAsync(int id);
        Task AddAsync(Fournisseur fournisseur);
        Task UpdateAsync(Fournisseur fournisseur);
         Task DeleteAsync(int id);
    }
}