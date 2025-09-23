import React, { useEffect, useState } from "react";
import axios from "axios";

const ListEquipe = ({ onAddEquipe, onEditEquipe, refresh }) => {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("/api/Equipe")
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then(data => setEquipes(data))
      .catch(() => setError("Impossible de charger les équipes"))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette équipe ?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/Equipe/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setEquipes(equipes.filter(eq => eq.equipeId !== id));
      setMessage("Équipe supprimée avec succès !");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch {
      setMessage("Erreur lors de la suppression");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Pagination helpers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = equipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(equipes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        fontSize: "18px",
        color: "#64748b"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #667eea",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginRight: "16px"
        }}></div>
        Chargement des équipes...
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: "center",
        padding: "40px",
        color: "#ef4444",
        background: "#fef2f2",
        borderRadius: "12px",
        border: "1px solid #fecaca",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: "48px", color: "#ef4444" }}></i>
        <div style={{ fontSize: "18px" }}>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <i className="fas fa-redo"></i>
          Réessayer
        </button>
      </div>
    );
  }

  const tableHeaders = [
    { icon: "fas fa-id-badge", label: "ID" },
    { icon: "fas fa-users", label: "Nom" },
    { icon: "fas fa-file-alt", label: "Description" },
    { icon: "fas fa-building", label: "Site" },
    { icon: "fas fa-user-friends", label: "Membres" },
    { icon: "fas fa-cogs", label: "Actions" }
  ];

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <h2 style={{
            color: "#1e293b",
            margin: 0,
            fontSize: "28px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <i className="fas fa-users" style={{ color: "#667eea" }}></i>
            Gestion des Équipes
          </h2>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <i className="fas fa-database"></i>
              {equipes.length} équipes
            </div>
            
            <button
              onClick={onAddEquipe}
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
            >
              <i className="fas fa-plus"></i>
              Ajouter une équipe
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div style={{
            marginBottom: "20px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: messageType === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${messageType === "success" ? "#bbf7d0" : "#fecaca"}`,
            color: messageType === "success" ? "#166534" : "#dc2626",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            <i className={`fas ${messageType === "success" ? "fa-check-circle" : "fa-exclamation-triangle"}`}></i>
            {message}
          </div>
        )}

        {/* Liste des équipes */}
        {equipes.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px",
            color: "#64748b",
            background: "#f1f5f9",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px"
          }}>
            <i className="fas fa-users" style={{ fontSize: "48px", color: "#94a3b8" }}></i>
            <div style={{ fontSize: "18px" }}>Aucune équipe trouvée</div>
            <button
              onClick={onAddEquipe}
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px"
              }}
            >
              <i className="fas fa-plus"></i>
              Créer la première équipe
            </button>
          </div>
        ) : (
          <>
            <div style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#ffffff",
                fontSize: "14px"
              }}>
                <thead>
                  <tr style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  }}>
                    {tableHeaders.map(header => (
                      <th key={header.label} style={{
                        padding: "16px 12px",
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "left",
                        fontSize: "14px"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className={header.icon}></i>
                          {header.label}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((eq, idx) => (
                    <tr
                      key={eq.equipeId}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                        transition: "all 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#e0f2fe"}
                      onMouseOut={(e) => e.currentTarget.style.background = idx % 2 === 0 ? "#ffffff" : "#f8fafc"}
                    >
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#334155",
                        fontWeight: "600"
                      }}>
                        <span style={{
                          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}>
                          #{eq.equipeId}
                        </span>
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#334155",
                        fontWeight: "600"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className="fas fa-users" style={{ color: "#667eea", fontSize: "14px" }}></i>
                          {eq.nom}
                        </div>
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#64748b",
                        maxWidth: "200px"
                      }}>
                        <div style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }} title={eq.description}>
                          {eq.description || <span style={{ color: "#94a3b8", fontStyle: "italic" }}>Aucune description</span>}
                        </div>
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#64748b"
                      }}>
                        <span style={{
                          background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}>
                          <i className="fas fa-building" style={{ fontSize: "10px" }}></i>
                          Site #{eq.siteId}
                        </span>
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#64748b"
                      }}>
                        {eq.membres && eq.membres.length > 0 ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <i className="fas fa-user-friends" style={{ color: "#22c55e", fontSize: "14px" }}></i>
                            <span style={{
                              background: "#f0fdf4",
                              color: "#166534",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              {eq.membres.length} membre{eq.membres.length > 1 ? 's' : ''}
                            </span>
                          </div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <i className="fas fa-user-slash" style={{ color: "#94a3b8", fontSize: "14px" }}></i>
                            <span style={{
                              color: "#94a3b8",
                              fontStyle: "italic",
                              fontSize: "12px"
                            }}>
                              Aucun membre
                            </span>
                          </div>
                        )}
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => onEditEquipe(eq)}
                            style={{
                              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "8px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "transform 0.2s"
                            }}
                            onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
                            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                            title="Modifier l'équipe"
                          >
                            <i className="fas fa-edit"></i>
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(eq.equipeId)}
                            style={{
                              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "8px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "transform 0.2s"
                            }}
                            onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
                            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                            title="Supprimer l'équipe"
                          >
                            <i className="fas fa-trash"></i>
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "24px",
                gap: "8px"
              }}>
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
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className="fas fa-chevron-left"></i>
                  Précédent
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    style={{
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "8px",
                      background: currentPage === idx + 1
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "#ffffff",
                      color: currentPage === idx + 1 ? "#ffffff" : "#64748b",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: currentPage === idx + 1
                        ? "0 4px 15px rgba(102, 126, 234, 0.3)"
                        : "none"
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
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  Suivant
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListEquipe;