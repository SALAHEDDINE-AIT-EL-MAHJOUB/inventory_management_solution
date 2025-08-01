using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class EtageService : IEtageService
    {
        private readonly IEtageRepository _repository;

        public EtageService(IEtageRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Etage>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Etage?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Etage entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(Etage entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Etage entity)
        {
            await _repository.DeleteAsync(entity);
        }

        public async Task SaveAsync()
        {
            await _repository.SaveAsync();
        }
    }
}