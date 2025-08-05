using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CodeBarreCommercialService : ICodeBarreCommercialService
    {
        private readonly ICodeBarreCommercialRepository _repository;

        public CodeBarreCommercialService(ICodeBarreCommercialRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodeBarreCommercial>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreCommercial?> GetByIdAsync(int commercialId)
        {
            return await _repository.GetByIdAsync(commercialId);
        }

        public async Task<CodeBarreCommercial?> GetByCodeAsync(string code)
        {
            // Ajoutez cette méthode dans le repository si besoin
            var all = await _repository.GetAllAsync();
            return all.FirstOrDefault(x => x.Code == code);
        }

        public async Task AddAsync(CodeBarreCommercial entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(CodeBarreCommercial entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(CodeBarreCommercial entity)
        {
            // Ajoutez une méthode DeleteAsync(entity) dans le repository si besoin
            await _repository.DeleteAsync(entity.CommercialId);
        }

        public Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId)
        {
            // Implémentez ici la logique d’alerte (log, notification, etc.)
            return Task.CompletedTask;
        }
    }
}