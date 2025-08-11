using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.IServices
{
    public interface IStatutService
    {    Task<Dictionary<string, int>> GetStatutCountsAsync();

        Task<List<Statut>> GetAllAsync();
    }
}