using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class StatutService : IStatutService
    {
        private readonly IStatutRepository _statutRepository;

        public StatutService(IStatutRepository statutRepository)
        {
            _statutRepository = statutRepository;
        }

        public async Task<List<Statut>> GetAllAsync()
        {
            return await _statutRepository.GetAllAsync();
        }
    }
}