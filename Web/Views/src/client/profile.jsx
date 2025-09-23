import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ profile: externalProfile, setProfile: setExternalProfile }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ clientNom: "", phone: "", adress: "", email: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Fonction pour charger le profil depuis le localStorage ou props
  const loadProfile = (cb) => {
    // Priorité aux props passées depuis le dashboard
    if (externalProfile && (externalProfile.clientNom || externalProfile.ClientNom)) {
      const normalizedProfile = normalizeClient(externalProfile);
      setProfile(normalizedProfile);
      setForm(normalizedProfile);
      setLoading(false);
      if (cb) cb();
      return;
    }

    // Sinon, charger depuis localStorage
    const savedClientInfo = localStorage.getItem("clientInfo");
    if (savedClientInfo) {
      try {
        const parsed = JSON.parse(savedClientInfo);
        const clientData = parsed.Client || parsed.client;
        if (clientData) {
          const normalizedProfile = normalizeClient(clientData);
          setProfile(normalizedProfile);
          setForm(normalizedProfile);
          setLoading(false);
          if (cb) cb();
          return;
        }
      } catch (e) {
        // JSON mal formé
      }
    }
    // Si pas de données, on met à jour l'état pour afficher "inconnu"
    setProfile({});
    setForm({ clientNom: "", phone: "", adress: "", email: "" });
    setLoading(false);
    if (cb) cb();
  };

  // Convertit les propriétés de l'API en camelCase pour le front
  function normalizeClient(apiClient) {
    if (!apiClient) return {};
    return {
      clientNom: apiClient.ClientNom || apiClient.clientNom || "",
      phone: apiClient.Phone || apiClient.phone || "",
      adress: apiClient.Adress || apiClient.adress || "",
      email: apiClient.Email || apiClient.email || "",
    };
  }

  useEffect(() => {
    loadProfile();
  }, [externalProfile]); // Recharger quand les props changent

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      clientNom: profile.clientNom || "",
      phone: profile.phone || "",
      adress: profile.adress || "",
      email: profile.email || "",
    });
    setMessage("");
    setMessageType("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const updateData = {
        Email: form.email,
        ClientNom: form.clientNom,
        Phone: form.phone,
        Adress: form.adress,
      };
      const res = await axios.put("/api/Profil/update", updateData);
      if (res.data && res.data.Client) {
        // Mise à jour du localStorage
        const savedClientInfo = localStorage.getItem("clientInfo");
        let parsed = {};
        if (savedClientInfo) {
          parsed = JSON.parse(savedClientInfo);
        }
        parsed.Client = res.data.Client;
        localStorage.setItem("clientInfo", JSON.stringify(parsed));
        window.dispatchEvent(new Event("clientInfoUpdated"));

        const updatedProfile = normalizeClient(res.data.Client);
        setProfile(updatedProfile);
        
        // Mettre à jour le profil dans le dashboard parent
        if (setExternalProfile) {
          setExternalProfile(res.data.Client);
        }

        setMessage("Profil mis à jour avec succès !");
        setMessageType("success");
        setIsEditing(false);
        setLoading(false);
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);

        return;
      }
    } catch (err) {
      setMessage("Erreur lors de la mise à jour du profil");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    }
    setLoading(false);
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
        ⏳ Chargement du profil...
      </div>
    );
  }

  // Avatar: première lettre du nom ou "?"
  const avatarLetter = isEditing
    ? (form.clientNom ? form.clientNom.charAt(0).toUpperCase() : "?")
    : (profile.clientNom ? profile.clientNom.charAt(0).toUpperCase() : "?");

  return (
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        overflow: "hidden"
      }}>
        {/* Header avec gradient */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "40px 32px",
          textAlign: "center",
          color: "white"
        }}>
          {/* Avatar */}
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "bold",
            margin: "0 auto 20px",
            backdropFilter: "blur(10px)",
            border: "4px solid rgba(255, 255, 255, 0.3)"
          }}>
            {avatarLetter}
          </div>
          
          <h2 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "600" }}>
            {isEditing ? form.clientNom || "Nom inconnu" : profile.clientNom || "Nom inconnu"}
          </h2>
          <p style={{ margin: "0", opacity: "0.9", fontSize: "16px" }}>
            {isEditing ? form.email || "Email inconnu" : profile.email || "Email inconnu"}
          </p>
        </div>

        {/* Contenu principal */}
        <div style={{ padding: "32px" }}>
          {message && (
            <div style={{
              marginBottom: "24px",
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

          {!isEditing ? (
            <div>
              {/* Informations en lecture seule */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "32px"
              }}>
                <div style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    <i className="fas fa-user"></i>
                    Nom complet
                  </div>
                  <div style={{ fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                    {profile.clientNom || "Non renseigné"}
                  </div>
                </div>

                <div style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    <i className="fas fa-envelope"></i>
                    Email
                  </div>
                  <div style={{ fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                    {profile.email || "Non renseigné"}
                  </div>
                </div>

                <div style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    <i className="fas fa-phone"></i>
                    Téléphone
                  </div>
                  <div style={{ fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                    {profile.phone || "Non renseigné"}
                  </div>
                </div>

                <div style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#475569",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    <i className="fas fa-map-marker-alt"></i>
                    Adresse
                  </div>
                  <div style={{ fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                    {profile.adress || "Non renseigné"}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  onClick={handleEdit}
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                >
                  <i className="fas fa-edit" style={{ marginRight: "8px" }}></i>
                  Modifier le profil
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
                marginBottom: "32px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>
                    <i className="fas fa-user" style={{ marginRight: "8px", color: "#667eea" }}></i>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="clientNom"
                    value={form.clientNom}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      transition: "border-color 0.3s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>
                    <i className="fas fa-envelope" style={{ marginRight: "8px", color: "#667eea" }}></i>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      transition: "border-color 0.3s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>
                    <i className="fas fa-phone" style={{ marginRight: "8px", color: "#667eea" }}></i>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      transition: "border-color 0.3s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: "8px", color: "#667eea" }}></i>
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adress"
                    value={form.adress}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "14px",
                      transition: "border-color 0.3s ease",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
              </div>

              <div style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap"
              }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
                    opacity: loading ? 0.7 : 1,
                    transition: "all 0.3s ease"
                  }}
                >
                  <i className="fas fa-save" style={{ marginRight: "8px" }}></i>
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  <i className="fas fa-times" style={{ marginRight: "8px" }}></i>
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;