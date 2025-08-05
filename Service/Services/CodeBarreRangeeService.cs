using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CodeBarreRangeeService : ICodeBarreRangeeService
    {
        private readonly ICodeBarreRangeeRepository _repository;

        public CodeBarreRangeeService(ICodeBarreRangeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CodeBarreRangee>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<CodeBarreRangee?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<CodeBarreRangee?> GetByCodeAsync(string code)
        {
            return await _repository.GetByCodeAsync(code);
        }

        public async Task AddAsync(CodeBarreRangee entity)
        {
            await _repository.AddAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task UpdateAsync(CodeBarreRangee entity)
        {
            await _repository.UpdateAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeleteAsync(CodeBarreRangee entity)
        {
            await _repository.DeleteAsync(entity);
            await _repository.SaveAsync();
        }

        public async Task DeclencherAlerteCodeInconnuAsync(string code, int equipeId)
        {
            //  ajouter la logique pour notifier l'équipe ou enregistrer une alerte
            }
    }
}