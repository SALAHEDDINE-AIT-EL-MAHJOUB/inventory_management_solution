using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CodeBarreEtageService : ICodeBarreEtageService
    {
        private readonly ICodeBarreEtageRepository _repository;

        public CodeBarreEtageService(ICodeBarreEtageRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodeBarreEtage>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreEtage?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodeBarreEtage?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodeBarreEtage entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task UpdateAsync(CodeBarreEtage entity)
        {
            await _repository.UpdateAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(CodeBarreEtage entity)
        {
            await _repository.DeleteAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId)
        {
            // Ajoute ici la logique pour déclencher une alerte (notification, création d'une entité, etc.)
        }
    }
}
           