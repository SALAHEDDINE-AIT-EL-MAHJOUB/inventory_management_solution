import React, { useState, useEffect } from "react";
import axios from "axios";
import "./emplacement.css";

const AlleeForm = () => {
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedSocieteId, setSelectedSocieteId] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [alleeNom, setAlleeNom] = useState("");
  const [message, setMessage] = useState("");
  const [allees, setAllees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const alleesPerPage = 7;

  // Charger les sociétés au montage
  useEffect(() => {
    axios
      .get("/api/client-societes")
      .then((res) => setSocietes(res.data))
      .catch(() => setSocietes([]));
  }, []);

  // Charger les sites quand une société est sélectionnée
  useEffect(() => {
    if (selectedSocieteId) {
      axios
        .get(`/api/Site/societe/${selectedSocieteId}`)
        .then((res) => setSites(res.data))
        .catch(() => setSites([]));
    } else {
      setSites([]);
      setZones([]);
      setSelectedSiteId("");
      setSelectedZoneId("");
    }
  }, [selectedSocieteId]);

  // Charger les zones quand un site est sélectionné
  useEffect(() => {
    if (selectedSiteId) {
      axios
        .get(`/api/Zone/by-site/${selectedSiteId}`)
        .then((res) => setZones(res.data))
        .catch(() => setZones([]));
    } else {
      setZones([]);
      setSelectedZoneId("");
    }
  }, [selectedSiteId]);

  // Charger les allées
  const fetchAllees = async () => {
    try {
      // Utilise l'endpoint standard pour la liste enrichie
      const res = await axios.get("/api/Allee");
      setAllees(res.data);
    } catch (err) {
      setMessage("Erreur lors du chargement des allées.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("/api/Allee", {
        alleeNom,
        alleeZoneId: selectedZoneId,
      });
      setAlleeNom("");
      setSelectedSocieteId("");
      setSelectedSiteId("");
      setSelectedZoneId("");
      setMessage("Allée ajoutée !");
      fetchAllees();
      setShowForm(false);
    } catch {
      setMessage("Erreur lors de la création de l'allée.");
    }
  };

  const handleDelete = async (alleeId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette allée ?")) return;
    try {
      await axios.delete(`/api/Allee/${alleeId}`);
      setMessage("Allée supprimée !");
      fetchAllees();
    } catch {
      setMessage("Erreur lors de la suppression.");
    }
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
    setMessage("");
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
      <button onClick={handleShowForm} className="btn-primary mb-24">
        {showForm ? "Fermer le formulaire" : "Créer une allée"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-32">
          <div className="mb-16">
            <label
              htmlFor="societeSelect"
              className="block mb-6 font-bold"
            >
              Société :
            </label>
            <select
              id="societeSelect"
              value={selectedSocieteId}
              onChange={(e) => {
                setSelectedSocieteId(e.target.value);
                setSelectedSiteId("");
                setSelectedZoneId("");
                setMessage("");
              }}
              className="w-full p-8 rounded border border-gray-300 font-16"
              required
            >
              <option value="">Sélectionnez une société</option>
              {societes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-16">
            <label
              htmlFor="siteSelect"
              className="block mb-6 font-bold"
            >
              Site :
            </label>
            <select
              id="siteSelect"
              value={selectedSiteId}
              onChange={(e) => {
                setSelectedSiteId(e.target.value);
                setSelectedZoneId("");
                setMessage("");
              }}
              className="w-full p-8 rounded border border-gray-300 font-16"
              required
              disabled={!selectedSocieteId}
            >
              <option value="">Sélectionnez un site</option>
              {sites.map((site) => (
                <option key={site.id || site.siteId} value={site.id || site.siteId}>
                  {site.siteNom}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-16">
            <label
              htmlFor="zoneSelect"
              className="block mb-6 font-bold"
            >
              Zone :
            </label>
            <select
              id="zoneSelect"
              value={selectedZoneId}
              onChange={(e) => {
                setSelectedZoneId(e.target.value);
                setMessage("");
              }}
              className="w-full p-8 rounded border border-gray-300 font-16"
              required
              disabled={!selectedSiteId}
            >
              <option value="">Sélectionnez une zone</option>
              {zones.map((zone) => (
                <option key={zone.zoneId} value={zone.zoneId}>
                  {zone.zoneNom}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-16">
            <label
              htmlFor="alleeNom"
              className="block mb-6 font-bold"
            >
              Nom de l'allée :
            </label>
            <input
              id="alleeNom"
              type="text"
              value={alleeNom}
              onChange={(e) => {
                setAlleeNom(e.target.value);
                setMessage("");
              }}
              className="w-full p-8 rounded border border-gray-300 font-16"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Créer
          </button>
          {message && (
            <p
              className="mt-16"
              style={{
                color:
                  message.includes("ajoutée") || message.includes("supprimée")
                    ? "green"
                    : "red",
              }}
            >
              {message}
            </p>
          )}
        </form>
      )}

      {allees.length > 0 && (
        <div>
          <h3 className="text-gray-700">Liste des allées</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-10 border border-gray-300">ID</th>
                <th className="p-10 border border-gray-300">Nom</th>
                <th className="p-10 border border-gray-300">Zone ID</th>
                <th className="p-10 border border-gray-300">Nom de la zone</th>
                <th className="p-10 border border-gray-300">Nom du site</th>
                <th className="p-10 border border-gray-300">Nom société</th>
                <th className="p-10 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAllees.map((allee) => (
                <tr key={allee.alleeId}>
                  <td className="p-10 border border-gray-200">{allee.alleeId}</td>
                  <td className="p-10 border border-gray-200">{allee.alleeNom}</td>
                  <td className="p-10 border border-gray-200">{allee.alleeZoneId}</td>
                  <td className="p-10 border border-gray-200">{allee.zoneNom || "—"}</td>
                  <td className="p-10 border border-gray-200">{allee.siteNom || "—"}</td>
                  <td className="p-10 border border-gray-200">{allee.societeNom || "—"}</td>
                  <td className="p-10 border border-gray-200">
                    <button className="btn-danger" onClick={() => handleDelete(allee.alleeId)}>
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
      )}
    </div>
  );
};

export default AlleeForm;