using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;

namespace Service.Services
{
    public class RegionService : IRegionService
    {
        private readonly IRegionRepository _repository;

        public RegionService(IRegionRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Region>> GetAllAsync() => _repository.GetAllAsync();
        public Task<Region?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);
        public Task<Region> AddAsync(Region region) => _repository.AddAsync(region);
        public Task UpdateAsync(Region region) => _repository.UpdateAsync(region);
        public Task DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}