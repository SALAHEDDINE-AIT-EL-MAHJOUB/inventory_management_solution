using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IOperationInventaireRepository : IGenericRepository<OperationInventaire>
    {
        Task<List<OperationInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(OperationInventaire operation);

    }
}
