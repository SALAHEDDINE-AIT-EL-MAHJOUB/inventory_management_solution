using Domain.Entities;

public interface ICodeBarreAlleeRepository
{
    Task<IEnumerable<CodeBarreAllee>> GetAllAsync();
    Task<CodeBarreAllee?> GetByIdAsync(int id);
    Task AddAsync(CodeBarreAllee entity);
    void Delete(CodeBarreAllee entity);
    Task SaveAsync();
Task UpdateAsync(CodeBarreAllee entity); 
        Task DeleteAsync(CodeBarreAllee entity); 

    Task<CodeBarreAllee?> GetByCodeAsync(string code);

}
