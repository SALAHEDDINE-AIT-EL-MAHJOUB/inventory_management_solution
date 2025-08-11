import React, { useEffect, useState } from "react";
import axios from "axios";

const Zone = () => {
  const [societes, setSocietes] = useState([]);
  const [societeId, setSocieteId] = useState("");
  const [sites, setSites] = useState([]);
  const [zoneSiteId, setZoneSiteId] = useState("");
  const [zones, setZones] = useState([]);
  const [zoneNom, setZoneNom] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allSites, setAllSites] = useState([]);
  const [editZoneId, setEditZoneId] = useState(null);
  const [editZoneNom, setEditZoneNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const zonesPerPage = 7; // Afficher 7 zones par page

  // Charger toutes les zones au montage
  useEffect(() => {
    axios.get("/api/zone")
      .then(res => setZones(res.data))
      .catch(() => setZones([]));
    axios.get("/api/client-societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
    // Charger tous les sites pour affichage du nom
    axios.get("/api/site")
      .then(res => setAllSites(res.data))
      .catch(() => setAllSites([]));
  }, []);

  // Charger les sites quand une société est sélectionnée
  useEffect(() => {
    if (societeId) {
      axios.get(`/api/Site/societe/${societeId}`)
        .then(res => setSites(res.data))
        .catch(() => setSites([]));
      setZoneSiteId(""); // reset site selection
    } else {
      setSites([]);
      setZoneSiteId("");
    }
  }, [societeId]);

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
        SocieteId: parseInt(societeId),
        SocieteNom: societes.find(s => s.id === parseInt(societeId))?.nom || "",
        IsDeleted: false
      });
      setMessage("Zone créée avec succès !");
      setZoneNom("");
      setShowForm(false);
      // Recharge toutes les zones
      axios.get("/api/zone")
        .then(res => setZones(res.data))
        .catch(() => setZones([]));
    } catch (err) {
      setMessage(
        "Erreur lors de la création de la zone: " +
        (err.response?.data?.toString() || err.message)
      );
    }
  };

  // Fonction utilitaire pour trouver le nom du site
  const getSiteNom = (siteId) => {
    const site = allSites.find(s => s.id === siteId);
    return site ? site.siteNom : siteId;
  };

  // Modifier une zone
  const handleEditClick = (zone) => {
    setEditZoneId(zone.zoneId);
    setEditZoneNom(zone.zoneNom);
  };

  const handleEditSave = async (zone) => {
    try {
      await axios.put(`/api/zone/${zone.zoneId}`, {
        ...zone,
        zoneNom: editZoneNom
      });
      setEditZoneId(null);
      setEditZoneNom("");
      axios.get("/api/zone")
        .then(res => setZones(res.data))
        .catch(() => setZones([]));
      setMessage("Zone modifiée !");
    } catch (err) {
      setMessage("Erreur lors de la modification.");
    }
  };

  const handleEditCancel = () => {
    setEditZoneId(null);
    setEditZoneNom("");
  };

  // Supprimer une zone
  const handleDelete = async (zoneId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette zone ?")) return;
    try {
      await axios.delete(`/api/zone/${zoneId}`);
      setZones(zones.filter(z => z.zoneId !== zoneId));
      setMessage("Zone supprimée !");
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
    }
  };

  // Pagination helpers
  const indexOfLastZone = currentPage * zonesPerPage;
  const indexOfFirstZone = indexOfLastZone - zonesPerPage;
  const currentZones = zones.slice(indexOfFirstZone, indexOfLastZone);
  const totalPages = Math.ceil(zones.length / zonesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <button
        onClick={() => setShowForm(f => !f)}
        style={{
          marginBottom: 24,
          padding: "8px 20px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold"
        }}
      >
        {showForm ? "Masquer le formulaire" : "Créer une zone"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 30, background: "#f5f5f5", padding: 20, borderRadius: 8 }}>
          <div style={{ marginBottom: 10 }}>
            <label>Société:</label>
            <select
              value={societeId}
              onChange={e => setSocieteId(e.target.value)}
              style={{ marginLeft: 10, padding: 5 }}
            >
              <option value="">-- Choisir une société --</option>
              {societes.map(soc => (
                <option key={soc.id} value={soc.id}>
                  {soc.nom}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Site:</label>
            <select
              value={zoneSiteId}
              onChange={e => setZoneSiteId(e.target.value)}
              style={{ marginLeft: 10, padding: 5 }}
              disabled={!societeId}
            >
              <option value="">-- Choisir un site --</option>
              {sites.map(site => (
                <option key={site.id} value={site.id}>
                  {site.siteNom}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Nom de la zone:</label>
            <input
              type="text"
              value={zoneNom}
              onChange={e => setZoneNom(e.target.value)}
              style={{ marginLeft: 10, padding: 5 }}
              disabled={!zoneSiteId}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "6px 16px", background: "#43a047", color: "#fff", border: "none", borderRadius: 4 }}
            disabled={!zoneSiteId || !zoneNom}
          >
            Créer
          </button>
        </form>
      )}

      {message && <p>{message}</p>}

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <thead>
            <tr>
              <th style={{ background: "#1976d2", color: "#fff", padding: "12px", fontWeight: "bold" }}>ID</th>
              <th style={{ background: "#1976d2", color: "#fff", padding: "12px", fontWeight: "bold" }}>Nom</th>
              <th style={{ background: "#1976d2", color: "#fff", padding: "12px", fontWeight: "bold" }}>Site</th>
              <th style={{ background: "#1976d2", color: "#fff", padding: "12px", fontWeight: "bold" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentZones.map(zone => (
              <tr key={zone.zoneId}>
                <td style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>{zone.zoneId}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>
                  {editZoneId === zone.zoneId ? (
                    <input
                      type="text"
                      value={editZoneNom}
                      onChange={e => setEditZoneNom(e.target.value)}
                      style={{ padding: 5, borderRadius: 4, border: "1px solid #bdbdbd" }}
                    />
                  ) : (
                    zone.zoneNom
                  )}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>
                  {getSiteNom(zone.zoneSiteId)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>
                  {editZoneId === zone.zoneId ? (
                    <>
                      <button
                        style={{ marginRight: 8, background: "#43a047", color: "#fff", border: "none", borderRadius: 4, padding: "6px 14px" }}
                        onClick={() => handleEditSave(zone)}
                        type="button"
                      >
                        Enregistrer
                      </button>
                      <button
                        style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 4, padding: "6px 14px" }}
                        onClick={handleEditCancel}
                        type="button"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ marginRight: 8, background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, padding: "6px 14px" }}
                        onClick={() => handleEditClick(zone)}
                        type="button"
                      >
                        Modifier
                      </button>
                      <button
                        style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 4, padding: "6px 14px" }}
                        onClick={() => handleDelete(zone.zoneId)}
                        type="button"
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {zones.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>Aucune zone trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ marginRight: 8, padding: "6px 12px", borderRadius: 4, border: "1px solid #1976d2", background: "#fff", color: "#1976d2", fontWeight: "bold" }}
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                style={{
                  margin: "0 2px",
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #1976d2",
                  background: currentPage === idx + 1 ? "#1976d2" : "#fff",
                  color: currentPage === idx + 1 ? "#fff" : "#1976d2",
                  fontWeight: "bold"
                }}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ marginLeft: 8, padding: "6px 12px", borderRadius: 4, border: "1px solid #1976d2", background: "#fff", color: "#1976d2", fontWeight: "bold" }}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Zone;