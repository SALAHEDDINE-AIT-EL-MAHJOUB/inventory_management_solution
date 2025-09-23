import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const Profil = () => {
  const [operateur, setOperateur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Correction de l'endpoint
    axios
      .get("/api/operateur/me", { withCredentials: true })
      .then((res) => {
        setOperateur(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <OperateurNavbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </>
    );
  }

  if (!operateur) {
    return (
      <>
        <OperateurNavbar />
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>Impossible de charger le profil opérateur.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <OperateurNavbar />
      <div className="profil-page">
        <div className="background-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>

        <div className="profil-container">
          <div className="profil-header">
            <div className="profil-avatar">
              <span>{operateur.nom?.charAt(0)?.toUpperCase() || 'O'}</span>
              <div className="avatar-ring"></div>
            </div>
            <h2>Profil Opérateur</h2>
            <div className="status-badge">Actif</div>
          </div>
          
          <div className="profil-content">
            <div className="profil-field">
              <div className="field-icon">👤</div>
              <div className="field-content">
                <label>Nom complet</label>
                <div className="profil-value">{operateur.nom}</div>
              </div>
            </div>
            
            <div className="profil-field">
              <div className="field-icon">✉️</div>
              <div className="field-content">
                <label>Adresse email</label>
                <div className="profil-value">{operateur.email}</div>
              </div>
            </div>
            
            <div className="profil-field">
              <div className="field-icon">🆔</div>
              <div className="field-content">
                <label>Identifiant</label>
                <div className="profil-value">{operateur.id || operateur._id || operateur.operateurId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profil-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
        }

        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          animation: float 20s infinite linear;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation-delay: -5s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          top: 10%;
          right: 20%;
          animation-delay: -10s;
        }

        .shape-4 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 20%;
          animation-delay: -15s;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0px) rotate(360deg);
            opacity: 0.7;
          }
        }
        
        .profil-container {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          position: relative;
          z-index: 2;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .profil-header {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
          color: white;
          padding: 40px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .profil-header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
        
        .profil-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          margin: 0 auto 20px;
          position: relative;
          z-index: 1;
        }

        .avatar-ring {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: rotate 10s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .profil-header h2 {
          margin: 0 0 12px 0;
          font-size: 2rem;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        .status-badge {
          display: inline-block;
          background: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid rgba(46, 204, 113, 0.3);
          position: relative;
          z-index: 1;
        }
        
        .profil-content {
          padding: 40px 32px;
        }
        
        .profil-field {
          margin-bottom: 28px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: rgba(248, 249, 250, 0.8);
          border-radius: 16px;
          border: 1px solid rgba(233, 236, 239, 0.5);
          transition: all 0.3s ease;
        }

        .profil-field:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.9);
        }

        .field-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .field-content {
          flex: 1;
        }
        
        .profil-field label {
          display: block;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 8px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .profil-value {
          font-size: 18px;
          color: #2c3e50;
          font-weight: 500;
          word-break: break-all;
        }
        
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          color: white;
          position: relative;
          z-index: 2;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .error-icon {
          font-size: 64px;
          margin-bottom: 20px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .profil-container {
            margin: 20px;
            max-width: none;
          }

          .profil-header {
            padding: 32px 24px;
          }

          .profil-content {
            padding: 32px 24px;
          }

          .profil-field {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .field-icon {
            align-self: center;
          }
        }
      `}</style>
    </>
  );
};

export default Profil;