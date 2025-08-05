using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class CodeBarreZoneService : ICodeBarreZoneService
    {
        private readonly ICodeBarreZoneRepository _repository;

        public CodeBarreZoneService(ICodeBarreZoneRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodeBarreZone>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreZone?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodeBarreZone?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodeBarreZone entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(CodeBarreZone entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(CodeBarreZone entity)
        {
            await _repository.DeleteAsync(entity);
        }

        public Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId)
        {
            // Implémentez la logique d’alerte ici
            return Task.CompletedTask;
        }
    }
}