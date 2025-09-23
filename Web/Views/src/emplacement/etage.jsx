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
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const etagesPerPage = 10;

  // Charger la liste des étages
  const fetchEtages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/Etage");
      setEtages(res.data);
    } catch (err) {
      setMessage("Erreur lors du chargement des étages");
    } finally {
      setLoading(false);
    }
  };

  // Charger sociétés au montage
  useEffect(() => {
    fetchEtages();
    axios.get("/api/rangee/societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
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
    if (societeId) {
      axios.get(`/api/rangee/sites/${societeId}`)
        .then(res => setSites(res.data))
        .catch(() => setSites([]));
    }
  }, [societeId]);

  // Charger zones quand siteId change
  useEffect(() => {
    setZones([]);
    setAllees([]);
    setRangees([]);
    setZoneId("");
    setAlleeId("");
    setRangeeId("");
    if (siteId) {
      axios.get(`/api/rangee/zones/${siteId}`)
        .then(res => setZones(res.data))
        .catch(() => setZones([]));
    }
  }, [siteId]);

  // Charger allées quand zoneId change
  useEffect(() => {
    setAllees([]);
    setRangees([]);
    setAlleeId("");
    setRangeeId("");
    if (zoneId) {
      axios.get(`/api/rangee/allees/${zoneId}`)
        .then(res => setAllees(res.data))
        .catch(() => setAllees([]));
    }
  }, [zoneId]);

  // Charger rangées quand alleeId change
  useEffect(() => {
    setRangees([]);
    setRangeeId("");
    if (alleeId) {
      axios.get(`/api/rangee?alleeId=${alleeId}`)
        .then(res => setRangees(res.data))
        .catch(() => setRangees([]));
    }
  }, [alleeId]);

  // Ajouter un étage
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nom.trim() || !societeId || !siteId || !zoneId || !alleeId || !rangeeId) {
      setMessage("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);
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
      setMessage("Étage créé avec succès !");
      fetchEtages();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setMessage("Erreur lors de l'ajout de l'étage");
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un étage
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet étage ?")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/Etage/${id}`);
      setMessage("Étage supprimé avec succès !");
      fetchEtages();
    } catch (err) {
      setMessage("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  // Pagination helpers
  const indexOfLastEtage = currentPage * etagesPerPage;
  const indexOfFirstEtage = indexOfLastEtage - etagesPerPage;
  const currentEtages = etages.slice(indexOfFirstEtage, indexOfLastEtage);
  const totalPages = Math.ceil(etages.length / etagesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Small helpers
  const clearMessage = () => {
    setTimeout(() => setMessage(""), 3500);
  };
  if (message) clearMessage();

  return (
    <div className="emp">
      {/* injected component-specific styles for improved design */}
      {/* remove inline <style> block - styles now in emplacement.css */}

      <div className="page-header">
        <h2 className="page-title">Gestion des Étages</h2>
        <div className="controls">
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <span className={`icon ${showForm ? 'icon-close' : 'icon-add'}`} />
            {showForm ? "Fermer" : "Ajouter un étage"}
          </button>
          <div style={{ color:"#5b6b76", fontWeight:600 }}>{etages.length} étages</div>
        </div>
      </div>

      {showForm && (
        <div className="form-card card">
          <h3 style={{ marginTop:0, marginBottom:12, color:"#0b4a6f" }}>
            <span className="icon icon-building" /> Nouveau étage
          </h3>
          <form onSubmit={handleAdd} className="form-grid">
            <div>
              <label>Nom de l'étage *</label>
              <input type="text" placeholder="Ex: Étage 1" value={nom} onChange={(e)=>setNom(e.target.value)} required />
            </div>

            <div>
              <label>Société *</label>
              <select value={societeId} onChange={e => setSocieteId(e.target.value)} required>
                <option value="">Sélectionnez une société</option>
                {societes.map(s => (<option key={s.id} value={s.id}>{s.nom}</option>))}
              </select>
            </div>

            <div>
              <label>Site *</label>
              <select value={siteId} onChange={e => setSiteId(e.target.value)} disabled={!societeId} required>
                <option value="">Sélectionnez un site</option>
                {sites.map(s => (<option key={s.id} value={s.id}>{s.siteNom}</option>))}
              </select>
            </div>

            <div>
              <label>Zone *</label>
              <select value={zoneId} onChange={e => setZoneId(e.target.value)} disabled={!siteId} required>
                <option value="">Sélectionnez une zone</option>
                {zones.map(z => (<option key={z.zoneId} value={z.zoneId}>{z.zoneNom}</option>))}
              </select>
            </div>

            <div>
              <label>Allée *</label>
              <select value={alleeId} onChange={e => setAlleeId(e.target.value)} disabled={!zoneId} required>
                <option value="">Sélectionnez une allée</option>
                {allees.map(a => (<option key={a.alleeId} value={a.alleeId}>{a.alleeNom}</option>))}
              </select>
            </div>

            <div>
              <label>Rangée *</label>
              <select value={rangeeId} onChange={e => setRangeeId(e.target.value)} disabled={!alleeId} required>
                <option value="">Sélectionnez une rangée</option>
                {rangees.map(r => (<option key={r.rangeeId} value={r.rangeeId}>{r.rangeeNom}</option>))}
              </select>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                <span className="icon icon-save" /> {loading ? "Création..." : "Créer"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setMessage(""); }} style={{ background:"transparent", border:"none", color:"#5b6b76", fontWeight:700, cursor:"pointer" }}>
                Annuler
              </button>
            </div>
          </form>

          {message && (
            <div className={`message ${message.includes("succès") ? "success" : "error"}`}>
              <span className={`icon ${message.includes("succès") ? "icon-save" : "icon-close"}`} />
              {message}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="loading card">
          <div className="spinner" />
        </div>
      )}

      {!loading && (
        <div className="card" style={{ paddingBottom: 8 }}>
          <h3 style={{ marginTop:0, color:"#0b4a6f" }}>
            <span className="icon icon-list" /> Liste des étages <span style={{ color:"#5b6b76", fontSize:13, marginLeft:8 }}>({etages.length})</span>
          </h3>

          <div style={{ overflowX:"auto", marginTop:12 }}>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Société</th>
                  <th>Site</th>
                  <th>Zone</th>
                  <th>Allée</th>
                  <th>Rangée</th>
                  <th style={{ textAlign:"center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEtages.map((etage) => (
                  <tr key={etage.id}>
                    <td><strong style={{ color:"#0b4a6f" }}>{etage.nom}</strong></td>
                    <td style={{ color:"#4b6b7a" }}>{etage.societe?.nom || "—"}</td>
                    <td style={{ color:"#4b6b7a" }}>{etage.site?.siteNom || "—"}</td>
                    <td style={{ color:"#4b6b7a" }}>{etage.zone?.zoneNom || "—"}</td>
                    <td style={{ color:"#4b6b7a" }}>{etage.allee?.alleeNom || "—"}</td>
                    <td style={{ color:"#4b6b7a" }}>{etage.etageRangee?.rangeeNom || "—"}</td>
                    <td style={{ textAlign:"center" }}>
                      <button onClick={() => handleDelete(etage.id)} className="btn-danger" disabled={loading}>
                        <span className="icon icon-delete" /> Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {etages.length === 0 && (
                  <tr>
                    <td colSpan={7} className="empty-state">
                      <div style={{ fontSize: 46, marginBottom: 12, color:"#d7e6f7" }}>
                        <span className="icon icon-building" style={{ width:56, height:56 }} />
                      </div>
                      <h3 style={{ margin: 0, color:"#0b4a6f" }}>Aucun étage trouvé</h3>
                      <p style={{ marginTop:8, color:"#6b7785" }}>Commencez par créer votre premier étage</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination" style={{ marginTop:12 }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <span className="icon icon-chevron-left" /> Précédent
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
                  Suivant <span className="icon icon-chevron-right" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Etage;