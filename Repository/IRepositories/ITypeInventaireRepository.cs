using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.IRepositories
{
    public interface ITypeInventaireRepository
    {
        Task<TypeInventaire?> GetByIdAsync(int id);
        Task<TypeInventaire?> GetByLibelleAsync(string libelle);
        Task<IEnumerable<TypeInventaire>> GetAllAsync();
        Task AddAsync(TypeInventaire entity);
        Task SaveAsync();
        void Delete(TypeInventaire entity);
    }
}
