import React, { useState } from "react";
import "./ClientLogin.css";

const ClientLogin = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ClientAuth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          rememberMe: form.rememberMe
        }),
      });

      if (response.ok) {
        const clientData = await response.json();
        
        // Stocker les informations du client dans le localStorage
        localStorage.setItem("clientInfo", JSON.stringify(clientData));
        
        setMessage("Connexion réussie !");
        
        // Appeler la fonction de callback pour notifier le parent
        if (onLoginSuccess) {
          onLoginSuccess(clientData);
        }
      } else {
        const errorText = await response.text();
        setMessage(errorText || "Erreur de connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="client-login-container">
      <form className="client-login-form" onSubmit={handleSubmit}>
        <h2>Connexion Client</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Entrez votre email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
            />
            Se souvenir de moi
          </label>
        </div>

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <div className={`message ${message.includes("réussie") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ClientLogin;
