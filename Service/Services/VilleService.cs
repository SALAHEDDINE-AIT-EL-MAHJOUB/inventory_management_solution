using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class VilleService : IVilleService
    {
        private readonly IGenericRepository<Ville> _villeRepository;

        public VilleService(IGenericRepository<Ville> villeRepository)
        {
            _villeRepository = villeRepository;
        }

        public async Task<List<Ville>> GetAllAsync()
        {
            return await _villeRepository.GetAllAsync();
        }

        public async Task<Ville?> GetVilleById(int id)
        {
            return await _villeRepository.GetByIdAsync(id);
        }
    }
}