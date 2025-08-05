using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IRegionRepository
    {
        Task<IEnumerable<Region>> GetAllAsync();
        Task<Region?> GetByIdAsync(int id);
        Task<Region> AddAsync(Region region);
        Task UpdateAsync(Region region);
        Task DeleteAsync(int id);
    }
}