using Service.IServices;
using Service.Dtos;
using Repository.IRepositories;
using System.Threading.Tasks;

namespace Service.Services
{
    public class StatsService : IStatsService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IAdminRepository _adminRepository;

        public StatsService(IClientRepository clientRepository, IAdminRepository adminRepository)
        {
            _clientRepository = clientRepository;
            _adminRepository = adminRepository;
        }

        public async Task<StatsGeneralesDto> GetGeneralStatsAsync()
        {
            var totalClients = (await _clientRepository.GetAllAsync()).Count();
            var totalAdmins = (await _adminRepository.GetAllActiveAdminsAsync()).Count();
            return new StatsGeneralesDto
            {
                TotalClients = totalClients,
                TotalAdmins = totalAdmins
            };
        }
    }
}