using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AlleeService : IAlleeService
    {
        private readonly IAlleeRepository _alleeRepository;

        public AlleeService(IAlleeRepository alleeRepository)
        {
            _alleeRepository = alleeRepository;
        }

        public async Task AddAsync(Allee entity)
        {
            await _alleeRepository.AddAsync(entity);
        }

        public async Task<IEnumerable<Allee>> GetAllAsync()
        {
            return await _alleeRepository.GetAllAsync();
        }

        public async Task<List<Allee>> GetAllAlleesWithDetails()
        {
            return await _alleeRepository.GetAllAlleesWithDetails();
        }

        public async Task<Allee?> GetByIdAsync(int id)
        {
            return await _alleeRepository.GetByIdAsync(id);
        }

        public async Task DeleteAsync(int id)
        {
            await _alleeRepository.DeleteAsync(id);
        }

        public async Task<Allee?> GetByIdWithSiteAndSocieteAsync(int id)
        {
            return await _alleeRepository.GetByIdWithSiteAndSocieteAsync(id);
        }

        public async Task<List<Allee>> GetAlleeByClientId(int clientId)
        {
            return await _alleeRepository.GetAlleeByClientId(clientId);
        }

        public async Task<List<Allee>> GetAlleeByZoneId(int zoneId)
        {
            return await _alleeRepository.GetAlleeByZoneId(zoneId);
        }

        public async Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom)
        {
            return await _alleeRepository.GetAlleeByName(clientId, alleeNom);
        }

        public async Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName)
        {
            return await _alleeRepository.GetAlleeNamesByZoneName(clientId, zoneName);
        }
    }
}

