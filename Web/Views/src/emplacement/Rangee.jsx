import React, { useEffect, useState } from "react";
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rangeesPerPage = 6;

  // Pour listes déroulantes hiérarchiques
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [allees, setAllees] = useState([]);

  useEffect(() => {
    fetchRangees();
    fetchSocietes();
    fetchAllSites();
    fetchAllZones();
    fetchAllAllees();
  }, []);

  const fetchRangees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRangees(data);
  };

  const fetchSocietes = async () => {
    const res = await fetch(`/api/client-societes`);
    const data = await res.json();
    setSocietes(data);
  };

  const fetchAllSites = async () => {
    const res = await fetch(`/api/site`);
    const data = await res.json();
    setSites(data);
  };

  const fetchAllZones = async () => {
    const res = await fetch(`/api/zone`);
    const data = await res.json();
    setZones(data);
  };

  const fetchAllAllees = async () => {
    const res = await fetch(`/api/allee`);
    const data = await res.json();
    setAllees(data);
  };

  const fetchSites = async (societeId) => {
    if (!societeId) {
      setSites([]);
      return;
    }
    const res = await fetch(`${API_URL}/sites/${societeId}`);
    const data = await res.json();
    setSites(data);
  };

  const fetchZones = async (siteId) => {
    if (!siteId) {
      setZones([]);
      return;
    }
    const res = await fetch(`${API_URL}/zones/${siteId}`);
    let data = await res.json();
    // Sécurise : si data n'est pas un tableau, force un tableau vide
    if (!Array.isArray(data)) data = [];
    setZones(data);
  };

  const fetchAllees = async (zoneId) => {
    if (!zoneId) {
      setAllees([]);
      return;
    }
    const res = await fetch(`${API_URL}/allees/${zoneId}`);
    const data = await res.json();
    setAllees(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    // Gestion du reset des listes dépendantes
    if (name === "societeId") {
      setForm((prev) => ({
        ...prev,
        siteId: "",
        zoneId: "",
        alleeId: "",
      }));
      fetchSites(value);
      setZones([]);
      setAllees([]);
    }
    if (name === "siteId") {
      setForm((prev) => ({
        ...prev,
        zoneId: "",
        alleeId: "",
      }));
      fetchZones(Number(value)); // <-- Force la conversion ici
      setAllees([]);
    }
    if (name === "zoneId") {
      setForm((prev) => ({
        ...prev,
        alleeId: "",
      }));
      fetchAllees(Number(value)); // <-- Idem ici si besoin
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await fetch(`${API_URL}/${form.rangeeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Utilise l'endpoint hiérarchique pour la création
      await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rangeeNom: form.rangeeNom,
          societeId: parseInt(form.societeId),
          siteId: parseInt(form.siteId),
          zoneId: parseInt(form.zoneId),
          alleeId: parseInt(form.alleeId),
        }),
      });
    }
    setForm({
      rangeeId: 0,
      rangeeNom: "",
      societeId: "",
      siteId: "",
      zoneId: "",
      alleeId: ""
    });
    setEditing(false);
    setShowForm(false);
    fetchRangees();
  };

  const handleEdit = (rangee) => {
    setForm({
      rangeeId: rangee.rangeeId,
      rangeeNom: rangee.rangeeNom,
      societeId: rangee.societeId || "",
      siteId: rangee.siteId || "",
      zoneId: rangee.zoneId || "",
      alleeId: rangee.alleeId || ""
    });
    setEditing(true);
    setShowForm(true);
    if (rangee.societeId) fetchSites(rangee.societeId);
    if (rangee.siteId) fetchZones(rangee.siteId);
    if (rangee.zoneId) fetchAllees(rangee.zoneId);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRangees();
  };

  // Fonctions utilitaires pour trouver les noms
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

  // Pagination helpers
  const indexOfLastRangee = currentPage * rangeesPerPage;
  const indexOfFirstRangee = indexOfLastRangee - rangeesPerPage;
  const currentRangees = rangees.slice(indexOfFirstRangee, indexOfLastRangee);
  const totalPages = Math.ceil(rangees.length / rangeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="emp">
      <h2>Gestion des Rangées</h2>
      {!showForm && (
        <button className="btn-primary" style={{ marginBottom: 20 }}
          onClick={() => {
            setShowForm(true);
            setEditing(false);
            setForm({
              rangeeId: 0,
              rangeeNom: "",
              societeId: "",
              siteId: "",
              zoneId: "",
              alleeId: ""
            });
          }}
        >
          Ajouter une rangée
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="card form-grid mb-24">
          <select
            name="societeId"
            value={form.societeId}
            onChange={handleChange}
            required
            style={{ flex: "1 1 180px", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">Sélectionner une société</option>
            {societes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.raisonSociale}
              </option>
            ))}
          </select>
          <select
            name="siteId"
            value={form.siteId}
            onChange={handleChange}
            required
            disabled={!form.societeId}
            style={{ flex: "1 1 160px", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">Sélectionner un site</option>
            {sites.map((s) => (
              <option key={s.siteId || s.id} value={s.siteId || s.id}>
                {s.siteNom}
              </option>
            ))}
          </select>
          <select
            name="zoneId"
            value={form.zoneId}
            onChange={handleChange}
            required
            disabled={!form.siteId}
            style={{ flex: "1 1 160px", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">Sélectionner une zone</option>
            {zones.map((z) => (
              <option key={z.zoneId} value={z.zoneId}>
                {z.zoneNom}
              </option>
            ))}
          </select>
          <select
            name="alleeId"
            value={form.alleeId}
            onChange={handleChange}
            required
            disabled={!form.zoneId}
            style={{ flex: "1 1 160px", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">Sélectionner une allée</option>
            {allees.map((a) => (
              <option key={a.alleeId} value={a.alleeId}>
                {a.alleeNom}
              </option>
            ))}
          </select>
          <input
            name="rangeeNom"
            placeholder="Nom de la rangée"
            value={form.rangeeNom}
            onChange={handleChange}
            required
            style={{ flex: "1 1 180px", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
          <button type="submit" className="btn-primary">
            {editing ? "Modifier" : "Ajouter"}
          </button>
          <button type="button" className="btn-secondary"
            onClick={() => {
              setEditing(false);
              setShowForm(false);
              setForm({
                rangeeId: 0,
                rangeeNom: "",
                societeId: "",
                siteId: "",
                zoneId: "",
                alleeId: ""
              });
            }}
          >
            Annuler
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Société</th>
            <th style={{ padding: 10 }}>Site</th>
            <th style={{ padding: 10 }}>Zone</th>
            <th style={{ padding: 10 }}>Allée</th>
            <th style={{ padding: 10 }}>Nom</th>
            <th style={{ padding: 10 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRangees.map((r) => (
            <tr key={r.rangeeId}>
              <td style={{ padding: 8 }}>{r.rangeeId}</td>
              <td style={{ padding: 8 }}>{getSocieteNom(r.societeId)}</td>
              <td style={{ padding: 8 }}>{getSiteNom(r.siteId)}</td>
              <td style={{ padding: 8 }}>{getZoneNom(r.zoneId)}</td>
              <td style={{ padding: 8 }}>{getAlleeNom(r.alleeId)}</td>
              <td style={{ padding: 8 }}>{r.rangeeNom}</td>
              <td style={{ padding: 8 }}>
                <button onClick={() => handleEdit(r)} className="btn-secondary" style={{ marginRight: 8 }}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(r.rangeeId)} className="btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Précédent
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={currentPage === idx + 1 ? "active" : undefined}
            >
              {idx + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}

export default Rangee;