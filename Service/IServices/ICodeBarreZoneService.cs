using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface ICodeBarreZoneService
    {
        Task<IEnumerable<CodeBarreZone>> GetAllAsync();
        Task<CodeBarreZone?> GetByIdAsync(int id);
        Task<CodeBarreZone?> GetByCodeAsync(string code);
        Task AddAsync(CodeBarreZone entity);
        Task UpdateAsync(CodeBarreZone entity);
        Task DeleteAsync(CodeBarreZone entity);

        }
}