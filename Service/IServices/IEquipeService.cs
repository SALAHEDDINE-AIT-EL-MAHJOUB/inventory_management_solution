using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IEquipeService
    {
        Task<IEnumerable<Equipe>> GetAllAsync();
        Task<Equipe?> GetByIdAsync(int id);
        Task<List<Equipe>> GetByInventaireIdAsync(int inventaireId);
        Task<List<Equipe>> GetByIdsAsync(List<int> ids);
        Task<int?> GetEquipeIdByOperateurEtInventaireAsync(int operateurId, int inventaireId);
        Task AddAsync(Equipe entity);
        Task UpdateAsync(Equipe entity);
        Task DeleteAsync(Equipe entity);
        Task<List<Equipe>> GetByOperateurIdAsync(int operateurId);
        Task<List<Equipe>> GetEquipesByOperateurIdAsync(int operateurId);
    }
}