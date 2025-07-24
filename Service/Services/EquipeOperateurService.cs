using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class EquipeOperateurService : IEquipeOperateurService
    {
        private readonly IEquipeOperateurRepository _repository;

        public EquipeOperateurService(IEquipeOperateurRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EquipeOperateur>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<EquipeOperateur?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(EquipeOperateur entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(EquipeOperateur entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(EquipeOperateur entity)
        {
            await _repository.DeleteAsync(entity);
        }

        public async Task<List<EquipeOperateur>> GetByEquipeIdAsync(int equipeId)
        {
            return await _repository.GetByEquipeIdAsync(equipeId);
        }
    }
}