import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const PredictionStock = () => {
  const [predictionData, setPredictionData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [timelineData, setTimelineData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAIPredictionData();
  }, []);

  const loadAIPredictionData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/Produit/ai-stock-prediction");
      const predictions = res.data;
      setPredictionData(predictions);

      if (predictions && predictions.length > 0) {
        setChartData({
          labels: predictions.map(p => p.produitNom || "Produit inconnu"),
          datasets: [
            {
              label: "Stock actuel",
              data: predictions.map(p => p.currentStock || 0),
              backgroundColor: "rgba(54, 162, 235, 0.8)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Prédiction 7 jours",
              data: predictions.map(p => p.predictedStock7Days || 0),
              backgroundColor: "rgba(255, 193, 7, 0.8)",
              borderColor: "rgba(255, 193, 7, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Prédiction 30 jours",
              data: predictions.map(p => p.predictedStock30Days || 0),
              backgroundColor: "rgba(220, 53, 69, 0.8)",
              borderColor: "rgba(220, 53, 69, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        });

        setTimelineData({
          labels: ["Aujourd'hui", "7 jours", "30 jours"],
          datasets: predictions.slice(0, 5).map((p, index) => ({
            label: p.produitNom || `Produit ${index + 1}`,
            data: [
              p.currentStock || 0, 
              p.predictedStock7Days || 0, 
              p.predictedStock30Days || 0
            ],
            borderColor: `hsl(${index * 72}, 70%, 50%)`,
            backgroundColor: `hsla(${index * 72}, 70%, 50%, 0.1)`,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
          })),
        });
      }
    } catch (e) {
      setError(`Erreur lors du chargement des prédictions IA: ${e.response?.data?.message || e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "CRITIQUE": return "#dc3545";
      case "ÉLEVÉ": return "#fd7e14";
      case "MOYEN": return "#0dcaf0";
      default: return "#198754";
    }
  };

  const getRiskIconClass = (riskLevel) => {
    switch (riskLevel) {
      case "CRITIQUE": return "fa-exclamation-circle";
      case "ÉLEVÉ": return "fa-exclamation-triangle";
      case "MOYEN": return "fa-chart-bar";
      default: return "fa-check-circle";
    }
  };

  const getRiskBadgeStyle = (riskLevel) => {
    const color = getRiskColor(riskLevel);
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      backgroundColor: `${color}15`,
      color: color,
      border: `1px solid ${color}30`,
    };
  };

  // Calcul des statistiques
  const getStatistics = () => {
    if (!predictionData || predictionData.length === 0) {
      return {
        totalProducts: 0,
        criticalAlerts: 0,
        averageConfidence: 0,
        totalCurrentStock: 0
      };
    }

    const criticalAlerts = predictionData.filter(p => p.riskLevel === "CRITIQUE").length;
    const averageConfidence = predictionData.reduce((acc, p) => acc + (p.confidenceScore || 0), 0) / predictionData.length;
    const totalCurrentStock = predictionData.reduce((acc, p) => acc + (p.currentStock || 0), 0);

    return {
      totalProducts: predictionData.length,
      criticalAlerts,
      averageConfidence: Math.round(averageConfidence * 100),
      totalCurrentStock
    };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div style={{ 
        minHeight: "80vh",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "20px",
        margin: "20px",
        color: "white"
      }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          border: "6px solid rgba(255,255,255,0.3)", 
          borderTop: "6px solid white", 
          borderRadius: "50%", 
          animation: "spin 1s linear infinite",
          marginBottom: "30px"
        }}></div>
        <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "300" }}>
          <i className="fas fa-robot" style={{ marginRight: 12 }}></i>IA en cours d'analyse...
        </h2>
        <p style={{ margin: "10px 0 0", opacity: 0.8, fontSize: "16px" }}>
          Traitement des données de prédiction
        </p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: "40px", 
        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
        borderRadius: "20px", 
        margin: "20px",
        color: "white",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(238, 90, 36, 0.3)"
      }}>
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h2 style={{ margin: "0 0 15px", fontSize: "28px", fontWeight: "300" }}>
          Erreur de chargement
        </h2>
        <p style={{ margin: "0 0 25px", opacity: 0.9, fontSize: "16px" }}>{error}</p>
        <button 
          onClick={loadAIPredictionData}
          style={{
            padding: "15px 30px",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
        >
          <i className="fas fa-redo" style={{ marginRight: 8 }}></i>Réessayer l'analyse
        </button>
      </div>
    );
  }

  if (!predictionData || predictionData.length === 0) {
    return (
      <div style={{ 
        padding: "60px", 
        textAlign: "center", 
        background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
        borderRadius: "20px",
        margin: "20px",
        color: "white",
        boxShadow: "0 20px 40px rgba(9, 132, 227, 0.3)"
      }}>
        <div style={{ fontSize: "80px", marginBottom: "30px" }}>
          <i className="fas fa-chart-bar"></i>
        </div>
        <h2 style={{ margin: "0 0 15px", fontSize: "32px", fontWeight: "300" }}>Aucune donnée disponible</h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "18px" }}>
          Veuillez d'abord ajouter des produits dans votre inventaire pour activer l'analyse prédictive.
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "30px", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
      minHeight: "100vh" 
    }}>
      {/* En-tête avec statistiques améliorées */}
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "30px",
        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "15px" }}>
            
            <div>
              <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "300" }}>
                Prédiction de Stock 
              </h1>
              <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: "18px" }}>
                Analyse prédictive alimentée par l'intelligence artificielle
              </p>
            </div>
          </div>
          
          {/* Statistiques en grille */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px", 
            marginTop: "30px" 
          }}>
            <div style={{ 
              background: "rgba(255,255,255,0.15)", 
              padding: "25px", 
              borderRadius: "15px", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
                {stats.totalProducts}
              </div>
              <div style={{ opacity: 0.9, fontSize: "14px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>
                Produits analysés
              </div>
            </div>
            
            <div style={{ 
              background: "rgba(255,255,255,0.15)", 
              padding: "25px", 
              borderRadius: "15px", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
                {stats.criticalAlerts}
              </div>
              <div style={{ opacity: 0.9, fontSize: "14px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>
                Alertes critiques
              </div>
            </div>
            
            <div style={{ 
              background: "rgba(255,255,255,0.15)", 
              padding: "25px", 
              borderRadius: "15px", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
                {stats.averageConfidence}%
              </div>
              <div style={{ opacity: 0.9, fontSize: "14px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>
                Confiance moyenne
              </div>
            </div>

            <div style={{ 
              background: "rgba(255,255,255,0.15)", 
              padding: "25px", 
              borderRadius: "15px", 
              backdropFilter: "blur(10px)", 
              border: "1px solid rgba(255,255,255,0.2)",
              textAlign: "center",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
                {stats.totalCurrentStock}
              </div>
              <div style={{ opacity: 0.9, fontSize: "14px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>
                Stock total actuel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des graphiques */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
        gap: "30px", 
        marginBottom: "30px" 
      }}>
        {/* Graphique en barres - Comparaison des Stocks */}
        {Object.keys(chartData).length > 0 && (
          <div style={{ 
            background: "white", 
            borderRadius: "20px", 
            padding: "30px", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: "25px", 
              paddingBottom: "15px", 
              borderBottom: "2px solid #f1f3f4" 
            }}>
              <i className="fas fa-chart-bar" style={{ 
                fontSize: "24px", 
                color: "#667eea", 
                marginRight: "12px" 
              }}></i>
              <h3 style={{ 
                margin: 0, 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#2c3e50" 
              }}>
                Comparaison des Stocks
              </h3>
            </div>
            <div style={{ height: "300px" }}>
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                          size: 12,
                          weight: '500'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        )}

        {/* Graphique en lignes - Évolution Temporelle */}
        {Object.keys(timelineData).length > 0 && (
          <div style={{ 
            background: "white", 
            borderRadius: "20px", 
            padding: "30px", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: "25px", 
              paddingBottom: "15px", 
              borderBottom: "2px solid #f1f3f4" 
            }}>
              <i className="fas fa-chart-line" style={{ 
                fontSize: "24px", 
                color: "#667eea", 
                marginRight: "12px" 
              }}></i>
              <h3 style={{ 
                margin: 0, 
                fontSize: "20px", 
                fontWeight: "600", 
                color: "#2c3e50" 
              }}>
                Évolution Temporelle
              </h3>
            </div>
            <div style={{ height: "300px" }}>
              <Line 
                data={timelineData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                          size: 12,
                          weight: '500'
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    },
                    x: {
                      grid: {
                        color: 'rgba(0,0,0,0.05)'
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        )}
      </div>

   
    </div>
  );
};

export default PredictionStock;