using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CodebarreProduitService : ICodebarreProduitService
    {
        private readonly ICodebarreProduitRepository _repository;

        public CodebarreProduitService(ICodebarreProduitRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodebarreProduit>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodebarreProduit?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodebarreProduit?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodebarreProduit entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(CodebarreProduit entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(CodebarreProduit entity)
        {
            await _repository.DeleteAsync(entity);
        }
    }
}