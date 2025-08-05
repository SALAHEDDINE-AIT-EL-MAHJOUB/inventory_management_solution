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

        public async Task<Societe?> GetById(int id)
        {
            return await _societeRepository.GetById(id);
        }

        public async Task<List<Societe>> GetAll()
        {
            return await _societeRepository.GetAll();
        }

        public async Task<Societe> CreateSociete(Societe societe)
        {
            return await _societeRepository.CreateSociete(societe);
        }

        public async Task UpdateSociete(Societe societe)
        {
            await _societeRepository.UpdateSociete(societe);
        }

        public async Task DeleteSociete(int id)
        {
            await _societeRepository.DeleteSociete(id);
        }

        public async Task<bool> IsUniqueSocieteAsync(string ifValue, string nom, string email, int? excludeId = null)
        {
            return await _societeRepository.IsUniqueSocieteAsync(ifValue, nom, email, excludeId);
        }
    }
}