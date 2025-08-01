using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IOperationInventaireService
    {
        Task<List<OperationInventaire>> GetByInventaireIdAsync(int inventaireId);
        Task AddAsync(OperationInventaire operation);
    }
}