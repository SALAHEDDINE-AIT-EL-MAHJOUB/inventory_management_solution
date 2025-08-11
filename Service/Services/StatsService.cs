using Service.IServices;
using Service.Dtos;
using Repository.IRepositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace Service.Services
{
    public class StatsService : IStatsService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly ISocieteRepository _societeRepository;
        private readonly ISiteRepository _siteRepository;
        private readonly IVilleRepository _villeRepository;
        private readonly IOperateurRepository _operateurRepository;
        private readonly IProduitRepository _produitRepository;
        private readonly IInventaireRepository _inventaireRepository;

        public StatsService(IClientRepository clientRepository, IAdminRepository adminRepository, ISocieteRepository societeRepository, ISiteRepository siteRepository, IVilleRepository villeRepository, IOperateurRepository operateurRepository, IProduitRepository produitRepository, IInventaireRepository inventaireRepository)
        {
            _clientRepository = clientRepository;
            _adminRepository = adminRepository;
            _societeRepository = societeRepository;
            _siteRepository = siteRepository;
            _villeRepository = villeRepository;
            _operateurRepository = operateurRepository;
            _produitRepository = produitRepository;
            _inventaireRepository = inventaireRepository;
        }

        public async Task<StatsGeneralesDto> GetGeneralStatsAsync()
        {
            return new StatsGeneralesDto
            {
                Societes = await _societeRepository.CountAsync(),
                Sites = await _siteRepository.CountAsync(),
                Villes = await _villeRepository.CountAsync(),
                Operateurs = await _operateurRepository.CountAsync(),
                Produits = await _produitRepository.CountAsync(),
                Inventaires = await _inventaireRepository.CountAsync()
            };
        }
    }
}