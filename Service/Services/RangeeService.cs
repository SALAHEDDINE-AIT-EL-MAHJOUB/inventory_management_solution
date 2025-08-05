using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RangeeService : IRangeeService
    {
        private readonly IRangeeRepository _rangeeRepository;

        public RangeeService(IRangeeRepository rangeeRepository)
        {
            _rangeeRepository = rangeeRepository;
        }

        public async Task<IEnumerable<Rangee>> GetAllAsync()
        {
            return await _rangeeRepository.GetAllAsync();
        }

        public async Task<Rangee?> GetByIdAsync(int id)
        {
            return await _rangeeRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(Rangee rangee)
        {
            await _rangeeRepository.AddAsync(rangee);
        }

        public async Task UpdateAsync(Rangee rangee)
        {
            await _rangeeRepository.UpdateAsync(rangee);
        }

        public async Task DeleteAsync(int id)
        {
            await _rangeeRepository.DeleteAsync(id);
        }
    }
}