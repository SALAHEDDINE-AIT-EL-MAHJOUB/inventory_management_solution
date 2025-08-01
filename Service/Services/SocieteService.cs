using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SocieteService : ISocieteService
    {
        private readonly ISocieteRepository _societeRepository;

        public SocieteService(ISocieteRepository societeRepository)
        {
            _societeRepository = societeRepository;
        }

        public async Task<List<Societe>> GetByIds(List<int?> ids)
        {
            return await _societeRepository.GetByIds(ids);
        }

        public async Task<List<Societe>> GetSocieteByClientId(int id)
        {
            return await _societeRepository.GetSocieteByClientId(id);
        }

         public async Task<List<Societe>> GetSocieteByClientIdFilter(int id, string? societers)
        {
            return await _societeRepository.GetSocieteByClientIdFilter(id, societers);
        }
    }
}