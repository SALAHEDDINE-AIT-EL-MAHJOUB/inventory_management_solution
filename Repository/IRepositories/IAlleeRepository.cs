using Domain.Entities;

namespace Repository.IRepositories
{
    public interface IAlleeRepository : IGenericRepository<Allee>
    {
        public Task<List<Allee>> GetAlleeByZoneId(int id);
        public Task<List<Allee>> GetAlleeByClientId(int id);
        public Task<List<Allee>> GetByIds(List<int?> ids);
        // Nouvelle méthode : Rechercher une Allee par son nom exact
        Task<List<Allee>> GetAlleeByName(int clientId, string alleeNom);

        // New method to get Allee names by zone name and client ID
        Task<List<string>> GetAlleeNamesByZoneName(int clientId, string zoneName);

    }
}
