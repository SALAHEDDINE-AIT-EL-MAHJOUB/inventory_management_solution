using Domain.Entities;

namespace Service.IServices
{
    public interface IRegionService
    {
        Task<IEnumerable<Region>> GetAllAsync();
        Task<Region?> GetByIdAsync(int id);
        Task<Region> AddAsync(Region region);
        Task UpdateAsync(Region region);
        Task DeleteAsync(int id);
    }
}