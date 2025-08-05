using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class GestionProduitService : IGestionProduitService
    {
        private readonly IGestionProduitRepository _repository;

        public GestionProduitService(IGestionProduitRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<GestionProduit>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<GestionProduit?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(GestionProduit entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(GestionProduit entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<GestionProduit>> SearchByCodeBarreOrProduitNomAsync(string searchTerm)
        {
            return await _repository.SearchByCodeBarreOrProduitNomAsync(searchTerm);
        }

        public async Task AddCodeBarreEtageAsync(CodeBarreEtage entity)
        {
            await _repository.AddCodeBarreEtageAsync(entity);
        }

        public async Task UpdateCodeBarreEtageAsync(CodeBarreEtage entity)
        {
            await _repository.UpdateCodeBarreEtageAsync(entity);
        }

        public async Task DeleteCodeBarreEtageAsync(int id)
        {
            await _repository.DeleteCodeBarreEtageAsync(id);
        }

        public async Task AddCodeBarreRangeeAsync(CodeBarreRangee entity)
        {
            await _repository.AddCodeBarreRangeeAsync(entity);
        }

        public async Task UpdateCodeBarreRangeeAsync(CodeBarreRangee entity)
        {
            await _repository.UpdateCodeBarreRangeeAsync(entity);
        }

        public async Task DeleteCodeBarreRangeeAsync(int id)
        {
            await _repository.DeleteCodeBarreRangeeAsync(id);
        }

        public async Task AddCodeBarreAlleeAsync(CodeBarreAllee entity)
        {
            await _repository.AddCodeBarreAlleeAsync(entity);
        }

        public async Task UpdateCodeBarreAlleeAsync(CodeBarreAllee entity)
        {
            await _repository.UpdateCodeBarreAlleeAsync(entity);
        }

        public async Task DeleteCodeBarreAlleeAsync(int id)
        {
            await _repository.DeleteCodeBarreAlleeAsync(id);
        }

        public async Task AddCodeBarreZoneAsync(CodeBarreZone entity)
        {
            await _repository.AddCodeBarreZoneAsync(entity);
        }

        public async Task UpdateCodeBarreZoneAsync(CodeBarreZone entity)
        {
            await _repository.UpdateCodeBarreZoneAsync(entity);
        }

        public async Task DeleteCodeBarreZoneAsync(int id)
        {
            await _repository.DeleteCodeBarreZoneAsync(id);
        }

        public async Task AddCodeBarreCommercialAsync(CodeBarreCommercial entity)
        {
            await _repository.AddCodeBarreCommercialAsync(entity);
        }

        public async Task UpdateCodeBarreCommercialAsync(CodeBarreCommercial entity)
        {
            await _repository.UpdateCodeBarreCommercialAsync(entity);
        }

        public async Task DeleteCodeBarreCommercialAsync(int id)
        {
            await _repository.DeleteCodeBarreCommercialAsync(id);
        }
    }
}