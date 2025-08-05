using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Services
{
    public class EquipeService : IEquipeService
    {
        private readonly IEquipeRepository _repository;

        public EquipeService(IEquipeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Equipe>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Equipe?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<Equipe>> GetByInventaireIdAsync(int inventaireId)
        {
            return await _repository.GetByInventaireIdAsync(inventaireId);
        }

        public async Task<List<Equipe>> GetByIdsAsync(List<int> ids)
        {
            return await _repository.GetByIdsAsync(ids);
        }

        public async Task<int?> GetEquipeIdByOperateurEtInventaireAsync(int operateurId, int inventaireId)
        {
            return await _repository.GetEquipeIdByOperateurEtInventaireAsync(operateurId, inventaireId);
        }

        public async Task AddAsync(Equipe entity)
        {
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(Equipe entity)
        {
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Equipe entity)
        {
            await _repository.DeleteAsync(entity);
        }
    }
}