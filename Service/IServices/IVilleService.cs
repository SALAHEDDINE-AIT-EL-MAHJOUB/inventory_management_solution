using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IVilleService
    {
        Task<List<Ville>> GetAllAsync();
        Task<Ville?> GetVilleById(int id); // Ajoutez cette ligne
        // ...autres méthodes...
    }
}