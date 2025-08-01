using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class OperateurService : IOperateurService
    {
        private readonly IOperateurRepository _operateurRepository;

        public OperateurService(IOperateurRepository operateurRepository)
        {
            _operateurRepository = operateurRepository;
        }

        public async Task<IEnumerable<Operateur>> GetAllAsync()
        {
            return await _operateurRepository.GetAllAsync();
        }

        public async Task<Operateur?> GetByIdAsync(int id)
        {
            return await _operateurRepository.GetByIdAsync(id);
        }

        public async Task<Operateur?> GetByUserIdAsync(string userId)
        {
            return await _operateurRepository.GetOperateurByUserId(userId);
        }

        public async Task<List<Operateur>> GetBySiteIdAsync(int siteId)
        {
            return await _operateurRepository.GetOperateurBySiteId(siteId);
        }

        public async Task AddAsync(Operateur entity)
        {
            await _operateurRepository.AddAsync(entity);
        }

        public async Task UpdateAsync(Operateur entity)
        {
            await _operateurRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Operateur entity)
        {
            await _operateurRepository.DeleteAsync(entity);
        }
    }
}