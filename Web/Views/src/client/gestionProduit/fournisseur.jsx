import React, { useEffect, useState } from "react";
import axios from "axios";

const Fournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [form, setForm] = useState({ Nom: "", Contact: "", Email: "", Telephone: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    const res = await axios.get("/api/Fournisseur");
    setFournisseurs(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/Fournisseur/${editId}`, { FournisseurId: editId, ...form });
    } else {
      await axios.post("/api/Fournisseur", form);
    }
    setForm({ Nom: "", Contact: "", Email: "", Telephone: "" });
    setEditId(null);
    setShowForm(false);
    fetchFournisseurs();
  };

  const handleEdit = (f) => {
    setForm({ Nom: f.nom || f.Nom, Contact: f.contact || f.Contact, Email: f.email || f.Email, Telephone: f.telephone || f.Telephone });
    setEditId(f.fournisseurId || f.FournisseurId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/Fournisseur/${id}`);
    fetchFournisseurs();
  };

  const handleCreate = () => {
    setForm({ Nom: "", Contact: "", Email: "", Telephone: "" });
    setEditId(null);
    setShowForm(true);
  };

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Gestion des Fournisseurs</h2>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button
          style={{
            background: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 18px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 16,
          }}
          onClick={handleCreate}
        >
          Créer Fournisseur
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", background: "#f5f6fa", padding: 16, borderRadius: 8 }}>
          <input name="Nom" placeholder="Nom" value={form.Nom} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <input name="Contact" placeholder="Contact" value={form.Contact} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <input name="Email" placeholder="Email" value={form.Email} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <input name="Telephone" placeholder="Téléphone" value={form.Telephone} onChange={handleChange} required style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }} />
          <button type="submit" style={{ background: "#38a169", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, cursor: "pointer" }}>
            {editId ? "Modifier" : "Ajouter"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); setForm({ Nom: "", Contact: "", Email: "", Telephone: "" }); setShowForm(false); }}
              style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, cursor: "pointer" }}
            >
              Annuler
            </button>
          )}
          {!editId && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ background: "#a0aec0", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontWeight: 600, cursor: "pointer" }}
            >
              Annuler
            </button>
          )}
        </form>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fafbfc", borderRadius: 8, overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#f5f6fa" }}>
            <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Nom</th>
          
            <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Email</th>
            <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Téléphone</th>
            <th style={{ padding: "10px 8px", borderBottom: "1px solid #eee" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map((f) => (
            <tr key={f.fournisseurId} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: "8px" }}>{f.nom}</td>
             
              <td style={{ padding: "8px" }}>{f.email}</td>
              <td style={{ padding: "8px" }}>{f.telephone}</td>
              <td style={{ padding: "8px" }}>
                <button
                  onClick={() => handleEdit(f)}
                  style={{ background: "#3182ce", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", marginRight: 6, cursor: "pointer" }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(f.fournisseurId)}
                  style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", cursor: "pointer" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fournisseur;