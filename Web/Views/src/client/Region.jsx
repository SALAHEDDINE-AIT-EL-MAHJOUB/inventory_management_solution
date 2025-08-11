import React, { useEffect, useState } from "react";
import axios from "axios";

const Region = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRegion, setNewRegion] = useState({ name: "" });
  const [creatingRegion, setCreatingRegion] = useState(false);
  const [deletingRegionId, setDeletingRegionId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const regionsPerPage = 10;
  const indexOfLastRegion = currentPage * regionsPerPage;
  const indexOfFirstRegion = indexOfLastRegion - regionsPerPage;
  const currentRegions = regions.slice(indexOfFirstRegion, indexOfLastRegion);
  const totalPages = Math.ceil(regions.length / regionsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsRes = await axios.get("/api/regionville/regions");
        setRegions(regionsRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      setRegions(regions.filter((r) => r.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la région");
    } finally {
      setDeletingRegionId(null);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2 style={{ color: "#1976d2" }}>Régions</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px #eee",
          marginBottom: 30,
        }}
      >
        <thead style={{ background: "#1976d2", color: "#fff" }}>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>
              Nom de la région
            </th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRegions.length === 0 ? (
            <tr>
              <td
                colSpan={2}
                style={{ padding: 8, border: "1px solid #ddd" }}
              >
                Aucune région trouvée.
              </td>
            </tr>
          ) : (
            currentRegions.map((region) => (
              <tr key={region.id}>
                <td style={{ padding: 8, border: "1px solid #ddd" }}>
                  {region.name ?? region.Name}
                </td>
                <td style={{ padding: 8, border: "1px solid #ddd" }}>
                  <button
                    onClick={() => handleDeleteRegion(region.id)}
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "5px 12px",
                      cursor: "pointer",
                    }}
                    disabled={deletingRegionId === region.id}
                  >
                    {deletingRegionId === region.id
                      ? "Suppression..."
                      : "Supprimer"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
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
                fontWeight: "bold",
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
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
      <form
        onSubmit={handleCreateRegion}
        style={{
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 8,
          background: "#f9f9f9",
          marginBottom: 30,
        }}
      >
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
              style={{
                padding: 6,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
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
            cursor: "pointer",
          }}
        >
          {creatingRegion ? "Création..." : "Créer la région"}
        </button>
      </form>
    </div>
  );
};

export default Region;