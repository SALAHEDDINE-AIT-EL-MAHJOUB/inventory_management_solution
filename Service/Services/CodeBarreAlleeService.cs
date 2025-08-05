using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CodeBarreAlleeService : ICodeBarreAlleeService
    {
        private readonly ICodeBarreAlleeRepository _repository;
       

        public async Task<IEnumerable<CodeBarreAllee>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreAllee?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodeBarreAllee?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodeBarreAllee entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task UpdateAsync(CodeBarreAllee entity)
        {
            await _repository.UpdateAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(CodeBarreAllee entity)
        {
            await _repository.DeleteAsync(entity);
            await _repository.SaveAsync();
        }

      
    }
}