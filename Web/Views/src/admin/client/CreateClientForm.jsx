import React, { useState } from "react";
import axios from "axios";
import "./CreateClientForm.css";

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
        headers: {
          'Content-Type': 'application/json',
        },
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
        if (typeof err.response.data === 'string') {
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
    <div className="create-client-container improved-bg">
      <form className="create-client-form improved-form" onSubmit={handleSubmit}>
        <div className="form-header">
        
          <h3 style={{
            color: "#1976d2",
            fontWeight: 700,
            fontSize: "1.3rem",
            margin: 0,
            letterSpacing: "0.5px"
          }}>
            Créer un nouveau client
          </h3>
        </div>

        {message && <div className="form-message success">{message}</div>}
        {error && <div className="form-message error">{error}</div>}

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-id-card" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Nom du client *
          </label>
          <input
            type="text"
            name="clientNom"
            placeholder="Nom du client"
            value={form.clientNom}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-user" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Nom d'utilisateur *
          </label>
          <input
            type="text"
            name="userName"
            placeholder="Nom d'utilisateur"
            value={form.userName}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-envelope" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Email *
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@exemple.com"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-lock" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Mot de passe *
          </label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 caractères"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-map-marker-alt" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Adresse
          </label>
          <input
            type="text"
            name="adress"
            placeholder="Adresse"
            value={form.adress}
            onChange={handleChange}
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#1976d2", fontWeight: 600 }}>
            <i className="fas fa-phone" style={{ color: "#42a5f5", marginRight: 8 }}></i>
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            style={{
              border: "1px solid #bbdefb",
              background: "#f5f7fa",
              color: "#1976d2"
            }}
          />
        </div>

        <button type="submit" className="submit-button improved-btn" disabled={loading}>
          {loading ? "Création en cours..." : "Créer le client"}
        </button>
      </form>
    </div>
  );
};

export default CreateClientForm;