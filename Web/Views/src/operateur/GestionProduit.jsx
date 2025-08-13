import React, { useEffect, useState } from "react";
import axios from "axios";
import OperateurNavbar from "./navbar";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "30px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
};

const thStyle = {
  background: "#2c3e50",
  color: "#fff",
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #eaeaea",
};

const inputStyle = {
  width: "120px",
  padding: "6px",
  border: "1px solid #bfc9d1",
  borderRadius: "4px",
  fontSize: "15px",
};

const buttonStyle = {
  background: "#27ae60",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "7px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.2s",
};

const buttonDisabledStyle = {
  ...buttonStyle,
  background: "#bdc3c7",
  cursor: "not-allowed",
};

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

  // Récupère l'opérateur connecté
  useEffect(() => {
    axios
      .get("/api/Operateur/me", { withCredentials: true })
      .then((res) => setOperateur(res.data))
      .catch(() => setOperateur(null));
  }, []);

  // Charge les produits quand l'opérateur est connu
  useEffect(() => {
    if (!operateur) return;
    setLoading(true);
    const operateurId = operateur.id || operateur._id;
    axios
      .get(`/api/operateur/${operateurId}/produits-inventaire`)
      .then((res) => {
        setProduits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
          (p.codebarre && p.codebarre === e.target.value)
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
        <div style={{ padding: "40px", textAlign: "center" }}>Chargement...</div>
      </>
    );

  return (
    <div style={{ background: "#f4f8fb", minHeight: "100vh" }}>
      <OperateurNavbar />
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
          padding: "32px",
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "24px" }}>Saisie par code-barres</h2>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, marginRight: 12 }}>
            Code-barres produit :
          </label>
          <input
            type="text"
            style={inputStyle}
            value={barcode}
            onChange={handleBarcodeChange}
            placeholder="Scanner ou saisir le code-barres"
            autoFocus
          />
        </div>
        {selectedProduit && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8 }}>
              <b>Produit :</b> {selectedProduit.produitNom}
            </div>
            <label style={{ fontWeight: 500, marginRight: 12 }}>
              Quantité :
            </label>
            <input
              type="number"
              style={inputStyle}
              value={quantite}
              min={0}
              onChange={handleQuantiteChange}
              placeholder="Entrer la quantité"
            />
            <button
              style={saving ? buttonDisabledStyle : buttonStyle}
              onClick={handleSave}
              disabled={saving || !quantite}
            >
              {saving ? "Enregistrement..." : success ? "✔️" : "Enregistrer"}
            </button>
          </div>
        )}
        {message && (
          <div style={{ color: success ? "#27ae60" : "#e74c3c", marginBottom: 16 }}>
            {message}
          </div>
        )}
        <hr style={{ margin: "32px 0" }} />
        <h3 style={{ color: "#2c3e50", marginBottom: "16px" }}>Produits à inventorier</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Produit</th>
             <th style={thStyle}>Quantité à inventorier</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((p) => (
              <tr key={p.gestionInventaireId || p.produitId}>
                <td style={tdStyle}>{p.produitNom}</td>
               
                <td style={tdStyle}>{p.quantiteInventaire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionProduit;