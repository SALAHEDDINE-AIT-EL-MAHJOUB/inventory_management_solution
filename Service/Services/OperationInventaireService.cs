using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OperationInventaireService : IOperationInventaireService
    {
        private readonly IOperationInventaireRepository _operationInventaireRepository;

        public OperationInventaireService(IOperationInventaireRepository operationInventaireRepository)
        {
            _operationInventaireRepository = operationInventaireRepository;
        }

        public async Task<List<OperationInventaire>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _operationInventaireRepository.GetByInventaireIdAsync(inventaireId);
        }

        public async Task AddAsync(OperationInventaire operation)
        {
            await _operationInventaireRepository.AddAsync(operation);
        }
    }
}