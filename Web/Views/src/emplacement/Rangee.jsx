import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emplacement.css";

const API_URL = "/api/rangee";

function Rangee() {
  const [rangees, setRangees] = useState([]);
  const [form, setForm] = useState({
    rangeeId: 0,
    rangeeNom: "",
    societeId: "",
    siteId: "",
    zoneId: "",
    alleeId: ""
  });
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rangeesPerPage = 7;

  // Dropdown lists
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [allees, setAllees] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [rRes, sRes, sitesRes, zonesRes, alleesRes] = await Promise.all([
        axios.get(API_URL),
        axios.get("/api/client-societes"),
        axios.get("/api/site"),
        axios.get("/api/zone"),
        axios.get("/api/allee")
      ]);
      setRangees(rRes.data || []);
      setSocietes(sRes.data || []);
      setSites(sitesRes.data || []);
      setZones(zonesRes.data || []);
      setAllees(alleesRes.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const fetchSites = async (societeId) => {
    if (!societeId) {
      setSites([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/sites/${societeId}`);
      setSites(res.data || []);
    } catch {
      setSites([]);
    }
  };

  const fetchZones = async (siteId) => {
    if (!siteId) {
      setZones([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/zones/${siteId}`);
      setZones(Array.isArray(res.data) ? res.data : []);
    } catch {
      setZones([]);
    }
  };

  const fetchAllees = async (zoneId) => {
    if (!zoneId) {
      setAllees([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/allees/${zoneId}`);
      setAllees(res.data || []);
    } catch {
      setAllees([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "societeId") {
      setForm(prev => ({ ...prev, siteId: "", zoneId: "", alleeId: "" }));
      fetchSites(value);
      setZones([]);
      setAllees([]);
    }

    if (name === "siteId") {
      setForm(prev => ({ ...prev, zoneId: "", alleeId: "" }));
      fetchZones(value);
      setAllees([]);
    }

    if (name === "zoneId") {
      setForm(prev => ({ ...prev, alleeId: "" }));
      fetchAllees(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rangeeNom || !form.societeId || !form.siteId || !form.zoneId || !form.alleeId) {
      setMessage("Remplissez tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_URL}/${form.rangeeId}`, form);
        setMessage("Rangée modifiée.");
      } else {
        await axios.post(`${API_URL}/create`, {
          rangeeNom: form.rangeeNom,
          societeId: parseInt(form.societeId),
          siteId: parseInt(form.siteId),
          zoneId: parseInt(form.zoneId),
          alleeId: parseInt(form.alleeId)
        });
        setMessage("Rangée ajoutée.");
      }
      setForm({ rangeeId: 0, rangeeNom: "", societeId: "", siteId: "", zoneId: "", alleeId: "" });
      setEditing(false);
      setShowForm(false);
      await loadAll();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'opération.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (r) => {
    setForm({
      rangeeId: r.rangeeId,
      rangeeNom: r.rangeeNom,
      societeId: r.societeId || "",
      siteId: r.siteId || "",
      zoneId: r.zoneId || "",
      alleeId: r.alleeId || ""
    });
    setEditing(true);
    setShowForm(true);
    if (r.societeId) fetchSites(r.societeId);
    if (r.siteId) fetchZones(r.siteId);
    if (r.zoneId) fetchAllees(r.zoneId);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette rangée ?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Rangée supprimée.");
      await loadAll();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // helpers for display names (robust to API shape)
  const getSocieteNom = (id) => {
    const s = societes.find(x => x.id === id || x.Id === id);
    return s ? (s.nom || s.Nom || s.raisonSociale || s.RaisonSociale) : id;
  };
  const getSiteNom = (id) => {
    const s = sites.find(x => (x.siteId || x.id) === id);
    return s ? (s.siteNom || s.nom || s.Nom) : id;
  };
  const getZoneNom = (id) => {
    const z = zones.find(x => x.zoneId === id);
    return z ? (z.zoneNom || z.nom || z.Nom) : id;
  };
  const getAlleeNom = (id) => {
    const a = allees.find(x => x.alleeId === id);
    return a ? (a.alleeNom || a.nom || a.Nom) : id;
  };

  // pagination slice
  const indexOfLastRangee = currentPage * rangeesPerPage;
  const indexOfFirstRangee = indexOfLastRangee - rangeesPerPage;
  const currentRangees = rangees.slice(indexOfFirstRangee, indexOfLastRangee);
  const totalPages = Math.ceil(rangees.length / rangeesPerPage);

  return (
    <div className="emp">
      <div className="page-header">
        <h2 className="page-title">
          <i className="fas fa-layer-group" style={{ marginRight: 8 }}></i>
          Gestion des Rangées
        </h2>
        <button
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`}
          onClick={() => {
            setShowForm(f => !f);
            setEditing(false);
            setForm({ rangeeId: 0, rangeeNom: "", societeId: "", siteId: "", zoneId: "", alleeId: "" });
          }}
        >
          <i className={`fas ${showForm ? "fa-times" : "fa-plus"}`} style={{ marginRight: 8 }}></i>
          {showForm ? "Fermer" : "Créer une rangée"}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes("succès") || message.includes("ajout") || message.includes("modifiée") ? "alert-success" : "alert-error"}`}>
          <i className={`fas ${message.includes("succès") || message.includes("ajout") || message.includes("modifiée") ? "fa-check-circle" : "fa-exclamation-triangle"}`}></i>
          {message}
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <i className="fas fa-edit"></i>
            <h3>{editing ? "Modifier la rangée" : "Nouvelle rangée"}</h3>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label><i className="fas fa-building"></i> Société *</label>
              <select name="societeId" value={form.societeId} onChange={handleChange} required>
                <option value="">Sélectionnez une société</option>
                {societes.map(s => (<option key={s.id} value={s.id}>{s.raisonSociale || s.nom}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-map-marker-alt"></i> Site *</label>
              <select name="siteId" value={form.siteId} onChange={handleChange} disabled={!form.societeId} required>
                <option value="">Sélectionnez un site</option>
                {sites.map(s => (<option key={s.siteId || s.id} value={s.siteId || s.id}>{s.siteNom || s.nom}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-industry"></i> Zone *</label>
              <select name="zoneId" value={form.zoneId} onChange={handleChange} disabled={!form.siteId} required>
                <option value="">Sélectionnez une zone</option>
                {zones.map(z => (<option key={z.zoneId} value={z.zoneId}>{z.zoneNom}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-road"></i> Allée *</label>
              <select name="alleeId" value={form.alleeId} onChange={handleChange} disabled={!form.zoneId} required>
                <option value="">Sélectionnez une allée</option>
                {allees.map(a => (<option key={a.alleeId} value={a.alleeId}>{a.alleeNom}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label><i className="fas fa-hashtag"></i> Nom de la rangée *</label>
              <input name="rangeeNom" value={form.rangeeNom} onChange={handleChange} placeholder="Ex: R1" required />
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <i className={`fas ${loading ? "fa-spinner fa-spin" : editing ? "fa-save" : "fa-plus"}`} style={{ marginRight: 8 }}></i>
                {loading ? "Traitement..." : editing ? "Enregistrer" : "Créer"}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => { setShowForm(false); setEditing(false); setMessage(""); }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {!loading && (
        <div className="table-card" style={{ marginTop: 16 }}>
          <div className="table-header">
            <h3><i className="fas fa-list"></i> Liste des rangées ({rangees.length})</h3>
          </div>

          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th><i className="fas fa-hashtag"></i> ID</th>
                  <th><i className="fas fa-building"></i> Société</th>
                  <th><i className="fas fa-map-marker-alt"></i> Site</th>
                  <th><i className="fas fa-industry"></i> Zone</th>
                  <th><i className="fas fa-road"></i> Allée</th>
                  <th><i className="fas fa-tag"></i> Nom</th>
                  <th><i className="fas fa-cogs"></i> Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRangees.map(r => (
                  <tr key={r.rangeeId} className="table-row">
                    <td><span className="id-badge">#{r.rangeeId}</span></td>
                    <td>{getSocieteNom(r.societeId)}</td>
                    <td>{getSiteNom(r.siteId)}</td>
                    <td>{getZoneNom(r.zoneId)}</td>
                    <td>{getAlleeNom(r.alleeId)}</td>
                    <td><strong>{r.rangeeNom}</strong></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(r)}><i className="fas fa-edit"></i> Modifier</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.rangeeId)}><i className="fas fa-trash"></i> Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {rangees.length === 0 && (
                  <tr>
                    <td colSpan={7} className="empty-state">
                      <div className="empty-icon"><i className="fas fa-layer-group fa-3x"></i></div>
                      <h3>Aucune rangée trouvée</h3>
                      <p>Ajoutez votre première rangée pour commencer</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination" style={{ marginTop: 12 }}>
                <button className="btn btn-outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <i className="fas fa-chevron-left"></i> Précédent
                </button>

                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline"}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button className="btn btn-outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Suivant <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"><i className="fas fa-spinner fa-spin"></i></div>
        </div>
      )}
    </div>
  );
}

export default Rangee;