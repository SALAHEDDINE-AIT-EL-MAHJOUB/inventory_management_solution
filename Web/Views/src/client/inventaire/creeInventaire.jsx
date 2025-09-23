import React, { useEffect, useState } from "react";

const CreeInventaire = () => {
  const [inventaires, setInventaires] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [types, setTypes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchInventaires(),
        fetchStatuts(),
        fetchTypes(),
        fetchProduits()
      ]);
    } catch (error) {
      setMessage("Erreur lors du chargement des données");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchInventaires = async () => {
    const res = await fetch("/api/inventaire");
    const data = await res.json();
    setInventaires(data);
  };

  const fetchStatuts = async () => {
    const res = await fetch("/api/statut");
    const data = await res.json();
    setStatuts(data);
  };

  const fetchTypes = async () => {
    const res = await fetch("/api/typeinventaire");
    const data = await res.json();
    setTypes(data);
  };

  const fetchProduits = async () => {
    const res = await fetch("/api/produit");
    const data = await res.json();
    setProduits(data);
  };

  const handleEdit = (inv) => {
    setEditRow(inv.inventaireId);
    setEditValues({
      statutId: inv.inventaireStatut?.statutId || "",
      typeInventaireId: inv.inventaireTypeInventaire?.typeInventaireId || "",
      produitId: inv.produit?.id || ""
    });
  };

  const handleCancel = () => {
    setEditRow(null);
    setEditValues({});
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      const promises = [];
      
      if (editValues.statutId) {
        promises.push(
          fetch(`/api/inventaire/${id}/statut`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ statutId: editValues.statutId }),
          })
        );
      }
      
      if (editValues.typeInventaireId) {
        promises.push(
          fetch(`/api/inventaire/${id}/type`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ typeInventaireId: editValues.typeInventaireId }),
          })
        );
      }
      
      if (editValues.produitId) {
        promises.push(
          fetch(`/api/inventaire/${id}/produit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ produitId: editValues.produitId }),
          })
        );
      }

      await Promise.all(promises);
      
      setEditRow(null);
      setEditValues({});
      setMessage("Inventaire mis à jour avec succès!");
      setMessageType("success");
      
      // Auto-hide message
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      
      fetchInventaires();
    } catch (error) {
      setMessage("Erreur lors de la mise à jour");
      setMessageType("error");
    }
  };

  const getStatutBadge = (statut) => {
    if (!statut) return { background: "#64748b", color: "#ffffff" };
    
    const statutLower = (statut.statutLibelle || statut.statutNom || "").toLowerCase();
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

  const getTypeBadge = (type) => {
    if (!type) return { background: "#64748b", color: "#ffffff" };
    
    return {
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
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
  const currentItems = inventaires.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventaires.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
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

  // Header definition using icons (FontAwesome)
  const tableHeaders = [
    { key: "id", icon: "fas fa-id-badge", label: "ID" },
    { key: "libelle", icon: "fas fa-file-alt", label: "Libellé" },
    { key: "statut", icon: "fas fa-tags", label: "Statut" },
    { key: "type", icon: "fas fa-list-alt", label: "Type" },
    { key: "produit", icon: "fas fa-box", label: "Produit" },
    { key: "actions", icon: "fas fa-cogs", label: "Actions" }
  ];

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        maxWidth: "1200px",
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
            Liste des Inventaires
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
            {inventaires.length} inventaires
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

        {inventaires.length === 0 ? (
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
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)"
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
                    {tableHeaders.map(h => (
                      <th key={h.key} style={{
                        padding: "16px 12px",
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "left",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <i className={h.icon}></i>
                          {h.label}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((inv, idx) => (
                    <tr
                      key={inv.inventaireId}
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
                        color: "#334155"
                      }}>
                        <span style={{
                          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}>
                          #{inv.inventaireId}
                        </span>
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#334155",
                        fontWeight: "600"
                      }}>
                        {inv.inventaireLibelle}
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        {editRow === inv.inventaireId ? (
                          <select
                            value={editValues.statutId}
                            onChange={e => handleChange("statutId", e.target.value)}
                            style={{
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px",
                              minWidth: "150px"
                            }}
                          >
                            <option value="">Choisir un statut</option>
                            {statuts.map(s => (
                              <option key={s.statutId} value={s.statutId}>
                                {s.statutLibelle || s.statutNom}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span style={getStatutBadge(inv.inventaireStatut)}>
                            {inv.inventaireStatut?.statutLibelle || inv.inventaireStatut?.statutNom || "Non défini"}
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        {editRow === inv.inventaireId ? (
                          <select
                            value={editValues.typeInventaireId}
                            onChange={e => handleChange("typeInventaireId", e.target.value)}
                            style={{
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px",
                              minWidth: "150px"
                            }}
                          >
                            <option value="">Choisir un type</option>
                            {types.map(t => (
                              <option key={t.typeInventaireId} value={t.typeInventaireId}>
                                {t.typeInventaireLibelle}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span style={getTypeBadge(inv.inventaireTypeInventaire)}>
                            {inv.inventaireTypeInventaire?.typeInventaireLibelle || "Non défini"}
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0",
                        color: "#64748b"
                      }}>
                        {editRow === inv.inventaireId ? (
                          <select
                            value={editValues.produitId}
                            onChange={e => handleChange("produitId", e.target.value)}
                            style={{
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px",
                              minWidth: "150px"
                            }}
                          >
                            <option value="">Choisir un produit</option>
                            {produits.map(p => (
                              <option key={p.id || p.Id} value={p.id || p.Id}>
                                {p.nom || p.Nom}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span style={{
                            background: "#dcfce7",
                            color: "#166534",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {inv.produit?.nom || "Aucun produit"}
                          </span>
                        )}
                      </td>
                      <td style={{
                        padding: "12px",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        {editRow === inv.inventaireId ? (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleSave(inv.inventaireId)}
                              style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px"
                              }}
                            >
                              <i className="fas fa-check" style={{ marginRight: 8 }}></i>Enregistrer
                            </button>
                            <button
                              onClick={handleCancel}
                              style={{
                                background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px"
                              }}
                            >
                              <i className="fas fa-times" style={{ marginRight: 8 }}></i>Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(inv)}
                            style={{
                              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "8px 16px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px",
                              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
                            }}
                          >
                            <i className="fas fa-edit" style={{ marginRight: 8 }}></i>Modifier
                          </button>
                        )}
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
                    opacity: currentPage === 1 ? 0.5 : 1
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
                    opacity: currentPage === totalPages ? 0.5 : 1
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

export default CreeInventaire;