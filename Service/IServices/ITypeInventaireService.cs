using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ITypeInventaireService
    {
        Task<TypeInventaire?> GetByIdAsync(int id);
        Task<TypeInventaire?> GetByLibelleAsync(string libelle);
        Task<IEnumerable<TypeInventaire>> GetAllAsync();
        Task AddAsync(TypeInventaire entity);
        void Delete(TypeInventaire entity);
    }
}