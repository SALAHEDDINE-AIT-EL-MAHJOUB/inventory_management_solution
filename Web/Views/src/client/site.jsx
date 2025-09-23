import React, { useEffect, useState } from "react";
import axios from "axios";

// --- SiteForm ---
const SiteForm = ({ onClose, onSuccess }) => {
  const [villes, setVilles] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [form, setForm] = useState({
    siteNom: "",
    adress: "",
    siteTelephone: "",
    email: "",
    siteVilleId: "",
    societeId: "",
  });
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    axios.get("/api/ville")
      .then(res => setVilles(res.data))
      .catch(() => setVilles([]));
    axios.get("/api/client-societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "siteVilleId" ? { societeId: "" } : {})
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCreating(true);
    setMessage("");
    try {
      const payload = {
        SiteNom: form.siteNom,
        Adress: form.adress,
        SiteTelephone: form.siteTelephone ? parseInt(form.siteTelephone) : null,
        Email: form.email,
        SiteVilleId: form.siteVilleId ? parseInt(form.siteVilleId) : null,
        SocieteId: form.societeId ? parseInt(form.societeId) : null,
      };
      await axios.post("/api/site", payload);
      setMessage("Site créé avec succès !");
      setForm({
        siteNom: "",
        adress: "",
        siteTelephone: "",
        email: "",
        siteVilleId: "",
        societeId: "",
      });
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setMessage("Erreur serveur : " + (err.response?.data || err.message));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)"
    }}>
      <h3 style={{ 
        color: "#334155", 
        marginBottom: "20px", 
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <i className="fas fa-building" style={{ color: "#667eea" }}></i>
        Nouveau site
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginBottom: "20px"
        }}>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-tag" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Nom du site
            </label>
            <input
              type="text"
              name="siteNom"
              value={form.siteNom}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-map-marker-alt" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Adresse
            </label>
            <input
              type="text"
              name="adress"
              value={form.adress}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-phone" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Téléphone
            </label>
            <input
              type="tel"
              name="siteTelephone"
              value={form.siteTelephone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-envelope" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-city" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Ville
            </label>
            <select
              name="siteVilleId"
              value={form.siteVilleId}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            >
              <option value="">Choisir une ville</option>
              {villes.map(v => (
                <option key={v.id} value={v.id}>{v.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600"
            }}>
              <i className="fas fa-industry" style={{ fontSize: "14px", color: "#667eea" }}></i>
              Société
            </label>
            <select
              name="societeId"
              value={form.societeId}
              onChange={handleChange}
              required
              disabled={!form.siteVilleId}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                background: !form.siteVilleId ? "#f1f5f9" : "#fff",
                opacity: !form.siteVilleId ? 0.6 : 1,
                transition: "border-color 0.2s",
                outline: "none"
              }}
              onFocus={(e) => !form.siteVilleId || (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            >
              <option value="">Choisir une société</option>
              {societes.map(s => (
                <option key={s.id} value={s.id}>{s.nom}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
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
              opacity: creating ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => !creating && (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            <i className={`fas ${creating ? "fa-spinner fa-spin" : "fa-check"}`}></i>
            {creating ? "Création..." : "Créer le site"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
              color: "#ffffff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            <i className="fas fa-times"></i>
            Annuler
          </button>
        </div>
        {message && (
          <div style={{
            marginTop: "12px",
            padding: "12px 16px",
            borderRadius: "8px",
            color: message.includes("Erreur") ? "#ef4444" : "#22c55e",
            background: message.includes("Erreur") ? "#fef2f2" : "#f0fdf4",
            border: `1px solid ${message.includes("Erreur") ? "#fecaca" : "#bbf7d0"}`,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <i className={`fas ${message.includes("Erreur") ? "fa-exclamation-triangle" : "fa-check-circle"}`}></i>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

// --- SiteList ---
const SiteList = ({ refreshTrigger }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [message, setMessage] = useState("");
  const [villes, setVilles] = useState([]);
  const [societes, setSocietes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const sitesPerPage = 10;

  useEffect(() => {
    fetchSites();
    fetchRelatedData();
  }, [refreshTrigger]);

  const fetchSites = () => {
    setLoading(true);
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  };

  const fetchRelatedData = () => {
    axios.get("/api/ville")
      .then(res => setVilles(res.data))
      .catch(() => setVilles([]));
    axios.get("/api/client-societes")
      .then(res => setSocietes(res.data))
      .catch(() => setSocietes([]));
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
      setMessage("Site modifié avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Erreur lors de la modification.");
      setTimeout(() => setMessage(""), 3000);
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
      setMessage("Site supprimé avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Erreur lors de la suppression.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const getVilleNom = (id) => {
    const ville = villes.find(v => v.id === id);
    return ville ? ville.nom : `ID: ${id}`;
  };

  const getSocieteNom = (id) => {
    const soc = societes.find(s => s.id === id);
    return soc ? soc.nom : `ID: ${id}`;
  };

  // Pagination helpers
  const indexOfLastSite = currentPage * sitesPerPage;
  const indexOfFirstSite = indexOfLastSite - sitesPerPage;
  const currentSites = sites.slice(indexOfFirstSite, indexOfLastSite);
  const totalPages = Math.ceil(sites.length / sitesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px", 
        color: "#64748b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #667eea",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <div style={{ fontSize: "18px" }}>Chargement...</div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const tableHeaders = [
    { icon: "fas fa-building", label: "Nom" },
    { icon: "fas fa-map-marker-alt", label: "Adresse" },
    { icon: "fas fa-phone", label: "Téléphone" },
    { icon: "fas fa-envelope", label: "Email" },
    { icon: "fas fa-city", label: "Ville" },
    { icon: "fas fa-industry", label: "Société" },
    { icon: "fas fa-cogs", label: "Actions" }
  ];

  return (
    <div>
      {message && (
        <div style={{
          marginBottom: "20px",
          padding: "12px 16px",
          borderRadius: "8px",
          color: message.includes("Erreur") ? "#ef4444" : "#22c55e",
          background: message.includes("Erreur") ? "#fef2f2" : "#f0fdf4",
          border: `1px solid ${message.includes("Erreur") ? "#fecaca" : "#bbf7d0"}`,
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <i className={`fas ${message.includes("Erreur") ? "fa-exclamation-triangle" : "fa-check-circle"}`}></i>
          {message}
        </div>
      )}

      {sites.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#64748b",
          background: "#f1f5f9",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}>
          <i className="fas fa-building" style={{ fontSize: "48px", color: "#94a3b8" }}></i>
          <div style={{ fontSize: "18px" }}>Aucun site trouvé</div>
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
              background: "#ffffff"
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
                {currentSites.map((site, idx) => (
                  <tr
                    key={site.id}
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
                      {editId === site.id ? (
                        <input
                          value={editValues.siteNom}
                          onChange={e => handleEditChange("siteNom", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        />
                      ) : (
                        site.siteNom
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b"
                    }}>
                      {editId === site.id ? (
                        <input
                          value={editValues.adress}
                          onChange={e => handleEditChange("adress", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        />
                      ) : (
                        site.adress
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b"
                    }}>
                      {editId === site.id ? (
                        <input
                          value={editValues.siteTelephone}
                          onChange={e => handleEditChange("siteTelephone", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        />
                      ) : (
                        site.siteTelephone
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b"
                    }}>
                      {editId === site.id ? (
                        <input
                          value={editValues.email}
                          onChange={e => handleEditChange("email", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        />
                      ) : (
                        site.email
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b"
                    }}>
                      {editId === site.id ? (
                        <select
                          value={editValues.siteVilleId}
                          onChange={e => handleEditChange("siteVilleId", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        >
                          <option value="">Choisir une ville</option>
                          {villes.map(v => (
                            <option key={v.id} value={v.id}>{v.nom}</option>
                          ))}
                        </select>
                      ) : (
                        <span style={{
                          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}>
                          {getVilleNom(site.siteVilleId)}
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      color: "#64748b"
                    }}>
                      {editId === site.id ? (
                        <select
                          value={editValues.societeId}
                          onChange={e => handleEditChange("societeId", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "4px"
                          }}
                        >
                          <option value="">Choisir une société</option>
                          {societes.map(s => (
                            <option key={s.id} value={s.id}>{s.nom}</option>
                          ))}
                        </select>
                      ) : (
                        <span style={{
                          background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                          color: "#ffffff",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}>
                          {getSocieteNom(site.societeId)}
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: "12px",
                      borderBottom: "1px solid #e2e8f0",
                      textAlign: "center"
                    }}>
                      {editId === site.id ? (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button
                            onClick={() => handleEditSave(site.id)}
                            style={{
                              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px"
                            }}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            onClick={handleEditCancel}
                            style={{
                              background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px"
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <button
                            onClick={() => handleEdit(site)}
                            style={{
                              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px"
                            }}
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(site.id)}
                            style={{
                              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "12px"
                            }}
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
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
  );
};

// --- Export principal ---
const SitePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleFormSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="emp">
      <div className="card">
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "24px" 
        }}>
          <h2 className="page-title" style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: 0
          }}>
            <i className="fas fa-building" style={{ color: "#667eea" }}></i>
            Gestion des Sites
          </h2>
          <button 
            onClick={handleShowForm} 
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <i className={`fas ${showForm ? "fa-times" : "fa-plus"}`}></i>
            {showForm ? "Fermer" : "Ajouter un site"}
          </button>
        </div>

        {showForm && <SiteForm onClose={handleCloseForm} onSuccess={handleFormSuccess} />}
        
        <SiteList refreshTrigger={refreshTrigger} />
       </div>
    </div>
  );
};

export default SitePage;