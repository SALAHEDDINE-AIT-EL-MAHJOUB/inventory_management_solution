import React, { useEffect, useState } from "react";
import axios from "axios";
import "../emplacement/emplacement.css"; 
const Ville = () => {
  const [villes, setVilles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newVille, setNewVille] = useState({ nom: "", regionId: "" });
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const villesPerPage = 10;
  const indexOfLastVille = currentPage * villesPerPage;
  const indexOfFirstVille = indexOfLastVille - villesPerPage;
  const currentVilles = villes.slice(indexOfFirstVille, indexOfLastVille);
  const totalPages = Math.ceil(villes.length / villesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Show form state
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villesRes, regionsRes] = await Promise.all([
          axios.get("/api/ville"),
          axios.get("/api/regionville/regions"),
        ]);
        setVilles(villesRes.data);
        setRegions(regionsRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewVille({ ...newVille, [e.target.name]: e.target.value });
  };

  const handleCreateVille = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      await axios.post("/api/ville", {
        Nom: newVille.nom,
        RegionId: parseInt(newVille.regionId, 10),
      });
      setNewVille({ nom: "", regionId: "" });
      const villesRes = await axios.get("/api/ville");
      setVilles(villesRes.data);
      setShowForm(false);
    } catch (err) {
      setError("Erreur lors de la création de la ville");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette ville ?")) return;
    setDeletingId(id);
    setError("");
    try {
      await axios.delete(`/api/ville/${id}`);
      setVilles(villes.filter((v) => v.id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression de la ville");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return <div style={{ padding: 30 }}>Chargement des villes...</div>;
  if (error)
    return <div style={{ color: "red", padding: 30 }}>{error}</div>;

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
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
            🏙️ Gestion des Villes
          </h2>
          <button
            onClick={() => setShowForm((f) => !f)}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            {showForm ? "✕ Fermer" : "+ Ajouter une ville"}
          </button>
        </div>

        {showForm && (
          <div
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ color: "#334155", marginBottom: "20px" }}>
              🆕 Nouvelle ville
            </h3>
            <form onSubmit={handleCreateVille}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#475569",
                      fontWeight: "600",
                    }}
                  >
                    Nom de la ville
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={newVille.nom}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#475569",
                      fontWeight: "600",
                    }}
                  >
                    Région
                  </label>
                  <select
                    name="regionId"
                    value={newVille.regionId}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Sélectionnez une région</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name ?? region.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={creating}
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
                }}
              >
                {creating ? "⏳ Création..." : "✓ Créer la ville"}
              </button>
            </form>
          </div>
        )}

        {villes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
              background: "#f1f5f9",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏙️</div>
            <div style={{ fontSize: "18px" }}>Aucune ville trouvée</div>
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
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                      🏙️ Nom de la ville
                    </th>
                    <th
                      style={{
                        padding: "16px",
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      🗺️ Région
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
                  {currentVilles.map((ville, idx) => (
                    <tr
                      key={ville.id}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#e0f2fe")}
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
                        {ville.nom ?? ville.Nom ?? "Nom inconnu"}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b",
                        }}
                      >
                        <span
                          style={{
                            background:
                              "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            color: "#ffffff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {ville.region?.name || ville.Region?.name || "Non défini"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => handleDelete(ville.id)}
                          disabled={deletingId === ville.id}
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
                          }}
                        >
                          {deletingId === ville.id ? "⏳" : "🗑️ Supprimer"}
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
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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

export default Ville;