import React, { useEffect, useState } from "react";
import axios from "axios";

const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = () => {
    setLoading(true);
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  };

  const handleEdit = (site) => {
    setEditId(site.id);
    setEditValues({
      siteNom: site.siteNom,
      adress: site.adress,
      siteTelephone: site.siteTelephone,
      email: site.email,
      siteVilleId: site.siteVilleId,
      societeId: site.societeId
    });
  };

  const handleEditChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`/api/site/${id}`, { id, ...editValues });
      setEditId(null);
      setEditValues({});
      fetchSites();
      setMessage("Site modifié !");
    } catch (err) {
      setMessage("Erreur lors de la modification.");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditValues({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce site ?")) return;
    try {
      await axios.delete(`/api/site/${id}`);
      setSites(sites.filter(s => s.id !== id));
      setMessage("Site supprimé !");
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Liste des sites</h2>
      {message && <div style={{ margin: "10px 0", color: "#1976d2" }}>{message}</div>}
      <table border="1">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Ville</th>
            <th>Société</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.id}>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.siteNom}
                    onChange={e => handleEditChange("siteNom", e.target.value)}
                  />
                ) : (
                  site.siteNom
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.adress}
                    onChange={e => handleEditChange("adress", e.target.value)}
                  />
                ) : (
                  site.adress
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.siteTelephone}
                    onChange={e => handleEditChange("siteTelephone", e.target.value)}
                  />
                ) : (
                  site.siteTelephone
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.email}
                    onChange={e => handleEditChange("email", e.target.value)}
                  />
                ) : (
                  site.email
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.siteVilleId}
                    onChange={e => handleEditChange("siteVilleId", e.target.value)}
                  />
                ) : (
                  site.siteVilleId
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <input
                    value={editValues.societeId}
                    onChange={e => handleEditChange("societeId", e.target.value)}
                  />
                ) : (
                  site.societeId
                )}
              </td>
              <td>
                {editId === site.id ? (
                  <>
                    <button onClick={() => handleEditSave(site.id)}>Enregistrer</button>
                    <button onClick={handleEditCancel}>Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(site)}>Modifier</button>
                    <button onClick={() => handleDelete(site.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteList;