using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Models;

namespace Service.IServices
{
    public interface IPredictionService
    {
        Task<IEnumerable<StockPrediction>> PredictStockAsync();
    }
}