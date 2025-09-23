import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const DoubleInventaire = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operateurId, setOperateurId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");
  const [barcode, setBarcode] = useState("");
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    // 1. Récupérer l'opérateur connecté
    axios
      .get("/api/operateur/me")
      .then((res) => {
        const id = res.data.operateurId || res.data.id || res.data.Id;
        console.log("Operator ID:", id); // Debug
        setOperateurId(id);
      })
      .catch((error) => {
        console.error("Error fetching operator:", error); // Debug
        setOperateurId(null);
      });
  }, []);

  useEffect(() => {
    if (!operateurId) return;
    setLoading(true);
    console.log("Loading double inventory for operator:", operateurId); // Debug
    axios
      .get(`/api/operateur/${operateurId}/double-inventaire`)
      .then((res) => {
        console.log("Double inventory loaded:", res.data); // Debug
        setProduits(res.data || []);
      })
      .catch((error) => {
        console.error("Error loading double inventory:", error); // Debug
        setProduits([]);
      })
      .finally(() => setLoading(false));
  }, [operateurId, message]);

  // Recherche produit par code-barres
  useEffect(() => {
    if (!barcode) {
      setSelectedProduit(null);
      return;
    }
    const found = produits.find(
      (p) =>
        (p.codeBarre && p.codeBarre.toLowerCase() === barcode.toLowerCase()) ||
        (p.codeBarreProduit && p.codeBarreProduit.toLowerCase() === barcode.toLowerCase())
    );
    setSelectedProduit(found || null);
  }, [barcode, produits]);

  const handleInputChange = (id, value) => {
    setEditValues({ ...editValues, [id]: value });
  };

  const handleSave = async (id) => {
    const nouvelleQuantite = parseInt(editValues[id], 10);
    if (isNaN(nouvelleQuantite)) {
      setMessage("Veuillez saisir une quantité valide.");
      return;
    }
    try {
      await axios.put(
        `/api/operateur/double-inventaire/${id}/quantite-double`,
        nouvelleQuantite,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Quantité double modifiée !");
      setTimeout(() => setMessage(""), 2000);
      setBarcode(""); // Réinitialise la recherche après modification
    } catch (error) {
      console.error("Error saving:", error);
      setMessage("Erreur lors de la modification.");
    }
  };

  if (loading)
    return (
      <>
        <OperateurNavbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du double inventaire...</p>
        </div>
      </>
    );

  return (
    <>
      <OperateurNavbar />
      <div className="double-page">
        <div className="double-container">
          <div className="scan-section">
            <h2>Double inventaire</h2>
            <p className="scan-subtitle">Vérification et contrôle des quantités</p>
            
            {message && (
              <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
            
            <div className="scan-input-group">
              <label>Code-barres produit</label>
              <input
                type="text"
                className="scan-input"
                placeholder="Scanner ou saisir le code-barres"
                value={barcode}
                onChange={(e) => {
                  setBarcode(e.target.value);
                  setMessage("");
                }}
                autoFocus
              />
            </div>

            {selectedProduit && (
              <div className="product-details">
                <div className="product-info">
                  <h3>{selectedProduit.produitNom}</h3>
                  <p>Code: {selectedProduit.codeBarre || selectedProduit.codeBarreProduit}</p>
                </div>
                
                <div className="quantity-input-group">
                  <label>Quantité double inventaire</label>
                  <div className="quantity-controls">
                    <input
                      type="number"
                      className="quantity-input"
                      value={
                        editValues[selectedProduit.gestionInventaireId] ??
                        (selectedProduit.quantiteInventaireDouble ?? "")
                      }
                      onChange={(e) =>
                        handleInputChange(selectedProduit.gestionInventaireId, e.target.value)
                      }
                      placeholder="0"
                    />
                    <button
                      className="save-btn"
                      onClick={() => handleSave(selectedProduit.gestionInventaireId)}
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="products-section">
            <h3>Produits en double inventaire ({produits.length})</h3>
            
            {produits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p>Aucun produit en double inventaire</p>
              </div>
            ) : (
              <div className="products-grid">
                {produits.map((p) => (
                  <div 
                    key={p.gestionInventaireId} 
                    className={`product-card ${selectedProduit?.gestionInventaireId === p.gestionInventaireId ? 'selected' : ''}`}
                  >
                    <div className="product-name">{p.produitNom || p.produitId}</div>
                    <div className="product-quantities">
                      <div className="quantity-item">
                        <span className="quantity-label">1ère saisie:</span>
                        <span className="quantity-value">{p.quantiteInventaire ?? 'N/A'}</span>
                      </div>
                      <div className="quantity-item">
                        <span className="quantity-label">2ème saisie:</span>
                        <span className="quantity-value highlight">
                          {editValues[p.gestionInventaireId] ?? (p.quantiteInventaireDouble ?? 'Non saisi')}
                        </span>
                      </div>
                    </div>
                    <div className="product-code">{p.codeBarre || p.codeBarreProduit || 'Pas de code'}</div>
                    
                    <div className="quick-edit">
                      <input
                        type="number"
                        className="quick-input"
                        value={
                          editValues[p.gestionInventaireId] ??
                          (p.quantiteInventaireDouble ?? "")
                        }
                        onChange={(e) =>
                          handleInputChange(p.gestionInventaireId, e.target.value)
                        }
                        placeholder="Qté"
                        disabled={
                          selectedProduit &&
                          selectedProduit.gestionInventaireId !== p.gestionInventaireId
                        }
                      />
                      <button
                        className="quick-save-btn"
                        onClick={() => handleSave(p.gestionInventaireId)}
                        disabled={
                          selectedProduit &&
                          selectedProduit.gestionInventaireId !== p.gestionInventaireId
                        }
                      >
                        ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .double-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .double-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          gap: 24px;
        }
        
        .scan-section, .products-section {
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        .scan-section h2 {
          margin: 0 0 8px 0;
          color: #2c3e50;
        }
        
        .scan-subtitle {
          margin: 0 0 24px 0;
          color: #666;
          font-size: 14px;
        }
        
        .scan-input-group, .quantity-input-group {
          margin-bottom: 24px;
        }
        
        .scan-input-group label, .quantity-input-group label {
          display: block;
          font-weight: 600;
          color: #666;
          margin-bottom: 8px;
        }
        
        .scan-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .scan-input:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .product-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .product-info h3 {
          margin: 0 0 8px 0;
          color: #2c3e50;
        }
        
        .product-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        
        .quantity-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .quantity-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 16px;
        }
        
        .save-btn {
          background: #e67e22;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 120px;
        }
        
        .save-btn:hover {
          background: #d35400;
          transform: translateY(-1px);
        }
        
        .message {
          padding: 12px 16px;
          border-radius: 8px;
          margin: 16px 0;
          font-weight: 500;
        }
        
        .message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .products-section h3 {
          margin: 0 0 24px 0;
          color: #2c3e50;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        
        .product-card {
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s;
        }
        
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        
        .product-card.selected {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
        }
        
        .product-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 12px;
        }
        
        .product-quantities {
          margin-bottom: 8px;
        }
        
        .quantity-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        
        .quantity-label {
          font-size: 12px;
          color: #666;
        }
        
        .quantity-value {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .quantity-value.highlight {
          color: #e67e22;
        }
        
        .product-code {
          font-size: 12px;
          color: #999;
          font-family: monospace;
          margin-bottom: 12px;
        }
        
        .quick-edit {
          display: flex;
          gap: 8px;
        }
        
        .quick-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .quick-input:disabled {
          background: #f8f9fa;
          color: #999;
        }
        
        .quick-save-btn {
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 12px;
          cursor: pointer;
          font-weight: bold;
          min-width: 40px;
        }
        
        .quick-save-btn:hover:not(:disabled) {
          background: #219a52;
        }
        
        .quick-save-btn:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          color: white;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255,255,255,0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .quantity-controls {
            flex-direction: column;
          }
          
          .save-btn {
            width: 100%;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default DoubleInventaire;