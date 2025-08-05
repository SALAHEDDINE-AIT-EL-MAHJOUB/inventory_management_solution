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

      console.log("=== ENVOI REQUÊTE ===");
      console.log("URL:", "/api/AdminClient/CreateClientFromAdmin");
      console.log("Données:", requestData);

      const response = await axios.post("/api/AdminClient/CreateClientFromAdmin", requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      console.log("=== RÉPONSE RÉUSSIE ===");
      console.log("Données:", response.data);
      
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
      console.log("=== ERREUR COMPLÈTE ===");
      console.log("Erreur:", err);
      console.log("Response:", err.response);
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);
      
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
    <div className="create-client-container">
      <form className="create-client-form" onSubmit={handleSubmit}>
        <h3>Créer un nouveau client</h3>
        
        {message && <div className="form-message success">{message}</div>}
        {error && <div className="form-message error">{error}</div>}
        
        <div className="form-group">
          <label>Nom du client *</label>
          <input
            type="text"
            name="clientNom"
            placeholder="Nom du client"
            value={form.clientNom}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Nom d'utilisateur *</label>
          <input
            type="text"
            name="userName"
            placeholder="Nom d'utilisateur"
            value={form.userName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="email@exemple.com"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Mot de passe *</label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 caractères"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Adresse</label>
          <input
            type="text"
            name="adress"
            placeholder="Adresse"
            value={form.adress}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Création en cours..." : "Créer le client"}
        </button>
      </form>
    </div>
  );
};

export default CreateClientForm;