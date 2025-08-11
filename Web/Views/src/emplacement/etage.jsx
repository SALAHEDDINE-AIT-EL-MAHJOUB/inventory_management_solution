import React, { useEffect, useState } from "react";
import axios from "axios";
import "./emplacement.css";

const Etage = () => {
  const [etages, setEtages] = useState([]);
  const [nom, setNom] = useState("");
  const [societes, setSocietes] = useState([]);
  const [sites, setSites] = useState([]);
  const [zones, setZones] = useState([]);
  const [allees, setAllees] = useState([]);
  const [rangees, setRangees] = useState([]);

  const [societeId, setSocieteId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [alleeId, setAlleeId] = useState("");
  const [rangeeId, setRangeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const etagesPerPage = 10;

  // Charger la liste des étages
  const fetchEtages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/Etage");
      setEtages(res.data);
    } catch (err) {
      alert("Erreur lors du chargement des étages");
    }
    setLoading(false);
  };

  // Charger sociétés au montage
  useEffect(() => {
    fetchEtages();
    axios.get("/api/rangee/societes").then(res => setSocietes(res.data));
  }, []);

  // Charger sites quand societeId change
  useEffect(() => {
    setSites([]);
    setZones([]);
    setAllees([]);
    setRangees([]);
    setSiteId("");
    setZoneId("");
    setAlleeId("");
    setRangeeId("");
    if (societeId)
      axios.get(`/api/rangee/sites/${societeId}`).then(res => setSites(res.data));
  }, [societeId]);

  // Charger zones quand siteId change
  useEffect(() => {
    setZones([]);
    setAllees([]);
    setRangees([]);
    setZoneId("");
    setAlleeId("");
    setRangeeId("");
    if (siteId)
      axios.get(`/api/rangee/zones/${siteId}`).then(res => setZones(res.data));
  }, [siteId]);

  // Charger allées quand zoneId change
  useEffect(() => {
    setAllees([]);
    setRangees([]);
    setAlleeId("");
    setRangeeId("");
    if (zoneId)
      axios.get(`/api/rangee/allees/${zoneId}`).then(res => setAllees(res.data));
  }, [zoneId]);

  // Charger rangées quand alleeId change
  useEffect(() => {
    setRangees([]);
    setRangeeId("");
    if (alleeId)
      axios.get(`/api/rangee?alleeId=${alleeId}`).then(res => setRangees(res.data));
  }, [alleeId]);

  // Ajouter un étage
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nom.trim() || !societeId || !siteId || !zoneId || !alleeId || !rangeeId) {
      alert("Tous les champs sont obligatoires");
      return;
    }
    try {
      await axios.post("/api/Etage", {
        nom,
        societeId: parseInt(societeId),
        siteId: parseInt(siteId),
        zoneId: parseInt(zoneId),
        alleeId: parseInt(alleeId),
        rangeeId: parseInt(rangeeId)
      });
      setNom("");
      setSocieteId("");
      setSiteId("");
      setZoneId("");
      setAlleeId("");
      setRangeeId("");
      setShowForm(false);
      fetchEtages();
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  // Supprimer un étage
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet étage ?")) return;
    try {
      await axios.delete(`/api/Etage/${id}`);
      fetchEtages();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  // Pagination helpers
  const indexOfLastEtage = currentPage * etagesPerPage;
  const indexOfFirstEtage = indexOfLastEtage - etagesPerPage;
  const currentEtages = etages.slice(indexOfFirstEtage, indexOfLastEtage);
  const totalPages = Math.ceil(etages.length / etagesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="emp">
      <h2>Liste des étages</h2>
      <button className="btn-primary mb-16" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fermer le formulaire" : "Ajouter un étage"}
      </button>
      {showForm && (
        <form onSubmit={handleAdd} className="card form-grid mb-24">
          <input
            type="text"
            placeholder="Nom de l'étage"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc", flex: "1 1 120px" }}
          />
          <select value={societeId} onChange={e => setSocieteId(e.target.value)} style={{ padding: 6, borderRadius: 4 }}>
            <option value="">Choisir société</option>
            {societes.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
          </select>
          <select value={siteId} onChange={e => setSiteId(e.target.value)} disabled={!societeId} style={{ padding: 6, borderRadius: 4 }}>
            <option value="">Choisir site</option>
            {sites.map(s => <option key={s.id} value={s.id}>{s.siteNom}</option>)}
          </select>
          <select value={zoneId} onChange={e => setZoneId(e.target.value)} disabled={!siteId} style={{ padding: 6, borderRadius: 4 }}>
            <option value="">Choisir zone</option>
            {zones.map(z => <option key={z.zoneId} value={z.zoneId}>{z.zoneNom}</option>)}
          </select>
          <select value={alleeId} onChange={e => setAlleeId(e.target.value)} disabled={!zoneId} style={{ padding: 6, borderRadius: 4 }}>
            <option value="">Choisir allée</option>
            {allees.map(a => <option key={a.alleeId} value={a.alleeId}>{a.alleeNom}</option>)}
          </select>
          <select value={rangeeId} onChange={e => setRangeeId(e.target.value)} disabled={!alleeId} style={{ padding: 6, borderRadius: 4 }}>
            <option value="">Choisir rangée</option>
            {rangees.map(r => <option key={r.rangeeId} value={r.rangeeId}>{r.rangeeNom}</option>)}
          </select>
          <button type="submit" className="btn-primary">
            Ajouter
          </button>
        </form>
      )}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Nom</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Société</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Site</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Zone</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Allée</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Rangée</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEtages.map((etage) => (
                <tr key={etage.id}>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.nom}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.societe?.nom || ""}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.site?.siteNom || ""}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.zone?.zoneNom || ""}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.allee?.alleeNom || ""}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>{etage.etageRangee?.rangeeNom || ""}</td>
                  <td style={{ padding: 8, border: "1px solid #ddd" }}>
                    <button onClick={() => handleDelete(etage.id)} className="btn-danger">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {etages.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: 12 }}>
                    Aucun étage trouvé.
                  </td>
                </tr>
              )}
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
        </>
      )}
    </div>
  );
};

export default Etage;