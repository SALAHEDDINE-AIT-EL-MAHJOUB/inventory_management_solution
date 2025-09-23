import React, { useEffect, useState } from "react";
import axios from "axios";
import "../emplacement/emplacement.css"; // import du style unifié

const API_URL = "/api/client-societes";

export default function GestionSocietes() {
  const [societes, setSocietes] = useState([]);
  const [client, setClient] = useState(null);
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    rs: "",
    if: "",
    adresse: "",
    telephone: "",
    villeId: "",
    clientId: "",
    nom: "",
    email: ""
  });
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchClientConnecte();
    fetchVilles();
    fetchSocietes();
  }, []);

  const fetchClientConnecte = async () => {
    try {
      const res = await fetch('/api/profil/me');
      const data = await res.json();
      setClient(data.client);
      setForm((prev) => ({
        ...prev,
        clientId: data.client?.clientId ? String(data.client.clientId) : "",
        nom: data.client?.clientNom || "",
        email: data.client?.email || ""
      }));
    } catch (e) {
      setClient(null);
    }
  };

  const fetchVilles = async () => {
    const res = await fetch("/api/ville");
    const data = await res.json();
    setVilles(data);
  };

  const fetchSocietes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSocietes(data);
      if ((currentPage - 1) * itemsPerPage >= data.length && currentPage > 1) {
        setCurrentPage(1);
      }
    } catch (e) {
      setSocietes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.clientId || !form.villeId || !form.nom || !form.adresse) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setCreating(true);
    try {
      const payload = {
        ClientId: parseInt(form.clientId, 10),
        VilleId: parseInt(form.villeId, 10),
        Nom: form.nom,
        Adresse: form.adresse,
        RS: form.rs,
        IF: form.if,
        Telephone: form.telephone,
        Email: form.email
      };
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setSuccess("Société modifiée avec succès !");
      } else {
        await axios.post(API_URL, payload);
        setSuccess("Société créée avec succès !");
      }
      setForm({
        rs: "",
        if: "",
        adresse: "",
        telephone: "",
        villeId: "",
        clientId: form.clientId,
        nom: form.nom,
        email: form.email
      });
      setEditId(null);
      fetchSocietes();
    } catch (err) {
      setError(
        err.response?.data?.toString() ||
          "Erreur lors de la création ou modification de la société"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await res.text();
        alert("Erreur lors de la suppression : " + msg);
        return;
      }
      fetchSocietes();
    } catch (e) {
      alert("Erreur réseau lors de la suppression");
    }
  };

  const handleEdit = (societe) => {
    setEditId(societe.id);
    setForm({
      rs: societe.raisonSociale || "",
      if: societe.if || "",
      adresse: societe.adresse || "",
      telephone: societe.telephone || "",
      villeId: societe.villeId ? String(societe.villeId) : "",
      clientId: societe.clientId ? String(societe.clientId) : "",
      nom: societe.nom || "",
      email: societe.email || ""
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ ...form, rs: "", if: "", adresse: "", telephone: "", villeId: "" });
    setShowForm(false);
  };

  const totalPages = Math.ceil(societes.length / itemsPerPage);
  const paginatedSocietes = societes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="emp">
      <div className="card">
        <div className="page-header" style={{ padding: '1rem 1.25rem' }}>
          <h2 className="page-title">Gestion des Sociétés</h2>
          <button
            className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? "✕ Fermer" : "+ Ajouter une société"}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <div className="form-header">
              <h3>{editId ? "Modifier la société" : "Nouvelle société"}</h3>
            </div>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Raison Sociale</label>
                <input name="rs" placeholder="Raison Sociale" value={form.rs} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Identifiant Fiscal</label>
                <input name="if" placeholder="Identifiant Fiscal" value={form.if} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Adresse *</label>
                <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Ville *</label>
                <select name="villeId" value={form.villeId || ""} onChange={handleChange} required>
                  <option value="">Choisir une ville</option>
                  {villes.map(v => (
                    <option key={v.id} value={v.id}>{v.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nom *</label>
                <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
                <button type="submit" className="btn btn-success" disabled={creating}>
                  {creating ? "⏳ Traitement..." : (editId ? "✓ Modifier" : "✓ Créer")}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  ✕ Annuler
                </button>
              </div>

              {error && <div className="alert alert-error" style={{ marginTop: 12 }}>{error}</div>}
              {success && <div className="alert alert-success" style={{ marginTop: 12 }}>{success}</div>}
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-overlay"><div className="spinner">⏳</div></div>
        ) : (
          <div className="table-card">
            <div className="table-header">
              <h3>Liste des sociétés</h3>
            </div>
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    {["ID","Raison Sociale","IF","Adresse","Téléphone","Ville","Nom","Email","Actions"].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedSocietes.map((s) => (
                    <tr key={s.id} className="table-row">
                      <td><span className="id-badge">#{s.id}</span></td>
                      <td><strong className="zone-name">{s.raisonSociale}</strong></td>
                      <td>{s.if}</td>
                      <td>{s.adresse}</td>
                      <td>{s.telephone}</td>
                      <td className="site-name">{s.ville}</td>
                      <td>{s.nom}</td>
                      <td>{s.email}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(s)}>✏️ Modifier</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>🗑️ Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {societes.length === 0 && (
                    <tr><td colSpan={9} className="empty-state">Aucune société trouvée</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination" style={{ marginTop: 12 }}>
                <button className="btn btn-outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage===1}>← Précédent</button>
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={`btn ${currentPage === i+1 ? 'btn-primary' : 'btn-outline'}`} onClick={() => handlePageChange(i+1)}>{i+1}</button>
                  ))}
                </div>
                <button className="btn btn-outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage===totalPages}>Suivant →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}