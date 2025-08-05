using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class TypeInventaireService : ITypeInventaireService
    {
        private readonly ITypeInventaireRepository _repository;

        public TypeInventaireService(ITypeInventaireRepository repository)
        {
            _repository = repository;
        }

        public async Task<TypeInventaire?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<TypeInventaire?> GetByLibelleAsync(string libelle)
        {
            return await _repository.GetByLibelleAsync(libelle);
        }

        public async Task<IEnumerable<TypeInventaire>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task AddAsync(TypeInventaire entity)
        {
            await _repository.AddAsync(entity);
        }

        public void Delete(TypeInventaire entity)
        {
            _repository.Delete(entity);
        }
    }
}