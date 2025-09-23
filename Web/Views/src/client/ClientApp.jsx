import React, { useState, useEffect } from "react";
import ClientLogin from "./ClientLogin";
import ClientDashboard from "./ClientDashboard";

const ClientApp = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si on a des données en localStorage au démarrage
    const savedClientInfo = localStorage.getItem("clientInfo");
    if (savedClientInfo) {
      try {
        const parsedData = JSON.parse(savedClientInfo);
        setClientInfo(parsedData);
      } catch (error) {
        console.error("Erreur parsing clientInfo:", error);
        localStorage.removeItem("clientInfo");
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (data) => {
    setClientInfo(data);
  };

  const handleLogout = () => {
    setClientInfo(null);
    localStorage.removeItem("clientInfo");
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h2 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '300',
          letterSpacing: '2px'
        }}>
          StockPilot
        </h2>
        <p style={{ 
          margin: '10px 0 0', 
          fontSize: '16px', 
          opacity: 0.8 
        }}>
          Chargement de l'application...
        </p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {clientInfo ? (
        <ClientDashboard 
          clientInfo={clientInfo} 
          onLogout={handleLogout} 
        />
      ) : (
        <ClientLogin onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default ClientApp;