import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const GestionProduit = () => {
  const [operateur, setOperateur] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barcode, setBarcode] = useState("");
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [quantite, setQuantite] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Récupère l'opérateur connecté - CORRECTION ENDPOINT
  useEffect(() => {
    axios
      .get("/api/operateur/me", { withCredentials: true })
      .then((res) => setOperateur(res.data))
      .catch(() => setOperateur(null));
  }, []);

  // Charge les produits quand l'opérateur est connu
  useEffect(() => {
    if (!operateur) return;
    setLoading(true);
    const operateurId = operateur.id || operateur._id || operateur.operateurId;
    console.log("Loading products for operator:", operateurId); // Debug
    axios
      .get(`/api/operateur/${operateurId}/produits-inventaire`)
      .then((res) => {
        console.log("Products loaded:", res.data); // Debug
        setProduits(res.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error); // Debug
        setLoading(false);
      });
  }, [operateur]);

  // Recherche du produit par code-barres
  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
    setMessage("");
    setSuccess(false);
    setQuantite("");
    if (e.target.value.length > 0) {
      const prod = produits.find(
        (p) =>
          (p.codeBarre && p.codeBarre === e.target.value) ||
          (p.codebarre && p.codebarre === e.target.value) ||
          (p.codeBarreProduit && p.codeBarreProduit === e.target.value)
      );
      setSelectedProduit(prod || null);
      if (!prod) setMessage("Produit non trouvé.");
    } else {
      setSelectedProduit(null);
    }
  };

  const handleQuantiteChange = (e) => {
    setQuantite(e.target.value);
  };

  const handleSave = () => {
    if (!selectedProduit || !quantite) return;
    setSaving(true);
    axios
      .put(`/api/operateur/gestion-inventaire/${selectedProduit.gestionInventaireId}/quantite`, {
        gestionInventaireId: selectedProduit.gestionInventaireId,
        nouvelleQuantite: Number(quantite),
      })
      .then(() => {
        setSuccess(true);
        setMessage("Quantité enregistrée !");
        setProduits((prev) =>
          prev.map((p) =>
            p.gestionInventaireId === selectedProduit.gestionInventaireId
              ? { ...p, quantiteInventaire: Number(quantite) }
              : p
          )
        );
        setBarcode("");
        setSelectedProduit(null);
        setQuantite("");
        setTimeout(() => setSuccess(false), 1200);
      })
      .catch(() => setMessage("Erreur lors de l'enregistrement."))
      .finally(() => setSaving(false));
  };

  if (loading)
    return (
      <>
        <OperateurNavbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des produits...</p>
        </div>
      </>
    );

  return (
    <>
      <OperateurNavbar />
      <div className="gestion-page">
        <div className="gestion-container">
          <div className="scan-section">
            <h2>Saisie par code-barres</h2>
            
            <div className="scan-input-group">
              <label>Code-barres produit</label>
              <input
                type="text"
                className="scan-input"
                value={barcode}
                onChange={handleBarcodeChange}
                placeholder="Scanner ou saisir le code-barres"
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
                  <label>Quantité inventoriée</label>
                  <div className="quantity-controls">
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantite}
                      min={0}
                      onChange={handleQuantiteChange}
                      placeholder="0"
                    />
                    <button
                      className={`save-btn ${saving ? 'saving' : ''} ${success ? 'success' : ''}`}
                      onClick={handleSave}
                      disabled={saving || !quantite}
                    >
                      {saving ? "..." : success ? "✓" : "Enregistrer"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className={`message ${success ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </div>

          <div className="products-section">
            <h3>Produits à inventorier ({produits.length})</h3>
            
            {produits.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>Aucun produit à inventorier</p>
              </div>
            ) : (
              <div className="products-grid">
                {produits.map((p) => (
                  <div key={p.gestionInventaireId || p.produitId} className="product-card">
                    <div className="product-name">{p.produitNom}</div>
                    <div className="product-quantity">
                      Qté: <span>{p.quantiteInventaire ?? 'Non saisi'}</span>
                    </div>
                    <div className="product-code">{p.codeBarre || p.codeBarreProduit || 'Pas de code'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gestion-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }
        
        .gestion-container {
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
        
        .scan-section h2, .products-section h3 {
          margin: 0 0 24px 0;
          color: #2c3e50;
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
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 120px;
        }
        
        .save-btn:hover:not(:disabled) {
          background: #219a52;
          transform: translateY(-1px);
        }
        
        .save-btn:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        .save-btn.saving {
          background: #f39c12;
        }
        
        .save-btn.success {
          background: #27ae60;
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
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        
        .product-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        
        .product-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
        }
        
        .product-quantity {
          color: #666;
          margin-bottom: 4px;
        }
        
        .product-quantity span {
          font-weight: 600;
          color: #667eea;
        }
        
        .product-code {
          font-size: 12px;
          color: #999;
          font-family: monospace;
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
        }
      `}</style>
    </>
  );
};

export default GestionProduit;