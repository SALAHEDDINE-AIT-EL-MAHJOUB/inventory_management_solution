using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class FournisseurService : IFournisseurService
    {
        private readonly IFournisseurRepository _repository;

        public FournisseurService(IFournisseurRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Fournisseur>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Fournisseur?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Fournisseur fournisseur)
        {
            await _repository.AddAsync(fournisseur);
        }

        public async Task UpdateAsync(Fournisseur fournisseur)
        {
            await _repository.UpdateAsync(fournisseur);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}