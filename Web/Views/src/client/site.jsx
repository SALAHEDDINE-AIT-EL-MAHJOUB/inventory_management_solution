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
    setForm(prev => ({ ...prev, [name]: value }));
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
      if (onClose) onClose(); // Fermer le formulaire après ajout
    } catch (err) {
      setMessage("Erreur lors de la création du site : " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0", padding: 20, border: "1px solid #ccc", borderRadius: 8, background: "#f9f9f9" }}>
      <h3>Créer un site</h3>
      <div>
        <label>Nom du site :</label>
        <input
          type="text"
          name="siteNom"
          value={form.siteNom}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Adresse :</label>
        <input
          type="text"
          name="adress"
          value={form.adress}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Téléphone :</label>
        <input
          type="number"
          name="siteTelephone"
          value={form.siteTelephone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ville :</label>
        <select
          name="siteVilleId"
          value={form.siteVilleId}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une ville</option>
          {villes.map(v => (
            <option key={v.id} value={v.id}>{v.nom}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Société :</label>
        <select
          name="societeId"
          value={form.societeId}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une société</option>
          {societes.map(s => (
            <option key={s.id} value={s.id}>{s.raisonSociale || s.nom}</option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ marginTop: 10 }}>Créer le site</button>
      <button type="button" style={{ marginLeft: 10 }} onClick={onClose}>Annuler</button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </form>
  );
};

// --- SiteList ---
const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Liste des sites</h2>
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
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.id}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.siteNom}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.adress}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.siteTelephone}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.email}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.siteVilleId}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{site.societeId}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "10px 20px",
          marginBottom: 20,
          cursor: "pointer",
          fontSize: 16
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