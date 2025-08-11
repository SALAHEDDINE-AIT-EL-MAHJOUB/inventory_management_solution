import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/Produit";
const FOURNISSEUR_URL = "/api/Fournisseur";

function ListProduit() {
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProduit, setEditProduit] = useState({});

  // Charger les produits et fournisseurs
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProduits(res.data))
      .catch(() => alert("Erreur lors du chargement des produits"));
    axios.get(FOURNISSEUR_URL)
      .then(res => setFournisseurs(res.data))
      .catch(() => alert("Erreur lors du chargement des fournisseurs"));
  }, []);

  // Gérer la sélection pour modification
  const handleEdit = (produit) => {
    setEditId(getProduitId(produit));
    setEditProduit({ ...produit });
  };

  // Gérer la modification des champs
  const handleChange = (e) => {
    setEditProduit({ ...editProduit, [e.target.name]: e.target.value });
  };

  // Sauvegarder la modification
  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/${editId}`, editProduit);
      setProduits(produits.map(p => getProduitId(p) === editId ? { ...editProduit, id: editId } : p));
      setEditId(null);
    } catch {
      alert("Erreur lors de la modification");
    }
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProduits(produits.filter(p => getProduitId(p) !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert("Erreur lors de la suppression");
    }
  };

  // Trouver le nom du fournisseur
  const getFournisseurNom = (fournisseurId) => {
    const f = fournisseurs.find(f => f.fournisseurId === fournisseurId);
    return f ? f.nom : "";
  };

  const getProduitId = (produit) => produit.id ?? produit.produitId;

  const tableStyle = `
    .styled-table {
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 1rem;
      font-family: sans-serif;
      min-width: 700px;
      box-shadow: 0 0 10px #e0e0e0;
      background: #fff;
    }
    .styled-table thead tr {
      background-color: #009879;
      color: #ffffff;
      text-align: left;
    }
    .styled-table th, .styled-table td {
      padding: 12px 15px;
      border: 1px solid #e0e0e0;
    }
    .styled-table tbody tr {
      border-bottom: 1px solid #dddddd;
    }
    .styled-table tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
    .styled-table tbody tr:last-of-type {
      border-bottom: 2px solid #009879;
    }
    .styled-table button {
      margin-right: 5px;
      background: #009879;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .styled-table button:last-child {
      background: #e74c3c;
    }
    .styled-table button:hover {
      opacity: 0.8;
    }
    .styled-table input, .styled-table select {
      padding: 5px;
      border-radius: 3px;
      border: 1px solid #ccc;
    }
  `;

  return (
    <div>
      <style>{tableStyle}</style>
      <h2>Liste des produits</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code Barre</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Fournisseur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map(produit =>
            editId === getProduitId(produit) ? (
              <tr key={getProduitId(produit)}>   
                <td>
                  <input name="nom" value={editProduit.nom || ""} onChange={handleChange} />
                </td>
                <td>
                  <input name="codeBarre" value={editProduit.codeBarre || ""} onChange={handleChange} />
                </td>
                <td>
                  <input name="prix" type="number" value={editProduit.prix || ""} onChange={handleChange} />
                </td>
                <td>
                  <input name="quantite" type="number" value={editProduit.quantite || ""} onChange={handleChange} />
                </td>
                <td>
                  <select name="fournisseurId" value={editProduit.fournisseurId || ""} onChange={handleChange}>
                    <option value="">--Choisir--</option>
                    {fournisseurs.map(f => (
                      <option key={f.fournisseurId} value={f.fournisseurId}>{f.nom}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={handleSave}>Enregistrer</button>
                  <button onClick={() => setEditId(null)}>Annuler</button>
                </td>
              </tr>
            ) : (
              <tr key={getProduitId(produit)}> 
                <td>{produit.nom}</td>
                <td>{produit.codeBarre}</td>
                <td>{produit.prix}</td>
                <td>{produit.quantite}</td>
                <td>{getFournisseurNom(produit.fournisseurId)}</td>
                <td>
                  <button onClick={() => handleEdit(produit)}>Modifier</button>
                  <button onClick={() => handleDelete(getProduitId(produit))}>Supprimer</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListProduit;