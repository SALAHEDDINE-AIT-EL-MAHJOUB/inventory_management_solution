import React, { useEffect, useState } from "react";
import axios from "axios";

// Ajoute ce style juste avant le composant ou dans un fichier CSS importé
const tableStyle = `
.gi-table-container {
  max-width: 1000px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px #0001;
  padding: 24px;
}
.gi-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 15px;
}
.gi-table th, .gi-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: center;
}
.gi-table th {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
}
.gi-table tbody tr:nth-child(even) {
  background: #f5f7fa;
}
.gi-table tbody tr:hover {
  background: #e3f2fd;
}
.gi-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 6px 14px;
  cursor: pointer;
  font-weight: 500;
  margin: 0 2px;
  transition: background 0.2s;
}
.gi-btn:hover {
  background: #1565c0;
}
.gi-select {
  border-radius: 4px;
  padding: 5px 8px;
  border: 1px solid #bdbdbd;
  margin-right: 6px;
}
.gi-message {
  margin-bottom: 18px;
  color: #388e3c;
  font-weight: 500;
}
`;

const GestionInventaire = () => {
  const [tableau, setTableau] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventaires, setInventaires] = useState([]);
  const [operateurs, setOperateurs] = useState([]);
  const [showSelect, setShowSelect] = useState(null);
  const [selectedInventaire, setSelectedInventaire] = useState({});
  const [operateurId, setOperateurId] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Injecte le style une seule fois
    if (!document.getElementById("gi-table-style")) {
      const style = document.createElement("style");
      style.id = "gi-table-style";
      style.innerHTML = tableStyle;
      document.head.appendChild(style);
    }

    axios
      .get("/api/gestioninventaire/tableau")
      .then((res) => {
        setTableau(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios.get("/api/inventaire")
      .then(res => setInventaires(res.data))
      .catch(() => setInventaires([]));

    axios.get("/api/operateur")
      .then(res => setOperateurs(res.data))
      .catch(() => setOperateurs([]));
  }, []);

  const handleDoubleSaisieClick = (idx) => {
    setShowSelect(idx);
    setMessage("");
  };

  const handleInventaireChange = (idx, value) => {
    setSelectedInventaire({ ...selectedInventaire, [idx]: value });
  };

  const handleOperateurChange = (idx, value) => {
    setOperateurId({ ...operateurId, [idx]: value });
  };

  const handleValiderDoubleSaisie = async (row, idx) => {
    const operateurVerificateurId = operateurId[idx];
    const gestionInventaireId = row.Id || row.id;
    if (!gestionInventaireId) {
      setMessage("Erreur : ID de la ligne gestion inventaire introuvable.");
      return;
    }
    if (!operateurVerificateurId) {
      setMessage("Veuillez choisir un opérateur vérificateur.");
      return;
    }
    try {
      await axios.post(
        `/api/gestioninventaire/declencher-double-saisie?gestionInventaireId=${gestionInventaireId}&quantiteReference=${row.QuantiteInventaire || row.quantiteInventaire}&operateurVerificateurId=${operateurVerificateurId}`
      );
      setMessage("Double saisie déclenchée avec succès.");
      setShowSelect(null);
    } catch (e) {
      setMessage("Erreur lors de la double saisie.");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="gi-table-container">
      <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 24 }}>Gestion des Inventaires</h2>
      {message && <div className="gi-message">{message}</div>}
      <table className="gi-table">
        <thead>
          <tr>
            <th>Inventaire</th>
            <th>Produit</th>
            <th>Quantité Produit</th>
            <th>Quantité Inventaire</th>
            <th>Décalage</th>
            <th>Quantité Double</th>
            <th>Opérateur Double</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableau.map((row, idx) => (
            <tr key={idx}>
              <td>{row.InventaireNom || row.inventaireNom}</td>
              <td>{row.ProduitNom || row.produitNom}</td>
              <td>{row.QuantiteProduit || row.quantiteProduit}</td>
              <td>{row.QuantiteInventaire || row.quantiteInventaire}</td>
              <td>
                {/* Calcul du décalage */}
                {(Number(row.QuantiteProduit ?? row.quantiteProduit ?? 0) -
                  Number(row.QuantiteInventaire ?? row.quantiteInventaire ?? 0))}
              </td>
              <td>{row.QuantiteInventaireDouble ?? row.quantiteInventaireDouble ?? ""}</td>
              <td>{row.OperateurDoubleNom ?? row.operateurDoubleNom ?? ""}</td>
              <td>{row.Statut || row.statut}</td>
              <td>
                <button className="gi-btn" onClick={() => handleDoubleSaisieClick(idx)}>
                  Double saisie
                </button>
                {showSelect === idx && (
                  <span>
                    <select
                      className="gi-select"
                      value={operateurId[idx] || ""}
                      onChange={e => handleOperateurChange(idx, e.target.value)}
                    >
                      <option value="">Choisir un opérateur</option>
                      {operateurs.map(op => (
                        <option key={op.id || op.Id} value={op.id || op.Id}>
                          {op.nom || op.Nom} {op.prenom || op.Prenom}
                        </option>
                      ))}
                    </select>
                    <button className="gi-btn" onClick={() => handleValiderDoubleSaisie(row, idx)}>
                      Valider
                    </button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionInventaire;