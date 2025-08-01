using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class VilleService : IVilleService
    {
        private readonly IVilleRepository _villeRepository;

        public VilleService(IVilleRepository villeRepository)
        {
            _villeRepository = villeRepository;
        }

        public async Task<List<Ville>> GetByIds(List<int?> ids)
        {
            return await _villeRepository.GetByIds(ids);
        }

       
        public async Task<Ville?> GetByIdAsync(int id)
        {
            return await _villeRepository.GetByIdAsync(id);
        }
    }
}