import React, { useEffect, useState } from "react";

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

  // Pour listes déroulantes hiérarchiques
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [allees, setAllees] = useState([]);

  useEffect(() => {
    fetchRangees();
    fetchSocietes();
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
    if (rangee.societeId) fetchSites(rangee.societeId);
    if (rangee.siteId) fetchZones(rangee.siteId);
    if (rangee.zoneId) fetchAllees(rangee.zoneId);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRangees();
  };

  console.log(societes);

  return (
    <div>
      <h2>Gestion des Rangées</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="societeId"
          value={form.societeId}
          onChange={handleChange}
          required
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
        />
        <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
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
            Annuler
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Société</th>
            <th>Site</th>
            <th>Zone</th>
            <th>Allée</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rangees.map((r) => (
            <tr key={r.rangeeId}>
              <td>{r.rangeeId}</td>
              <td>{r.societeId}</td>
              <td>{r.siteId}</td>
              <td>{r.zoneId}</td>
              <td>{r.alleeId}</td>
              <td>{r.rangeeNom}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Modifier</button>
                <button onClick={() => handleDelete(r.rangeeId)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rangee;