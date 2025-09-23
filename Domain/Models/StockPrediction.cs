using System;

namespace Domain.Models
{
    public class StockPrediction
    {
        public int ProduitId { get; set; }
        public string ProduitNom { get; set; }
        public int CurrentStock { get; set; }
        public int PredictedStock7Days { get; set; }
        public int PredictedStock30Days { get; set; }
        public double DailyConsumption { get; set; }
        public string RiskLevel { get; set; }
        public string Recommendation { get; set; }
        public double ConfidenceScore { get; set; }
        public DateTime PredictionDate { get; set; }
    }
}