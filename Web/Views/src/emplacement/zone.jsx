import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emplacement.css";

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
  const [loading, setLoading] = useState(false);
  const zonesPerPage = 7;

  // Charger toutes les zones au montage
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("/api/zone"),
      axios.get("/api/client-societes"),
      axios.get("/api/site")
    ]).then(([zonesRes, societesRes, sitesRes]) => {
      setZones(zonesRes.data);
      setSocietes(societesRes.data);
      setAllSites(sitesRes.data);
    }).catch(() => {
      setZones([]);
      setSocietes([]);
      setAllSites([]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  // Charger les sites quand une société est sélectionnée
  useEffect(() => {
    if (societeId) {
      axios.get(`/api/Site/societe/${societeId}`)
        .then(res => setSites(res.data))
        .catch(() => setSites([]));
      setZoneSiteId("");
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getSiteNom = (siteId) => {
    const site = allSites.find(s => s.id === siteId);
    return site ? site.siteNom : siteId;
  };

  const handleEditClick = (zone) => {
    setEditZoneId(zone.zoneId);
    setEditZoneNom(zone.zoneNom);
  };

  const handleEditSave = async (zone) => {
    setLoading(true);
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
      setMessage("Zone modifiée avec succès !");
    } catch (err) {
      setMessage("Erreur lors de la modification.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditZoneId(null);
    setEditZoneNom("");
  };

  const handleDelete = async (zoneId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette zone ?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/zone/${zoneId}`);
      setZones(zones.filter(z => z.zoneId !== zoneId));
      setMessage("Zone supprimée avec succès !");
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
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
    <div className="emp">
      <div className="page-header">
        <h2 className="page-title">
          <i className="fas fa-industry"></i>
          Gestion des Zones
        </h2>
        <button 
          className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setShowForm(f => !f)}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
          {showForm ? "Fermer le formulaire" : "Créer une nouvelle zone"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <i className="fas fa-edit"></i>
            <h3>Formulaire de création de zone</h3>
          </div>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>
                <i className="fas fa-building"></i>
                Société *
              </label>
              <select value={societeId} onChange={e => setSocieteId(e.target.value)} required>
                <option value="">Sélectionnez une société</option>
                {societes.map(soc => (
                  <option key={soc.id} value={soc.id}>
                    {soc.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-map-marker-alt"></i>
                Site *
              </label>
              <select value={zoneSiteId} onChange={e => setZoneSiteId(e.target.value)} disabled={!societeId} required>
                <option value="">Sélectionnez un site</option>
                {sites.map(site => (
                  <option key={site.id} value={site.id}>
                    {site.siteNom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-industry"></i>
                Nom de la zone *
              </label>
              <input 
                type="text" 
                value={zoneNom} 
                onChange={e => setZoneNom(e.target.value)} 
                disabled={!zoneSiteId}
                placeholder="Ex: Zone A"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!zoneSiteId || !zoneNom || loading}
            >
              <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
              {loading ? "Création..." : "Créer la zone"}
            </button>
          </form>

          {message && (
            <div className={`alert ${message.includes("succès") ? "alert-success" : "alert-error"}`}>
              <i className={`fas ${message.includes("succès") ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
              {message}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      )}

      {!loading && (
        <div className="table-card">
          <div className="table-header">
            <h3>
              <i className="fas fa-list"></i>
              Liste des zones ({zones.length})
            </h3>
          </div>
          
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>
                    <i className="fas fa-hashtag"></i>
                    ID
                  </th>
                  <th>
                    <i className="fas fa-industry"></i>
                    Nom
                  </th>
                  <th>
                    <i className="fas fa-map-marker-alt"></i>
                    Site
                  </th>
                  <th>
                    <i className="fas fa-cogs"></i>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentZones.map(zone => (
                  <tr key={zone.zoneId} className="table-row">
                    <td>
                      <span className="id-badge">#{zone.zoneId}</span>
                    </td>
                    <td>
                      {editZoneId === zone.zoneId ? (
                        <input
                          type="text"
                          value={editZoneNom}
                          onChange={e => setEditZoneNom(e.target.value)}
                          className="edit-input"
                        />
                      ) : (
                        <span className="zone-name">{zone.zoneNom}</span>
                      )}
                    </td>
                    <td>
                      <span className="site-name">{getSiteNom(zone.zoneSiteId)}</span>
                    </td>
                    <td>
                      {editZoneId === zone.zoneId ? (
                        <div className="action-buttons">
                          <button 
                            className="btn btn-success btn-sm" 
                            onClick={() => handleEditSave(zone)} 
                            type="button" 
                            disabled={loading}
                          >
                            <i className="fas fa-check"></i>
                            Enregistrer
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={handleEditCancel} 
                            type="button"
                          >
                            <i className="fas fa-times"></i>
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button 
                            className="btn btn-warning btn-sm" 
                            onClick={() => handleEditClick(zone)} 
                            type="button"
                          >
                            <i className="fas fa-edit"></i>
                            Modifier
                          </button>
                          <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(zone.zoneId)} 
                            type="button" 
                            disabled={loading}
                          >
                            <i className="fas fa-trash"></i>
                            Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {zones.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty-state">
                      <div className="empty-icon">
                        <i className="fas fa-industry fa-3x"></i>
                      </div>
                      <h3>Aucune zone trouvée</h3>
                      <p>Commencez par créer votre première zone</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="btn btn-outline" 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                  Précédent
                </button>
                
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      className={`btn ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="btn btn-outline" 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Zone;