using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RangeeService : IRangeeService
    {
        private readonly IRangeeRepository _repository;

        public RangeeService(IRangeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Rangee>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Rangee?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Rangee entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(Rangee entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Rangee entity)
        {
            // Suppression logique : on passe par UpdateAsync pour IsDeleted
            entity.IsDeleted = true;
            await _repository.UpdateAsync(entity);
        }
    }
}