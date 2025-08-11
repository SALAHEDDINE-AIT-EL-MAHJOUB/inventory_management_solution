import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Site from "./site";
import Zone from "../emplacement/zone";
import GestionSocietes from "./GestionSocietes";
import Ville from "./ville";

const RegionVille = () => {
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pour création de région
  const [newRegion, setNewRegion] = useState({ name: "" });
  const [creatingRegion, setCreatingRegion] = useState(false);
  const [deletingRegionId, setDeletingRegionId] = useState(null);

  // Pour création de ville
  const [newVille, setNewVille] = useState({ nom: "", regionId: "" });
  const [creatingVille, setCreatingVille] = useState(false);
  const [deletingVilleId, setDeletingVilleId] = useState(null);

  // Ajoute l'état pour la navigation
  const [activeTab, setActiveTab] = useState("sites");

  // Pagination pour les régions
  const [currentRegionPage, setCurrentRegionPage] = useState(1);
  const regionsPerPage = 10;
  const indexOfLastRegion = currentRegionPage * regionsPerPage;
  const indexOfFirstRegion = indexOfLastRegion - regionsPerPage;
  const currentRegions = regions.slice(indexOfFirstRegion, indexOfLastRegion);
  const totalRegionPages = Math.ceil(regions.length / regionsPerPage);

  // Pagination pour les villes
  const [currentVillePage, setCurrentVillePage] = useState(1);
  const villesPerPage = 10;
  const indexOfLastVille = currentVillePage * villesPerPage;
  const indexOfFirstVille = indexOfLastVille - villesPerPage;
  const currentVilles = villes.slice(indexOfFirstVille, indexOfLastVille);
  const totalVillePages = Math.ceil(villes.length / villesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsRes, villesRes] = await Promise.all([
          axios.get("/api/regionville/regions"),
          axios.get("/api/ville"),
        ]);
        setRegions(regionsRes.data);
        setVilles(villesRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Création région
  const handleRegionChange = (e) => {
    setNewRegion({ ...newRegion, [e.target.name]: e.target.value });
  };

  const handleCreateRegion = async (e) => {
    e.preventDefault();
    setCreatingRegion(true);
    setError("");
    try {
      await axios.post("/api/regionville/regions", {
        Name: newRegion.name,
      });
      setNewRegion({ name: "" });
      // Recharge la liste
      const regionsRes = await axios.get("/api/regionville/regions");
      setRegions(regionsRes.data);
    } catch (err) {
      setError("Erreur lors de la création de la région");
    } finally {
      setCreatingRegion(false);
    }
  };

  const handleDeleteRegion = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette région ?")) return;
    setDeletingRegionId(id);
    setError("");
    try {
      await axios.delete(`/api/regionville/regions/${id}`);
      setRegions(regions.filter(r => r.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la région");
    } finally {
      setDeletingRegionId(null);
    }
  };

  // Création ville
  const handleVilleChange = (e) => {
    setNewVille({ ...newVille, [e.target.name]: e.target.value });
  };

  const handleCreateVille = async (e) => {
    e.preventDefault();
    setCreatingVille(true);
    setError("");
    if (!newVille.nom || !newVille.regionId || isNaN(parseInt(newVille.regionId, 10))) {
      setError("Veuillez remplir tous les champs.");
      setCreatingVille(false);
      return;
    }
    try {
      await axios.post("/api/ville", {
        Nom: newVille.nom,
        RegionId: parseInt(newVille.regionId, 10),
      });
      setNewVille({ nom: "", regionId: "" });
      const villesRes = await axios.get("/api/ville");
      setVilles(villesRes.data);
    } catch (err) {
      let msg = "Erreur lors de la création de la ville";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else if (err.response.data.errors) {
          msg = Object.values(err.response.data.errors).flat().join(" ");
        } else if (err.response.data.title) {
          msg = err.response.data.title;
        }
      }
      setError(msg);
    } finally {
      setCreatingVille(false);
    }
  };

  const handleDeleteVille = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette ville ?")) return;
    setDeletingVilleId(id);
    setError("");
    try {
      await axios.delete(`/api/ville/${id}`);
      setVilles(villes.filter(v => v.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la ville");
    } finally {
      setDeletingVilleId(null);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Navbar active={activeTab} onNavigate={setActiveTab} />
      {activeTab === "sites" && (
        <>
          <h2 style={{ color: "#1976d2" }}>Régions</h2>
          <table style={{
            borderCollapse: "collapse",
            width: "100%",
            background: "#fff",
            boxShadow: "0 2px 8px #eee",
            marginBottom: 30
          }}>
            <thead style={{ background: "#1976d2", color: "#fff" }}>
              <tr>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Nom de la région</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRegions.length === 0 ? (
                <tr><td colSpan={2} style={{ padding: 8, border: "1px solid #ddd" }}>Aucune région trouvée.</td></tr>
              ) : (
                currentRegions.map((region) => (
                  <tr key={region.id}>
                    <td style={{ padding: 8, border: "1px solid #ddd" }}>{region.name ?? region.Name}</td>
                    <td style={{ padding: 8, border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleDeleteRegion(region.id)}
                        style={{
                          background: "#e53935",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "5px 12px",
                          cursor: "pointer"
                        }}
                        disabled={deletingRegionId === region.id}
                      >
                        {deletingRegionId === region.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination pour les régions */}
          {totalRegionPages > 1 && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button
                onClick={() => setCurrentRegionPage(currentRegionPage - 1)}
                disabled={currentRegionPage === 1}
                style={{
                  marginRight: 8,
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #1976d2",
                  background: "#fff",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Précédent
              </button>
              {[...Array(totalRegionPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentRegionPage(idx + 1)}
                  style={{
                    margin: "0 2px",
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "1px solid #1976d2",
                    background: currentRegionPage === idx + 1 ? "#1976d2" : "#fff",
                    color: currentRegionPage === idx + 1 ? "#fff" : "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentRegionPage(currentRegionPage + 1)}
                disabled={currentRegionPage === totalRegionPages}
                style={{
                  marginLeft: 8,
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #1976d2",
                  background: "#fff",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Suivant
              </button>
            </div>
          )}

          <h3 style={{ color: "#1976d2" }}>Ajouter une région</h3>
          <form onSubmit={handleCreateRegion} style={{
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
            background: "#f9f9f9",
            marginBottom: 30
          }}>
            <div style={{ marginBottom: 10 }}>
              <label>
                Nom de la région:&nbsp;
                <input
                  type="text"
                  name="name"
                  placeholder="Nom de la région"
                  value={newRegion.name}
                  onChange={handleRegionChange}
                  required
                  style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={creatingRegion}
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "8px 18px",
                cursor: "pointer"
              }}
            >
              {creatingRegion ? "Création..." : "Créer la région"}
            </button>
          </form>

          <h2 style={{ color: "#1976d2" }}>Villes</h2>
          <table style={{
            borderCollapse: "collapse",
            width: "100%",
            background: "#fff",
            boxShadow: "0 2px 8px #eee",
            marginBottom: 30
          }}>
            <thead style={{ background: "#1976d2", color: "#fff" }}>
              <tr>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Nom de la ville</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Région</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentVilles.length === 0 ? (
                <tr><td colSpan={3} style={{ padding: 8, border: "1px solid #ddd" }}>Aucune ville trouvée.</td></tr>
              ) : (
                currentVilles.map((ville) => (
                  <tr key={ville.id}>
                    <td style={{ padding: 8, border: "1px solid #ddd" }}>
                      {ville.nom ?? ville.Nom ?? "Nom inconnu"}
                    </td>
                    <td style={{ padding: 8, border: "1px solid #ddd" }}>
                      {ville.region?.name || ville.Region?.name || "-"}
                    </td>
                    <td style={{ padding: 8, border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleDeleteVille(ville.id)}
                        style={{
                          background: "#e53935",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "5px 12px",
                          cursor: "pointer"
                        }}
                        disabled={deletingVilleId === ville.id}
                      >
                        {deletingVilleId === ville.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination pour les villes */}
          {totalVillePages > 1 && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button
                onClick={() => setCurrentVillePage(currentVillePage - 1)}
                disabled={currentVillePage === 1}
                style={{
                  marginRight: 8,
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #1976d2",
                  background: "#fff",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Précédent
              </button>
              {[...Array(totalVillePages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentVillePage(idx + 1)}
                  style={{
                    margin: "0 2px",
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "1px solid #1976d2",
                    background: currentVillePage === idx + 1 ? "#1976d2" : "#fff",
                    color: currentVillePage === idx + 1 ? "#fff" : "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentVillePage(currentVillePage + 1)}
                disabled={currentVillePage === totalVillePages}
                style={{
                  marginLeft: 8,
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "1px solid #1976d2",
                  background: "#fff",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
              >
                Suivant
              </button>
            </div>
          )}

          <h3 style={{ color: "#1976d2" }}>Ajouter une ville</h3>
          <form onSubmit={handleCreateVille} style={{
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
            background: "#f9f9f9"
          }}>
            <div style={{ marginBottom: 10 }}>
              <label>
                Nom de la ville:&nbsp;
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom de la ville"
                  value={newVille.nom}
                  onChange={handleVilleChange}
                  required
                  style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>
                Région:&nbsp;
                <select
                  name="regionId"
                  value={newVille.regionId}
                  onChange={handleVilleChange}
                  required
                  style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                >
                  <option value="">Sélectionnez une région</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name ?? region.Name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              disabled={creatingVille}
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "8px 18px",
                cursor: "pointer"
              }}
            >
              {creatingVille ? "Création..." : "Créer la ville"}
            </button>
          </form>
          <hr style={{ margin: "40px 0" }} />
        </>
      )}
      {activeTab === "zones" && <Zone />}
      {activeTab === "societes" && <GestionSocietes />}
      {activeTab === "villes" && <Ville />}
    </div>
  );
};

export default RegionVille;