using Domain.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
namespace Repository.IRepositories
{
    public interface IEquipeRepository : IGenericRepository<Equipe>
    {
        Task<List<Equipe>> GetByInventaireIdAsync(int inventaireId);
        Task<Equipe?> GetByIdAsync(int equipeId);
        Task<List<Equipe>> GetByIdsAsync(List<int> ids);
        Task<int?> GetEquipeIdByOperateurEtInventaireAsync(int operateurId, int inventaireId);
        Task<List<Equipe>> GetByOperateurIdAsync(int operateurId);
    }
}
