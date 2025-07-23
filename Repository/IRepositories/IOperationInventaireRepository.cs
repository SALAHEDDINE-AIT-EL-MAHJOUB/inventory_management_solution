using Domain.Entities;

namespace Domain.IRepositories
{
    public interface IOperationInventaireRepository : IGenericRepository<OperationInventaire>
    {
        Task<List<OperationInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(OperationInventaire operation);

    }
}
