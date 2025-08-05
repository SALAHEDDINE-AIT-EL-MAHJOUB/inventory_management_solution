using System.Threading.Tasks;
using Service.Dtos; // Ajoute ce using

namespace Service.IServices
{
    public interface IStatsService
    {
        Task<StatsGeneralesDto> GetGeneralStatsAsync();
    }
}