using Domain.Entities;
using Domain.Models;
using Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Services
{
    public class PredictionService : IPredictionService
    {
        private readonly IProduitService _produitService;

        public PredictionService(IProduitService produitService)
        {
            _produitService = produitService;
        }

        public async Task<IEnumerable<StockPrediction>> PredictStockAsync()
        {
            var produits = await _produitService.GetAllAsync();
            var predictions = new List<StockPrediction>();

            foreach (var produit in produits)
            {
                var prediction = CalculatePredictionForProduct(produit);
                predictions.Add(prediction);
            }

            return predictions;
        }

        private StockPrediction CalculatePredictionForProduct(Produit produit)
        {
            // Simuler un modèle d'IA avec des facteurs réalistes
            var currentStock = produit.Quantite;
            var baseConsumption = CalculateBaseConsumption(produit);
            var seasonalFactor = GetSeasonalFactor();
            var trendFactor = GetTrendFactor(produit);
            var demandVariability = GetDemandVariability();

            // Algorithme de prédiction IA simulé
            var predictedConsumption = baseConsumption * seasonalFactor * trendFactor * demandVariability;
            var predictedStock7Days = Math.Max(0, currentStock - (predictedConsumption * 7));
            var predictedStock30Days = Math.Max(0, currentStock - (predictedConsumption * 30));

            // Déterminer le niveau de risque
            var riskLevel = DetermineRiskLevel(currentStock, predictedConsumption);
            var recommendation = GenerateRecommendation(currentStock, predictedConsumption, riskLevel);

            return new StockPrediction
            {
                ProduitId = produit.Id,
                ProduitNom = produit.Nom,
                CurrentStock = currentStock,
                PredictedStock7Days = (int)Math.Round(predictedStock7Days),
                PredictedStock30Days = (int)Math.Round(predictedStock30Days),
                DailyConsumption = predictedConsumption,
                RiskLevel = riskLevel,
                Recommendation = recommendation,
                ConfidenceScore = CalculateConfidence(),
                PredictionDate = DateTime.Now
            };
        }

        private double CalculateBaseConsumption(Produit produit)
        {
            // Simuler la consommation basée sur le type de produit et l'historique
            var random = new Random(produit.Id); // Seed pour cohérence
            return Math.Max(0.1, produit.Quantite * 0.05 + random.NextDouble() * 2);
        }

        private double GetSeasonalFactor()
        {
            var month = DateTime.Now.Month;
            // Facteur saisonnier (plus élevé en fin d'année)
            return month >= 10 ? 1.3 : month <= 2 ? 1.2 : 1.0;
        }

        private double GetTrendFactor(Produit produit)
        {
            // Simuler une tendance basée sur le prix (produits chers = moins de demande)
            return produit.Prix > 100 ? 0.8 : produit.Prix > 50 ? 0.9 : 1.1;
        }

        private double GetDemandVariability()
        {
            // Ajouter une variabilité réaliste
            var random = new Random();
            return 0.7 + (random.NextDouble() * 0.6); // Entre 0.7 et 1.3
        }

        private string DetermineRiskLevel(int currentStock, double dailyConsumption)
        {
            var daysUntilStockout = currentStock / Math.Max(dailyConsumption, 0.1);
            
            if (daysUntilStockout <= 3) return "CRITIQUE";
            if (daysUntilStockout <= 7) return "ÉLEVÉ";
            if (daysUntilStockout <= 15) return "MOYEN";
            return "FAIBLE";
        }

        private string GenerateRecommendation(int currentStock, double dailyConsumption, string riskLevel)
        {
            var daysUntilStockout = currentStock / Math.Max(dailyConsumption, 0.1);
            var recommendedOrder = (int)Math.Ceiling(dailyConsumption * 30); // Stock pour 30 jours

            return riskLevel switch
            {
                "CRITIQUE" => $"⚠️ URGENT: Commander {recommendedOrder} unités immédiatement!",
                "ÉLEVÉ" => $"🔔 Commander {recommendedOrder} unités dans les 2-3 jours",
                "MOYEN" => $"📅 Planifier commande de {recommendedOrder} unités d'ici 1 semaine",
                _ => $"✅ Stock suffisant pour {(int)daysUntilStockout} jours"
            };
        }

        private double CalculateConfidence()
        {
            var random = new Random();
            return 0.75 + (random.NextDouble() * 0.2); // Entre 75% et 95%
        }
    }
}