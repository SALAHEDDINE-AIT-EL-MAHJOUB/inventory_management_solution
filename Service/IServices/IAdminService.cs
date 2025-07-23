using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Service.Dtos;
namespace Service.Iservices
{
    public interface IAdminService
    {
        Task<Admin?> GetByIdAsync(int id);
        Task<Admin?> GetByUserIdAsync(string userId);
        Task<Admin?> GetByEmailAsync(string email);
        Task<IEnumerable<Admin>> GetAllActiveAdminsAsync();
        Task<bool> IsSuperAdminAsync(string userId);
        Task AddAsync(Admin entity);
        Task UpdateAsync(Admin entity);
        Task DeleteAsync(Admin entity);

        // Options pour l'admin selon le diagramme
        Task ModifierProfilAsync(Admin admin);
        Task<IEnumerable<Client>> ConsulterClientsAsync();
        Task ActiverClientAsync(int clientId);
        Task CreerClientAsync(Client client);
        Task DesactiverClientAsync(int clientId);
        Task<StatsGeneralesDto> ConsulterStatsGeneralesAsync();
    }
}