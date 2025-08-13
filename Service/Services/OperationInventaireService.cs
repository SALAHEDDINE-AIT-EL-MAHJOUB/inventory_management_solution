using Domain.Entities;
using Repository.IRepositories;
using Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

public class OperationInventaireService : IOperationInventaireService
{
    private readonly IOperationInventaireRepository _repository;

    public OperationInventaireService(IOperationInventaireRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<OperationInventaire>> GetAllAsync() =>
        await _repository.GetAllAsync();

    public async Task<OperationInventaire?> GetByIdAsync(int id) =>
        await _repository.GetByIdAsync(id);

    public async Task<IEnumerable<OperationInventaire>> GetByZoneIdAsync(int zoneId) =>
        await _repository.GetByZoneIdAsync(zoneId);

    public async Task<IEnumerable<OperationInventaire>> GetByInventaireIdAsync(int inventaireId) =>
        await _repository.GetByInventaireIdAsync(inventaireId);

    public async Task AddAsync(OperationInventaire entity) =>
        await _repository.AddAsync(entity);

    public async Task UpdateAsync(OperationInventaire entity) =>
        await _repository.UpdateAsync(entity);

    public async Task DeleteAsync(int id) =>
        await _repository.DeleteAsync(id);
}