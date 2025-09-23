import React, { useEffect, useState } from "react";
import axios from "axios";

const CreeEquipe = ({ equipe, onCreated, onCancel }) => {
  const [sites, setSites] = useState([]);
  const [operateurs, setOperateurs] = useState([]);
  const [selectedSite, setSelectedSite] = useState(equipe ? equipe.siteId : "");
  const [selectedOperateurs, setSelectedOperateurs] = useState(equipe ? equipe.membres || [] : []);
  const [nom, setNom] = useState(equipe ? equipe.nom : "");
  const [description, setDescription] = useState(equipe ? equipe.description : "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Charger les sites au montage
  useEffect(() => {
    fetch("/api/site")
      .then((res) => res.json())
      .then(setSites)
      .catch(() => setSites([]));
  }, []);

  // Charger les opérateurs quand un site est sélectionné
  useEffect(() => {
    if (selectedSite) {
      fetch(`/api/Operateur?siteId=${selectedSite}`)
        .then((res) => res.json())
        .then(setOperateurs)
        .catch(() => setOperateurs([]));
    } else {
      setOperateurs([]);
      setSelectedOperateurs([]);
    }
  }, [selectedSite]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    
    if (!nom || !selectedSite || selectedOperateurs.length === 0) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    const dto = {
      nom,
      description,
      siteId: parseInt(selectedSite),
      operateurIds: selectedOperateurs.map(Number),
    };

    try {
      let res;
      if (equipe && equipe.equipeId) {
        // Mode modification
        res = await fetch(`/api/Equipe/${equipe.equipeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        });
      } else {
        // Mode création
        res = await fetch("/api/Equipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        });
      }

      if (res.ok) {
        setMessage(equipe ? "Équipe modifiée avec succès !" : "Équipe créée avec succès !");
        setMessageType("success");
        
        if (!equipe) {
          // Reset form only for creation
          setNom("");
          setDescription("");
          setSelectedSite("");
          setSelectedOperateurs([]);
        }
        
        if (onCreated) {
          setTimeout(() => {
            onCreated();
          }, 1500);
        }
      } else {
        const err = await res.text();
        setMessage("Erreur: " + err);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleOperateurToggle = (operateurId) => {
    setSelectedOperateurs(prev => {
      if (prev.includes(operateurId)) {
        return prev.filter(id => id !== operateurId);
      } else {
        return [...prev, operateurId];
      }
    });
  };

  const getSiteNom = (siteId) => {
    const site = sites.find(s => s.id === parseInt(siteId));
    return site ? site.siteNom : `Site #${siteId}`;
  };

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "32px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px"
        }}>
          <h2 style={{
            color: "#1e293b",
            margin: 0,
            fontSize: "28px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <i className={`fas ${equipe ? "fa-edit" : "fa-plus-circle"}`} style={{ color: "#667eea" }}></i>
            {equipe ? "Modifier l'équipe" : "Créer une équipe"}
          </h2>
          
          {onCancel && (
            <button
              onClick={onCancel}
              style={{
                background: "transparent",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "#64748b",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "600"
              }}
            >
              <i className="fas fa-times"></i>
              Fermer
            </button>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div style={{
            marginBottom: "24px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: messageType === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${messageType === "success" ? "#bbf7d0" : "#fecaca"}`,
            color: messageType === "success" ? "#166534" : "#dc2626",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-triangle"}`}></i>
            {message}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            {/* Nom de l'équipe */}
            <div>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
                color: "#475569",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                <i className="fas fa-users" style={{ fontSize: "14px", color: "#667eea" }}></i>
                Nom de l'équipe *
              </label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
                placeholder="Saisir le nom de l'équipe"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  transition: "border-color 0.2s",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* Site */}
            <div>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
                color: "#475569",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                <i className="fas fa-building" style={{ fontSize: "14px", color: "#667eea" }}></i>
                Site *
              </label>
              <select
                value={selectedSite}
                onChange={e => setSelectedSite(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  transition: "border-color 0.2s",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              >
                <option value="">Sélectionner un site</option>
                {sites.map(site => (
                  <option key={site.id} value={site.id}>{site.siteNom}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              <i className="fas fa-file-alt" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description de l'équipe (optionnel)"
              rows={3}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Opérateurs */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              color: "#475569",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              <i className="fas fa-user-friends" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Opérateurs * {selectedSite && `(Site: ${getSiteNom(selectedSite)})`}
            </label>
            
            {!selectedSite ? (
              <div style={{
                padding: "32px",
                textAlign: "center",
                background: "#f1f5f9",
                borderRadius: "8px",
                color: "#64748b",
                border: "2px dashed #e2e8f0"
              }}>
                <i className="fas fa-building" style={{ fontSize: "24px", color: "#94a3b8", marginBottom: "8px" }}></i>
                <div>Veuillez d'abord sélectionner un site</div>
              </div>
            ) : operateurs.length === 0 ? (
              <div style={{
                padding: "32px",
                textAlign: "center",
                background: "#fef2f2",
                borderRadius: "8px",
                color: "#dc2626",
                border: "2px dashed #fecaca"
              }}>
                <i className="fas fa-user-slash" style={{ fontSize: "24px", color: "#ef4444", marginBottom: "8px" }}></i>
                <div>Aucun opérateur disponible pour ce site</div>
              </div>
            ) : (
              <div style={{
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                maxHeight: "300px",
                overflowY: "auto"
              }}>
                {operateurs.map((op, idx) => (
                  <div
                    key={op.id}
                    onClick={() => handleOperateurToggle(String(op.id))}
                    style={{
                      padding: "12px 16px",
                      borderBottom: idx < operateurs.length - 1 ? "1px solid #e2e8f0" : "none",
                      cursor: "pointer",
                      background: selectedOperateurs.includes(String(op.id)) ? "#f0f9ff" : "#ffffff",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                    onMouseOver={(e) => {
                      if (!selectedOperateurs.includes(String(op.id))) {
                        e.currentTarget.style.background = "#f8fafc";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = selectedOperateurs.includes(String(op.id)) ? "#f0f9ff" : "#ffffff";
                    }}
                  >
                    <div style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: "2px solid #e2e8f0",
                      background: selectedOperateurs.includes(String(op.id)) ? "#667eea" : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease"
                    }}>
                      {selectedOperateurs.includes(String(op.id)) && (
                        <i className="fas fa-check" style={{ color: "#ffffff", fontSize: "12px" }}></i>
                      )}
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: 1
                    }}>
                      <i className="fas fa-user" style={{ 
                        color: selectedOperateurs.includes(String(op.id)) ? "#667eea" : "#94a3b8",
                        fontSize: "14px"
                      }}></i>
                      <span style={{
                        fontWeight: selectedOperateurs.includes(String(op.id)) ? "600" : "400",
                        color: selectedOperateurs.includes(String(op.id)) ? "#1e293b" : "#64748b"
                      }}>
                        {op.nom} {op.prenom}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedOperateurs.length > 0 && (
              <div style={{
                marginTop: "12px",
                padding: "12px 16px",
                background: "#f0fdf4",
                borderRadius: "8px",
                border: "1px solid #bbf7d0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <i className="fas fa-check-circle" style={{ color: "#22c55e", fontSize: "14px" }}></i>
                <span style={{ color: "#166534", fontSize: "14px", fontWeight: "600" }}>
                  {selectedOperateurs.length} opérateur{selectedOperateurs.length > 1 ? 's' : ''} sélectionné{selectedOperateurs.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                style={{
                  background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px"
                }}
              >
                <i className="fas fa-times"></i>
                Annuler
              </button>
            )}
            
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading 
                  ? "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)"
                  : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#ffffff",
                border: "none",
                padding: "12px 32px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                boxShadow: loading ? "none" : "0 4px 15px rgba(34, 197, 94, 0.3)",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)")}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" style={{ fontSize: "16px" }}></i>
                  Chargement...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  {equipe ? "Sauvegarder les modifications" : "Créer l'équipe"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreeEquipe;