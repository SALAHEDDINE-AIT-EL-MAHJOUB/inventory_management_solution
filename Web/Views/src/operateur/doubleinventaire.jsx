import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const tableStyle = {
  margin: "30px auto",
  borderCollapse: "collapse",
  minWidth: "400px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
  overflow: "hidden",
};

const thStyle = {
  background: "#2c3e50",
  color: "#fff",
  padding: "12px 16px",
  textAlign: "center",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px 16px",
  borderBottom: "1px solid #eaeaea",
  textAlign: "center",
};

const inputStyle = {
  width: "80px",
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const buttonStyle = {
  background: "#2980b9",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "7px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.2s",
};
const buttonHoverStyle = {
  background: "#1c5a85",
};

const messageStyle = {
  color: "#27ae60",
  fontWeight: "bold",
  margin: "16px auto",
  textAlign: "center",
  background: "#eafaf1",
  borderRadius: "6px",
  padding: "8px 0",
  width: "fit-content",
};

const DoubleInventaire = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operateurId, setOperateurId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    // 1. Récupérer l'opérateur connecté
    axios
      .get("/api/operateur/me")
      .then((res) => {
        setOperateurId(res.data.operateurId || res.data.id || res.data.Id);
      })
      .catch(() => setOperateurId(null));
  }, []);

  useEffect(() => {
    if (!operateurId) return;
    setLoading(true);
    axios
      .get(`/api/operateur/${operateurId}/double-inventaire`)
      .then((res) => setProduits(res.data))
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
    } catch {
      setMessage("Erreur lors de la modification.");
    }
  };

  if (loading)
    return (
      <>
        <OperateurNavbar />
        <div style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</div>
      </>
    );

  return (
    <>
      <OperateurNavbar />
      <div style={{ minHeight: "80vh", background: "#f4f7fa", paddingTop: "40px" }}>
        {message && <div style={messageStyle}>{message}</div>}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Scanner ou saisir le code-barres"
            value={barcode}
            onChange={(e) => {
              setBarcode(e.target.value);
              setMessage("");
            }}
            style={{
              ...inputStyle,
              width: "220px",
              marginRight: "16px",
              fontSize: "16px",
            }}
            autoFocus
          />
        </div>
        {selectedProduit && (
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
              padding: "24px",
              maxWidth: "400px",
              margin: "0 auto 32px auto",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <b>Produit :</b> {selectedProduit.produitNom}
            </div>
            <div style={{ marginBottom: 12 }}>
              <b>Code-barres :</b> {selectedProduit.codeBarre || selectedProduit.codeBarreProduit}
            </div>
            <div style={{ marginBottom: 12 }}>
              <b>Quantité double :</b>
              <input
                type="number"
                value={
                  editValues[selectedProduit.gestionInventaireId] ??
                  (selectedProduit.quantiteInventaireDouble ?? "")
                }
                onChange={(e) =>
                  handleInputChange(selectedProduit.gestionInventaireId, e.target.value)
                }
                style={{ ...inputStyle, marginLeft: 8 }}
                disabled={!selectedProduit} 
              />
            </div>
            <button
              style={buttonStyle}
              onClick={() => handleSave(selectedProduit.gestionInventaireId)}
              disabled={!selectedProduit}
            >
              Enregistrer
            </button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {produits.length === 0 ? (
            <div style={{ background: "#fff", padding: "30px 60px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(44,62,80,0.08)" }}>
              Aucun produit à double saisir.
            </div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Produit</th>
                 
                  <th style={thStyle}>Quantité Double</th>
                  
                </tr>
              </thead>
              <tbody>
                {produits.map((p) => (
                  <tr key={p.gestionInventaireId}>
                    <td style={tdStyle}>{p.produitNom || p.produitId}</td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={
                          editValues[p.gestionInventaireId] ??
                          (p.quantiteInventaireDouble ?? "")
                        }
                        onChange={(e) =>
                          handleInputChange(p.gestionInventaireId, e.target.value)
                        }
                        style={inputStyle}
                        disabled={
                          !selectedProduit ||
                          selectedProduit.gestionInventaireId !== p.gestionInventaireId
                        }
                      />
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DoubleInventaire;