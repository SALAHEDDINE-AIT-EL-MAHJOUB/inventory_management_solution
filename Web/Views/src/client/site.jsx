import React, { useEffect, useState } from "react";
import axios from "axios";

// --- SiteForm ---
const SiteForm = ({ onClose }) => {
  const [villes, setVilles] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [form, setForm] = useState({
    siteNom: "",
    adress: "",
    siteTelephone: "",
    email: "",
    siteVilleId: "",
    societeId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/ville")
      .then(res => setVilles(res.data))
      .catch(() => setVilles([]));
    axios.get("/api/client-societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Si on change la ville, on réinitialise la société
      ...(name === "siteVilleId" ? { societeId: "" } : {})
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {
        SiteNom: form.siteNom,
        Adress: form.adress,
        SiteTelephone: form.siteTelephone ? parseInt(form.siteTelephone) : null,
        Email: form.email,
        SiteVilleId: form.siteVilleId ? parseInt(form.siteVilleId) : null,
        SocieteId: form.societeId ? parseInt(form.societeId) : null,
      };
      await axios.post("/api/site", payload);
      setMessage("Site créé avec succès !");
      setForm({
        siteNom: "",
        adress: "",
        siteTelephone: "",
        email: "",
        siteVilleId: "",
        societeId: "",
      });
      if (onClose) onClose();
    } catch (err) {
      setMessage("Erreur serveur : " + (err.response?.data || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "20px 0",
        padding: 24,
        border: "1px solid #1976d2",
        borderRadius: 10,
        background: "#f4f8fb",
        boxShadow: "0 2px 8px #e3eaf2",
        maxWidth: 500
      }}
    >
      <h3 style={{ color: "#1976d2", marginBottom: 20 }}>Créer un site</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Nom du site :</label>
          <input
            type="text"
            name="siteNom"
            value={form.siteNom}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 5, border: "1px solid #b3c0d1" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Adresse :</label>
          <input
            type="text"
            name="adress"
            value={form.adress}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 5, border: "1px solid #b3c0d1" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Téléphone :</label>
          <input
            type="number"
            name="siteTelephone"
            value={form.siteTelephone}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 5, border: "1px solid #b3c0d1" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Email :</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 5, border: "1px solid #b3c0d1" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Ville :</label>
          <select
            name="siteVilleId"
            value={form.siteVilleId}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 5, border: "1px solid #b3c0d1" }}
          >
            <option value="">Choisir une ville</option>
            {villes.map(v => (
              <option key={v.id} value={v.id}>{v.nom}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 500 }}>Société :</label>
          <select
            name="societeId"
            value={form.societeId}
            onChange={handleChange}
            required
            disabled={!form.siteVilleId}
            style={{
              padding: 8,
              borderRadius: 5,
              border: "1px solid #b3c0d1",
              background: !form.siteVilleId ? "#e0e0e0" : "#fff"
            }}
          >
            <option value="">Choisir une société</option>
            {societes.map(s => (
              <option key={s.id} value={s.id}>{s.nom}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Créer le site
        </button>
        <button
          type="button"
          style={{
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          Annuler
        </button>
      </div>
      {message && <div style={{ marginTop: 14, color: "#1976d2" }}>{message}</div>}
    </form>
  );
};

// --- SiteList ---
const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");
  const [villes, setVilles] = useState([]);
  const [societes, setSocietes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const sitesPerPage = 10;

  useEffect(() => {
    fetchSites();
    axios.get("/api/ville")
      .then(res => setVilles(res.data))
      .catch(() => setVilles([]));
    axios.get("/api/client-societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
  }, []);

  const fetchSites = () => {
    setLoading(true);
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  };

  const handleEdit = (site) => {
    setEditId(site.id);
    setEditValues({
      siteNom: site.siteNom,
      adress: site.adress,
      siteTelephone: site.siteTelephone,
      email: site.email,
      siteVilleId: site.siteVilleId,
      societeId: site.societeId
    });
  };

  const handleEditChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`/api/site/${id}`, { id, ...editValues });
      setEditId(null);
      setEditValues({});
      fetchSites();
      setMessage("Site modifié !");
    } catch (err) {
      setMessage("Erreur lors de la modification.");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditValues({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce site ?")) return;
    try {
      await axios.delete(`/api/site/${id}`);
      setSites(sites.filter(s => s.id !== id));
      setMessage("Site supprimé !");
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
    }
  };

  // Utilitaires pour trouver le nom à partir de l'id
  const getVilleNom = (id) => {
    const ville = villes.find(v => v.id === id);
    return ville ? ville.nom : id;
  };
  const getSocieteNom = (id) => {
    const soc = societes.find(s => s.id === id);
    return soc ? soc.nom : id;
  };

  // Pagination helpers
  const indexOfLastSite = currentPage * sitesPerPage;
  const indexOfFirstSite = indexOfLastSite - sitesPerPage;
  const currentSites = sites.slice(indexOfFirstSite, indexOfLastSite);
  const totalPages = Math.ceil(sites.length / sitesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Liste des sites</h2>
      {message && <div style={{ margin: "10px 0", color: "#1976d2" }}>{message}</div>}
      <table style={{
        borderCollapse: "collapse",
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 8px #eee"
      }}>
        <thead style={{ background: "#1976d2", color: "#fff" }}>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Nom</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Adresse</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Téléphone</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Ville</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Société</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSites.map(site => (
            <tr key={site.id}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <input
                    value={editValues.siteNom}
                    onChange={e => handleEditChange("siteNom", e.target.value)}
                  />
                ) : (
                  site.siteNom
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <input
                    value={editValues.adress}
                    onChange={e => handleEditChange("adress", e.target.value)}
                  />
                ) : (
                  site.adress
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <input
                    value={editValues.siteTelephone}
                    onChange={e => handleEditChange("siteTelephone", e.target.value)}
                  />
                ) : (
                  site.siteTelephone
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <input
                    value={editValues.email}
                    onChange={e => handleEditChange("email", e.target.value)}
                  />
                ) : (
                  site.email
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <select
                    value={editValues.siteVilleId}
                    onChange={e => handleEditChange("siteVilleId", e.target.value)}
                  >
                    <option value="">Choisir une ville</option>
                    {villes.map(v => (
                      <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                  </select>
                ) : (
                  getVilleNom(site.siteVilleId)
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <select
                    value={editValues.societeId}
                    onChange={e => handleEditChange("societeId", e.target.value)}
                  >
                    <option value="">Choisir une société</option>
                    {societes.map(s => (
                      <option key={s.id} value={s.id}>{s.nom}</option>
                    ))}
                  </select>
                ) : (
                  getSocieteNom(site.societeId)
                )}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {editId === site.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(site.id)}
                      style={{
                        background: "linear-gradient(90deg, #43a047 0%, #66bb6a 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "7px 16px",
                        fontWeight: 600,
                        marginRight: 6,
                        boxShadow: "0 2px 6px #43a04722",
                        transition: "background 0.2s",
                        cursor: "pointer"
                      }}
                    >
                      Enregistrer
                    </button>
                    <button
                      onClick={handleEditCancel}
                      style={{
                        background: "linear-gradient(90deg, #e53935 0%, #ff7043 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "7px 16px",
                        fontWeight: 600,
                        boxShadow: "0 2px 6px #e5393522",
                        transition: "background 0.2s",
                        cursor: "pointer"
                      }}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(site)}
                      style={{
                        background: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "7px 16px",
                        fontWeight: 600,
                        marginRight: 6,
                        boxShadow: "0 2px 6px #1976d222",
                        transition: "background 0.2s",
                        cursor: "pointer"
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(site.id)}
                      style={{
                        background: "linear-gradient(90deg, #e53935 0%, #ff7043 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "7px 16px",
                        fontWeight: 600,
                        boxShadow: "0 2px 6px #e5393522",
                        transition: "background 0.2s",
                        cursor: "pointer"
                      }}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              marginRight: 8,
              padding: "7px 16px",
              borderRadius: 5,
              border: "1px solid #1976d2",
              background: "#fff",
              color: "#1976d2",
              fontWeight: "bold",
              boxShadow: "0 2px 6px #1976d222",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              style={{
                margin: "0 2px",
                padding: "7px 16px",
                borderRadius: 5,
                border: "1px solid #1976d2",
                background: currentPage === idx + 1 ? "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)" : "#fff",
                color: currentPage === idx + 1 ? "#fff" : "#1976d2",
                fontWeight: "bold",
                boxShadow: currentPage === idx + 1 ? "0 2px 6px #1976d222" : "none",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              marginLeft: 8,
              padding: "7px 16px",
              borderRadius: 5,
              border: "1px solid #1976d2",
              background: "#fff",
              color: "#1976d2",
              fontWeight: "bold",
              boxShadow: "0 2px 6px #1976d222",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

// --- Export principal ---
const SitePage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <button
        onClick={handleShowForm}
        style={{
          background: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          padding: "12px 28px",
          marginBottom: 20,
          cursor: "pointer",
          fontSize: 17,
          fontWeight: 700,
          boxShadow: "0 2px 8px #1976d222",
          transition: "background 0.2s"
        }}
      >
        Ajouter un site
      </button>
      {showForm && <SiteForm onClose={handleCloseForm} />}
      <SiteList />
    </div>
  );
};

export default SitePage;