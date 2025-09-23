import React, { useEffect, useState } from "react";
import axios from "axios";

const GestionInventaire = () => {
  const [tableau, setTableau] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventaires, setInventaires] = useState([]);
  const [operateurs, setOperateurs] = useState([]);
  const [showSelect, setShowSelect] = useState(null);
  const [selectedInventaire, setSelectedInventaire] = useState({});
  const [operateurId, setOperateurId] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tableauRes, inventairesRes, operateursRes] = await Promise.all([
        axios.get("/api/gestioninventaire/tableau"),
        axios.get("/api/inventaire"),
        axios.get("/api/operateur")
      ]);
      
      setTableau(tableauRes.data);
      setInventaires(inventairesRes.data);
      setOperateurs(operateursRes.data);
    } catch (error) {
      setMessage("Erreur lors du chargement des données");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDoubleSaisieClick = (idx) => {
    setShowSelect(idx);
    setMessage("");
    setMessageType("");
  };

  const handleInventaireChange = (idx, value) => {
    setSelectedInventaire({ ...selectedInventaire, [idx]: value });
  };

  const handleOperateurChange = (idx, value) => {
    setOperateurId({ ...operateurId, [idx]: value });
  };

  const handleValiderDoubleSaisie = async (row, idx) => {
    const operateurVerificateurId = operateurId[idx];
    const gestionInventaireId = row.Id || row.id;
    
    if (!gestionInventaireId) {
      setMessage("Erreur : ID de la ligne gestion inventaire introuvable.");
      setMessageType("error");
      return;
    }
    if (!operateurVerificateurId) {
      setMessage("Veuillez choisir un opérateur vérificateur.");
      setMessageType("error");
      return;
    }
    
    try {
      await axios.post(
        `/api/gestioninventaire/declencher-double-saisie?gestionInventaireId=${gestionInventaireId}&quantiteReference=${row.QuantiteInventaire || row.quantiteInventaire}&operateurVerificateurId=${operateurVerificateurId}`
      );
      setMessage("Double saisie déclenchée avec succès.");
      setMessageType("success");
      setShowSelect(null);
      
      // Auto-hide message
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (e) {
      setMessage("Erreur lors de la double saisie.");
      setMessageType("error");
    }
  };

  const getDecalageColor = (decalage) => {
    if (decalage === 0) return "#22c55e"; // Vert
    if (Math.abs(decalage) <= 5) return "#f59e0b"; // Orange
    return "#ef4444"; // Rouge
  };

  const getStatutBadge = (statut) => {
    const statutLower = (statut || "").toLowerCase();
    let bgColor = "#64748b";
    
    if (statutLower.includes("terminé") || statutLower.includes("complete")) bgColor = "#22c55e";
    else if (statutLower.includes("en cours") || statutLower.includes("progress")) bgColor = "#3b82f6";
    else if (statutLower.includes("en attente") || statutLower.includes("pending")) bgColor = "#f59e0b";
    
    return {
      background: bgColor,
      color: "#ffffff",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      display: "inline-block"
    };
  };

  // Pagination helpers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableau.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableau.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableHeaders = [
    { icon: "fas fa-clipboard-list", label: "Inventaire" },
    { icon: "fas fa-box", label: "Produit" },
    { icon: "fas fa-cubes", label: "Qté Produit" },
    { icon: "fas fa-clipboard-check", label: "Qté Inventaire" },
    { icon: "fas fa-exclamation-triangle", label: "Décalage" },
    { icon: "fas fa-copy", label: "Qté Double" },
    { icon: "fas fa-user-check", label: "Opérateur Double" },
    { icon: "fas fa-tags", label: "Statut" },
    { icon: "fas fa-cogs", label: "Actions" }
  ];

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
        Chargement des inventaires...
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px"
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
            <i className="fas fa-clipboard-list" style={{ color: "#667eea" }}></i>
            Gestion des Inventaires
          </h2>
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
            {tableau.length} éléments
          </div>
        </div>

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

        {tableau.length === 0 ? (
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
            <i className="fas fa-clipboard-list" style={{ fontSize: "48px", color: "#94a3b8" }}></i>
            <div style={{ fontSize: "18px" }}>Aucun inventaire trouvé</div>
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
                        fontSize: "14px",
                        whiteSpace: "nowrap"
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
                  {currentItems.map((row, idx) => {
                    const actualIdx = indexOfFirstItem + idx;
                    const decalage = Number(row.QuantiteProduit ?? row.quantiteProduit ?? 0) -
                                   Number(row.QuantiteInventaire ?? row.quantiteInventaire ?? 0);
                    
                    return (
                      <tr
                        key={actualIdx}
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
                          {row.InventaireNom || row.inventaireNom}
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b"
                        }}>
                          {row.ProduitNom || row.produitNom}
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b",
                          textAlign: "center"
                        }}>
                          <span style={{
                            background: "#f1f5f9",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontWeight: "600"
                          }}>
                            {row.QuantiteProduit || row.quantiteProduit}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b",
                          textAlign: "center"
                        }}>
                          <span style={{
                            background: "#e0f2fe",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontWeight: "600"
                          }}>
                            {row.QuantiteInventaire || row.quantiteInventaire}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          textAlign: "center"
                        }}>
                          <span style={{
                            background: getDecalageColor(decalage),
                            color: "#ffffff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {decalage > 0 ? `+${decalage}` : decalage}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b",
                          textAlign: "center"
                        }}>
                          {row.QuantiteInventaireDouble ?? row.quantiteInventaireDouble ? (
                            <span style={{
                              background: "#dcfce7",
                              color: "#166534",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontWeight: "600"
                            }}>
                              {row.QuantiteInventaireDouble ?? row.quantiteInventaireDouble}
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8", fontStyle: "italic" }}>
                              Non défini
                            </span>
                          )}
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b"
                        }}>
                          {row.OperateurDoubleNom ?? row.operateurDoubleNom ? (
                            <span style={{
                              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                              color: "#ffffff",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600"
                            }}>
                              {row.OperateurDoubleNom ?? row.operateurDoubleNom}
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8", fontStyle: "italic" }}>
                              Non assigné
                            </span>
                          )}
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0"
                        }}>
                          <span style={getStatutBadge(row.Statut || row.statut)}>
                            {row.Statut || row.statut || "Non défini"}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0"
                        }}>
                          {showSelect === actualIdx ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <select
                                value={operateurId[actualIdx] || ""}
                                onChange={e => handleOperateurChange(actualIdx, e.target.value)}
                                style={{
                                  padding: "8px 12px",
                                  border: "2px solid #e2e8f0",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  minWidth: "150px"
                                }}
                              >
                                <option value="">Choisir un opérateur</option>
                                {operateurs.map(op => (
                                  <option key={op.id || op.Id} value={op.id || op.Id}>
                                    {op.nom || op.Nom} {op.prenom || op.Prenom}
                                  </option>
                                ))}
                              </select>
                              <div style={{ display: "flex", gap: "4px" }}>
                                <button
                                  onClick={() => handleValiderDoubleSaisie(row, actualIdx)}
                                  style={{
                                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                  }}
                                >
                                  <i className="fas fa-check"></i> Valider
                                </button>
                                <button
                                  onClick={() => setShowSelect(null)}
                                  style={{
                                    background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                  }}
                                >
                                  <i className="fas fa-times"></i> Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDoubleSaisieClick(actualIdx)}
                              style={{
                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px",
                                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                            >
                              <i className="fas fa-copy"></i> Double saisie
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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

export default GestionInventaire;