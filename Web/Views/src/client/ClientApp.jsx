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
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Chargement...
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