import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/Produit";
const FOURNISSEUR_URL = "/api/Fournisseur";

function ListProduit() {
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProduit, setEditProduit] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Charger les produits et fournisseurs
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [produitsRes, fournisseursRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(FOURNISSEUR_URL)
      ]);
      setProduits(produitsRes.data);
      setFournisseurs(fournisseursRes.data);
    } catch (error) {
      setMessage("Erreur lors du chargement des données");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produit) => {
    setEditId(getProduitId(produit));
    setEditProduit({ ...produit });
  };

  const handleChange = (e) => {
    setEditProduit({ ...editProduit, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        Nom: editProduit.nom ?? editProduit.Nom,
        CodeBarre: editProduit.codeBarre ?? editProduit.CodeBarre,
        Prix: Number(editProduit.prix ?? editProduit.Prix),
        Quantite: Number(editProduit.quantite ?? editProduit.Quantite),
        FournisseurId: Number(editProduit.fournisseurId ?? editProduit.FournisseurId),
        SocieteId: editProduit.societeId ?? editProduit.SocieteId ?? 1,
        SiteId: editProduit.siteId ?? editProduit.SiteId ?? 1,
        ZoneId: editProduit.zoneId ?? editProduit.ZoneId ?? 1,
        AlleeId: editProduit.alleeId ?? editProduit.AlleeId ?? 1,
        RangeeId: editProduit.rangeeId ?? editProduit.RangeeId ?? 1,
        EtageId: editProduit.etageId ?? editProduit.EtageId ?? 1,
      };
      await axios.put(`${API_URL}/${editId}`, payload);
      const res = await axios.get(API_URL);
      setProduits(res.data);
      setEditId(null);
      setMessage("Produit modifié avec succès !");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      setMessage("Erreur lors de la modification");
      setMessageType("error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProduits(produits.filter(p => getProduitId(p) !== id));
      setMessage("Produit supprimé avec succès !");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (err) {
      console.error("Erreur suppression:", err);
      setMessage("Erreur lors de la suppression");
      setMessageType("error");
    }
  };

  const getFournisseurNom = (fournisseurId) => {
    const f = fournisseurs.find(f => f.fournisseurId === fournisseurId);
    return f ? f.nom : "Non défini";
  };

  const getProduitId = (produit) => produit.id ?? produit.produitId;

  // Pagination helpers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = produits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(produits.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableHeaders = [
    { icon: "fas fa-tag", label: "Nom" },
    { icon: "fas fa-barcode", label: "Code Barre" },
    { icon: "fas fa-euro-sign", label: "Prix" },
    { icon: "fas fa-cubes", label: "Quantité" },
    { icon: "fas fa-truck", label: "Fournisseur" },
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
        Chargement des produits...
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
            <i className="fas fa-box" style={{ color: "#667eea" }}></i>
            Liste des produits
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
            {produits.length} produits
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

        {produits.length === 0 ? (
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
            <i className="fas fa-box" style={{ fontSize: "48px", color: "#94a3b8" }}></i>
            <div style={{ fontSize: "18px" }}>Aucun produit trouvé</div>
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
                  {currentItems.map((produit, idx) =>
                    editId === getProduitId(produit) ? (
                      <tr key={getProduitId(produit)} style={{
                        background: "#f0f9ff",
                        borderLeft: "4px solid #667eea"
                      }}>   
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <input 
                            name="nom" 
                            value={editProduit.nom || ""} 
                            onChange={handleChange}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px"
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <input 
                            name="codeBarre" 
                            value={editProduit.codeBarre || ""} 
                            onChange={handleChange}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px"
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <input 
                            name="prix" 
                            type="number" 
                            value={editProduit.prix || ""} 
                            onChange={handleChange}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px"
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <input 
                            name="quantite" 
                            type="number" 
                            value={editProduit.quantite || ""} 
                            onChange={handleChange}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px"
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <select 
                            name="fournisseurId" 
                            value={editProduit.fournisseurId || ""} 
                            onChange={handleChange}
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "6px",
                              fontSize: "14px"
                            }}
                          >
                            <option value="">--Choisir--</option>
                            {fournisseurs.map(f => (
                              <option key={f.fournisseurId} value={f.fournisseurId}>{f.nom}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button 
                              onClick={handleSave}
                              style={{
                                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                            >
                              <i className="fas fa-check"></i>Enregistrer
                            </button>
                            <button 
                              onClick={() => setEditId(null)}
                              style={{
                                background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                            >
                              <i className="fas fa-times"></i>Annuler
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr 
                        key={getProduitId(produit)}
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
                          {produit.nom}
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b"
                        }}>
                          <span style={{
                            background: "#f1f5f9",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontFamily: "monospace",
                            fontSize: "12px"
                          }}>
                            {produit.codeBarre}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b"
                        }}>
                          <span style={{
                            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                            color: "#ffffff",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {produit.prix} €
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
                            color: "#0369a1",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {produit.quantite}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#64748b"
                        }}>
                          <span style={{
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                            color: "#ffffff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                          }}>
                            {getFournisseurNom(produit.fournisseurId)}
                          </span>
                        </td>
                        <td style={{
                          padding: "12px",
                          borderBottom: "1px solid #e2e8f0"
                        }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button 
                              onClick={() => handleEdit(produit)}
                              style={{
                                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                              title="Modifier"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => handleDelete(getProduitId(produit))}
                              style={{
                                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 12px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                              title="Supprimer"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
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
}

export default ListProduit;