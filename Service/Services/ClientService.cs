using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            return await _clientRepository.GetAllAsync();
        }

        public async Task<Client?> GetByIdAsync(int id, bool includeRelated = true)
        {
            return await _clientRepository.GetByIdAsync(id, includeRelated);
        }

        public async Task<Client?> GetByEmailAsync(string email, bool includeRelated = true)
        {
            return await _clientRepository.GetByEmailAsync(email, includeRelated);
        }

        public async Task<Client?> GetByNameAsync(string name, bool includeRelated = true)
        {
            return await _clientRepository.GetByNameAsync(name, includeRelated);
        }

        public async Task<Client?> GetClientUserById(string id)
        {
            return await _clientRepository.GetClientUserById(id);
        }

        public async Task<Client?> GetClientByEmail(string email)
        {
            return await _clientRepository.GetClientByEmail(email);
        }

        public async Task AddAsync(Client entity)
        {
            await _clientRepository.AddAsync(entity);
        }

        public async Task UpdateAsync(Client entity)
        {
            await _clientRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Client entity)
        {
            await _clientRepository.DeleteAsync(entity);
        }
    }
}