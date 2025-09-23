import React, { useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const CreateClientForm = ({ adminUserId, onClientCreated }) => {
  const [form, setForm] = useState({
    email: "",
    adress: "",
    phone: "",
    clientNom: "",
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (message) setMessage("");
  };

  const validateForm = () => {
    const errors = [];
    if (!form.clientNom.trim()) errors.push("Nom du client requis");
    if (!form.userName.trim()) errors.push("Nom d'utilisateur requis");
    if (!form.email.trim()) errors.push("Email requis");
    if (!form.password.trim()) errors.push("Mot de passe requis");
    if (form.password.length < 6) errors.push("Mot de passe trop court");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      errors.push("Format d'email invalide");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        AdminUserId: adminUserId || "",
        Email: form.email.trim(),
        Adress: form.adress.trim(),
        Phone: form.phone.trim(),
        ClientNom: form.clientNom.trim(),
        UserName: form.userName.trim(),
        Password: form.password,
        IsActive: true,
      };

      const response = await axios.post("/api/AdminClient/CreateClientFromAdmin", requestData, {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      });

      setMessage("Client créé avec succès !");
      setForm({
        email: "",
        adress: "",
        phone: "",
        clientNom: "",
        userName: "",
        password: "",
      });

      if (onClientCreated) onClientCreated(response.data);
    } catch (err) {
      let errorMessage = "Erreur inconnue";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: "520px", margin: "40px auto" }}>
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1976d2",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            zIndex: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 36, color: "#fff" }} />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            padding: "60px 32px 32px",
            borderRadius: "12px",
            boxShadow: "0 6px 24px rgba(25, 118, 210, 0.08)",
            background: "#fff",
            position: "relative",
            zIndex: 1,
            border: "1px solid #e6eef8",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: 20,
              color: "#1976d2",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "0.3px",
            }}
          >
            Créer un nouveau client
          </h2>

          {message && (
            <div
              style={{
                marginBottom: 14,
                padding: "10px",
                borderRadius: 8,
                backgroundColor: "#e6f4ea",
                color: "#2e7d32",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          )}

          {error && (
            <div
              style={{
                marginBottom: 14,
                padding: "10px",
                borderRadius: 8,
                backgroundColor: "#ffebee",
                color: "#b71c1c",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PersonIcon sx={{ color: "#1976d2" }} /> Nom du client
              </span>
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <PersonIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                name="clientNom"
                value={form.clientNom}
                onChange={handleChange}
                placeholder="Nom du client"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 15,
                  backgroundColor: "#fbfdff",
                }}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <AccountCircleIcon sx={{ color: "#1976d2" }} /> Nom d'utilisateur
                </span>
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1976d2",
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 18 }} />
                </span>
                <input
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="Nom d'utilisateur"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    borderRadius: 8,
                    border: "1px solid #bbdefb",
                    fontSize: 15,
                    backgroundColor: "#fbfdff",
                  }}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <EmailIcon sx={{ color: "#1976d2" }} /> Email
                </span>
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1976d2",
                  }}
                >
                  <EmailIcon sx={{ fontSize: 18 }} />
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@exemple.com"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    borderRadius: 8,
                    border: "1px solid #bbdefb",
                    fontSize: 15,
                    backgroundColor: "#fbfdff",
                  }}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <LockIcon sx={{ color: "#1976d2" }} /> Mot de passe
                </span>
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1976d2",
                  }}
                >
                  <LockIcon sx={{ fontSize: 18 }} />
                </span>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 caractères"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    borderRadius: 8,
                    border: "1px solid #bbdefb",
                    fontSize: 15,
                    backgroundColor: "#fbfdff",
                  }}
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PhoneIcon sx={{ color: "#1976d2" }} /> Téléphone
                </span>
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#1976d2",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 18 }} />
                </span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    borderRadius: 8,
                    border: "1px solid #bbdefb",
                    fontSize: 15,
                    backgroundColor: "#fbfdff",
                  }}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 600, color: "#1976d2" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LocationOnIcon sx={{ color: "#1976d2" }} /> Adresse
              </span>
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <LocationOnIcon sx={{ fontSize: 18 }} />
              </span>
              <input
                name="adress"
                value={form.adress}
                onChange={handleChange}
                placeholder="Adresse"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 15,
                  backgroundColor: "#fbfdff",
                }}
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(25,118,210,0.12)",
              transition: "all 0.18s",
            }}
            disabled={loading}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Création en cours..." : "Créer le client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClientForm;