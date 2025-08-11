using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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
        public async Task<Dictionary<string, int>> GetStatutCountsAsync()
        {
            var statuts = await _statutRepository.GetAllAsync();
            return statuts
                .GroupBy(s => s.StatutNom) // Utilisez StatutNom ou StatutLibelle
                .ToDictionary(g => g.Key ?? "Inconnu", g => g.Count());
        }
    }
}