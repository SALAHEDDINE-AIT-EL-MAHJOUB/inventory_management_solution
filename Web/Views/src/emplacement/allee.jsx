import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emplacement.css";

const Allee = () => {
  const [societes, setSocietes] = useState([]);
  const [societeId, setSocieteId] = useState("");
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [zones, setZones] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [allees, setAllees] = useState([]);
  const [alleeNom, setAlleeNom] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [allSites, setAllSites] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [editAlleeId, setEditAlleeId] = useState(null);
  const [editAlleeNom, setEditAlleeNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const alleesPerPage = 7;

  // Charger toutes les données au montage
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("/api/allee"),
      axios.get("/api/client-societes"),
      axios.get("/api/site"),
      axios.get("/api/zone"),
    ])
      .then(([alleesRes, societesRes, sitesRes, zonesRes]) => {
        setAllees(alleesRes.data);
        setSocietes(societesRes.data);
        setAllSites(sitesRes.data);
        setAllZones(zonesRes.data);
      })
      .catch(() => {
        setAllees([]);
        setSocietes([]);
        setAllSites([]);
        setAllZones([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Charger les sites quand une société est sélectionnée
  useEffect(() => {
    if (societeId) {
      axios
        .get(`/api/Site/societe/${societeId}`)
        .then((res) => setSites(res.data))
        .catch(() => setSites([]));
      setSiteId("");
      setZoneId("");
    } else {
      setSites([]);
      setSiteId("");
      setZoneId("");
    }
  }, [societeId]);

  // Charger les zones quand un site est sélectionné
  useEffect(() => {
    if (siteId) {
      axios
        .get(`/api/zone/site/${siteId}`)
        .then((res) => setZones(res.data))
        .catch(() => setZones([]));
      setZoneId("");
    } else {
      setZones([]);
      setZoneId("");
    }
  }, [siteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!alleeNom || !zoneId) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/allee", {
        AlleeNom: alleeNom,
        AlleeZoneId: parseInt(zoneId),
        IsDeleted: false,
      });
      setMessage("Allée créée avec succès !");
      setAlleeNom("");
      setShowForm(false);
      // Recharge toutes les allées
      axios
        .get("/api/allee")
        .then((res) => setAllees(res.data))
        .catch(() => setAllees([]));
    } catch (err) {
      setMessage(
        "Erreur lors de la création de l'allée: " +
          (err.response?.data?.toString() || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const getZoneNom = (zoneId) => {
    const zone = allZones.find((z) => z.zoneId === zoneId);
    return zone ? zone.zoneNom : zoneId;
  };

  const getSiteNom = (zoneId) => {
    const zone = allZones.find((z) => z.zoneId === zoneId);
    if (zone) {
      const site = allSites.find((s) => s.id === zone.zoneSiteId);
      return site ? site.siteNom : "";
    }
    return "";
  };

  const handleEditClick = (allee) => {
    setEditAlleeId(allee.alleeId);
    setEditAlleeNom(allee.alleeNom);
  };

  const handleEditSave = async (allee) => {
    setLoading(true);
    try {
      await axios.put(`/api/allee/${allee.alleeId}`, {
        ...allee,
        alleeNom: editAlleeNom,
      });
      setEditAlleeId(null);
      setEditAlleeNom("");
      axios
        .get("/api/allee")
        .then((res) => setAllees(res.data))
        .catch(() => setAllees([]));
      setMessage("Allée modifiée avec succès !");
    } catch (err) {
      setMessage("Erreur lors de la modification.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditAlleeId(null);
    setEditAlleeNom("");
  };

  const handleDelete = async (alleeId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette allée ?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/allee/${alleeId}`);
      setAllees(allees.filter((a) => a.alleeId !== alleeId));
      setMessage("Allée supprimée avec succès !");
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination helpers
  const indexOfLastAllee = currentPage * alleesPerPage;
  const indexOfFirstAllee = indexOfLastAllee - alleesPerPage;
  const currentAllees = allees.slice(indexOfFirstAllee, indexOfLastAllee);
  const totalPages = Math.ceil(allees.length / alleesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="emp">
      <div className="page-header">
        <h2 className="page-title">
          <i className="fas fa-road"></i>
          Gestion des Allées
        </h2>
        <button
          className={`btn ${showForm ? "btn-secondary" : "btn-primary"}`}
          onClick={() => setShowForm((f) => !f)}
        >
          <i className={`fas ${showForm ? "fa-times" : "fa-plus"}`}></i>
          {showForm ? "Fermer le formulaire" : "Créer une nouvelle allée"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <i className="fas fa-edit"></i>
            <h3>Formulaire de création d'allée</h3>
          </div>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>
                <i className="fas fa-building"></i>
                Société *
              </label>
              <select
                value={societeId}
                onChange={(e) => setSocieteId(e.target.value)}
                required
              >
                <option value="">Sélectionnez une société</option>
                {societes.map((soc) => (
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
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                disabled={!societeId}
                required
              >
                <option value="">Sélectionnez un site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.siteNom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-industry"></i>
                Zone *
              </label>
              <select
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                disabled={!siteId}
                required
              >
                <option value="">Sélectionnez une zone</option>
                {zones.map((zone) => (
                  <option key={zone.zoneId} value={zone.zoneId}>
                    {zone.zoneNom}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-road"></i>
                Nom de l'allée *
              </label>
              <input
                type="text"
                value={alleeNom}
                onChange={(e) => setAlleeNom(e.target.value)}
                disabled={!zoneId}
                placeholder="Ex: Allée A"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!zoneId || !alleeNom || loading}
            >
              <i
                className={`fas ${
                  loading ? "fa-spinner fa-spin" : "fa-check"
                }`}
              ></i>
              {loading ? "Création..." : "Créer l'allée"}
            </button>
          </form>

          {message && (
            <div
              className={`alert ${
                message.includes("succès") ? "alert-success" : "alert-error"
              }`}
            >
              <i
                className={`fas ${
                  message.includes("succès")
                    ? "fa-check-circle"
                    : "fa-exclamation-triangle"
                }`}
              ></i>
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
              Liste des allées ({allees.length})
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
                    <i className="fas fa-road"></i>
                    Nom
                  </th>
                  <th>
                    <i className="fas fa-industry"></i>
                    Zone
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
                {currentAllees.map((allee) => (
                  <tr key={allee.alleeId} className="table-row">
                    <td>
                      <span className="id-badge">#{allee.alleeId}</span>
                    </td>
                    <td>
                      {editAlleeId === allee.alleeId ? (
                        <input
                          type="text"
                          value={editAlleeNom}
                          onChange={(e) => setEditAlleeNom(e.target.value)}
                          className="edit-input"
                        />
                      ) : (
                        <span className="zone-name">{allee.alleeNom}</span>
                      )}
                    </td>
                    <td>
                      <span className="site-name">
                        {getZoneNom(allee.alleeZoneId)}
                      </span>
                    </td>
                    <td>
                      <span className="site-name">
                        {getSiteNom(allee.alleeZoneId)}
                      </span>
                    </td>
                    <td>
                      {editAlleeId === allee.alleeId ? (
                        <div className="action-buttons">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleEditSave(allee)}
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
                            onClick={() => handleEditClick(allee)}
                            type="button"
                          >
                            <i className="fas fa-edit"></i>
                            Modifier
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(allee.alleeId)}
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
                {allees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      <div className="empty-icon">
                        <i className="fas fa-road fa-3x"></i>
                      </div>
                      <h3>Aucune allée trouvée</h3>
                      <p>Commencez par créer votre première allée</p>
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
                      className={`btn ${
                        currentPage === idx + 1 ? "btn-primary" : "btn-outline"
                      }`}
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

export default Allee;