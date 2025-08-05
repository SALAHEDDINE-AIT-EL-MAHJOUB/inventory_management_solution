import React, { useEffect, useState } from "react";
import axios from "axios";

const Zone = () => {
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]); // <-- Ajout
  const [zoneNom, setZoneNom] = useState("");
  const [zoneSiteId, setZoneSiteId] = useState("");
  const [message, setMessage] = useState("");

  // Charger les sites au montage
  useEffect(() => {
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]));
    fetchZones(); // Charger les zones au montage
  }, []);

  // Fonction pour charger les zones
  const fetchZones = () => {
    axios.get("/api/zone/by-site/" + zoneSiteId)
      .then(res => setZones(res.data))
      .catch(() => setZones([]));
  };

  // Recharge les zones après création
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zoneNom || !zoneSiteId) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    try {
      await axios.post("/api/zone", {
        ZoneNom: zoneNom,
        ZoneSiteId: parseInt(zoneSiteId),
        IsDeleted: false
      });
      setMessage("Zone créée avec succès !");
      setZoneNom("");
      fetchZones(); // Recharge la liste
    } catch (err) {
      setMessage(
        "Erreur lors de la création de la zone: " +
        (err.response?.data?.toString() || err.message)
      );
    }
  };

  // Met à jour la liste des zones quand le site change
  useEffect(() => {
    if (zoneSiteId) fetchZones();
    else setZones([]);
  }, [zoneSiteId]);

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Créer une Zone</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Nom de la zone:</label>
          <input
            type="text"
            value={zoneNom}
            onChange={e => setZoneNom(e.target.value)}
            style={{ marginLeft: 10, padding: 5 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Site:</label>
          <select
            value={zoneSiteId}
            onChange={e => setZoneSiteId(e.target.value)}
            style={{ marginLeft: 10, padding: 5 }}
          >
            <option value="">-- Choisir un site --</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>
                {site.siteNom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: "6px 16px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
          Créer
        </button>
      </form>
      {message && <p>{message}</p>}

      <h3>Zones créées</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {zones.map(zone => (
          <div key={zone.zoneId} style={{
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 16,
            minWidth: 180,
            background: "#f9f9f9",
            boxShadow: "0 2px 8px #eee"
          }}>
            <strong>{zone.zoneNom}</strong>
            <div style={{ fontSize: 13, color: "#555" }}>
              Site ID: {zone.zoneSiteId}
            </div>
          </div>
        ))}
        {zones.length === 0 && <div>Aucune zone pour ce site.</div>}
      </div>
    </div>
  );
};

export default Zone;