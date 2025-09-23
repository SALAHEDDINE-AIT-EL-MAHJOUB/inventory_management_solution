import React, { useEffect, useState } from "react";
import axios from "axios";

const Region = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRegion, setNewRegion] = useState({ name: "" });
  const [creatingRegion, setCreatingRegion] = useState(false);
  const [deletingRegionId, setDeletingRegionId] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
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

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
        <div style={{ fontSize: "18px" }}>⏳ Chargement...</div>
      </div>
    );

  if (error)
    return (
      <div
        style={{
          color: "#ef4444",
          background: "#fef2f2",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #fecaca",
        }}
      >
        {error}
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              color: "#1e293b",
              margin: 0,
              fontSize: "28px",
              fontWeight: "600",
            }}
          >
            🗺️ Gestion des Régions
          </h2>
          <button
            onClick={() => setShowForm((f) => !f)}
            style={{
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            {showForm ? "✕ Fermer" : "+ Ajouter une région"}
          </button>
        </div>

        {showForm && (
          <div
            style={{
              background:
                "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                color: "#334155",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              🆕 Nouvelle région
            </h3>
            <form onSubmit={handleCreateRegion}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#475569",
                    fontWeight: "600",
                  }}
                >
                  Nom de la région
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Entrez le nom de la région"
                  value={newRegion.name}
                  onChange={handleRegionChange}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    transition: "border-color 0.3s ease",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="submit"
                  disabled={creatingRegion}
                  style={{
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
                    opacity: creatingRegion ? 0.7 : 1,
                  }}
                >
                  {creatingRegion ? "⏳ Création..." : "✓ Créer la région"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background:
                      "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  ✕ Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {regions.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
              background: "#f1f5f9",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
            <div style={{ fontSize: "18px" }}>Aucune région trouvée</div>
          </div>
        ) : (
          <>
            <div
              style={{
                overflowX: "auto",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#ffffff",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <th
                      style={{
                        padding: "16px",
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      🗺️ Nom de la région
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      ⚙️ Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRegions.map((region, idx) => (
                    <tr
                      key={region.id}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#e0f2fe")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background =
                          idx % 2 === 0 ? "#ffffff" : "#f8fafc")
                      }
                    >
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#334155",
                          fontWeight: "600",
                        }}
                      >
                        {region.name ?? region.Name}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => handleDeleteRegion(region.id)}
                          disabled={deletingRegionId === region.id}
                          style={{
                            background:
                              "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "12px",
                            boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
                            opacity: deletingRegionId === region.id ? 0.7 : 1,
                          }}
                        >
                          {deletingRegionId === region.id
                            ? "⏳"
                            : "🗑️ Supprimer"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "24px",
                  gap: "8px",
                }}
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#64748b",
                    fontWeight: "600",
                    cursor:
                      currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  ← Précédent
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    style={{
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "8px",
                      background:
                        currentPage === idx + 1
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "#ffffff",
                      color: currentPage === idx + 1 ? "#ffffff" : "#64748b",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow:
                        currentPage === idx + 1
                          ? "0 4px 15px rgba(102, 126, 234, 0.3)"
                          : "none",
                    }}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#64748b",
                    fontWeight: "600",
                    cursor:
                      currentPage === totalPages
                        ? "not-allowed"
                        : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Region;