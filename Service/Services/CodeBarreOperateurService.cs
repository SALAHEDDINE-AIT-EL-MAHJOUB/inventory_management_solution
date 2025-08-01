using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class CodeBarreOperateurService : ICodeBarreOperateurService
    {
        private readonly ICodeBarreOperateurRepository _repository;

        public CodeBarreOperateurService(ICodeBarreOperateurRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodeBarreOperateur>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreOperateur?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodeBarreOperateur?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodeBarreOperateur entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(CodeBarreOperateur entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(CodeBarreOperateur entity)
        {
            await _repository.DeleteAsync(entity);
        }

        public Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId)
        {
            // Implémentez ici la logique d’alerte (log, notification, etc.)
            return Task.CompletedTask;
        }
    }
}