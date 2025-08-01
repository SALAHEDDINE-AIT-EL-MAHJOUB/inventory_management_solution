using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly ApplicationDbContext _context;

        public ClientService(IClientRepository clientRepository, ApplicationDbContext context)
        {
            _clientRepository = clientRepository;
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            return await _clientRepository.GetAllAsync();
        }

        public async Task<Client?> GetByIdAsync(int id, bool includeRelated = true)
        {
            return await _clientRepository.GetByIdAsync(id, includeRelated);
        }

        public async Task<Client> GetByEmailAsync(string email, bool includeDeleted)
        {
            if (includeDeleted)
                return await _context.Clients.FirstOrDefaultAsync(c => c.Email == email);
            else
                return await _context.Clients.FirstOrDefaultAsync(c => c.Email == email && !c.IsDeleted);
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

        public async Task<Client> AddAsync(Client client)
        {
            try
            {
                // Validate the client object before adding
                if (client == null)
                    throw new ArgumentNullException(nameof(client));
                
                if (string.IsNullOrEmpty(client.UserId))
                    throw new ArgumentException("UserId cannot be null or empty", nameof(client.UserId));
                
                // Log the client data being added
                Console.WriteLine($"Adding client: {client.ClientNom}, UserId: {client.UserId}, Email: {client.Email}");
                
                // Appel au repository (sans assignation si void)
                await _clientRepository.AddAsync(client);
                
                // Récupérer le client créé par email pour avoir l'ID
                var addedClient = await GetByEmailAsync(client.Email, false);
                
                // Vérifier que l'ID a été généré
                if (addedClient == null || addedClient.ClientId <= 0)
                {
                    throw new InvalidOperationException("Client ID was not generated after save");
                }
                
                Console.WriteLine($"Client added successfully with ID: {addedClient.ClientId}");
                
                // Retourner le client créé
                return addedClient;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ClientService.AddAsync: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                throw; // Re-throw to maintain the original exception
            }
        }

        public async Task UpdateAsync(Client entity)
        {
            await _clientRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Client entity)
        {
            await _clientRepository.DeleteAsync(entity);
        }

        public async Task ActivateAsync(int clientId)
        {
            var client = await _clientRepository.GetByIdAsync(clientId, true);
            if (client != null)
            {
                client.IsActive = true;
                client.ClientDateInactif = null;
                await _clientRepository.UpdateAsync(client);
            }
        }

        public async Task DeactivateAsync(int clientId)
        {
            var client = await _clientRepository.GetByIdAsync(clientId, true);
            if (client != null)
            {
                client.IsActive = false;
                client.ClientDateInactif = DateTime.UtcNow;
                await _clientRepository.UpdateAsync(client);
            }
        }
    }
}