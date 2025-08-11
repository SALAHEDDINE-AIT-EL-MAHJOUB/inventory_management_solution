import React, { useState } from "react";

export default function Login({ onLoginSuccess, onRedirect }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.identifier,
          email: form.identifier,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.redirect === "operateurDashboard") {
        // Récupère le profil de l'opérateur connecté
        const operateurRes = await fetch("/api/Operateur/me", {
          credentials: "include",
        });
        const operateur = await operateurRes.json();
        localStorage.setItem("operateurInfo", JSON.stringify(operateur));
        window.location.href = "/operateur/dashboard";
      } else if (res.ok) {
        setMessage("Connexion réussie !");
        if (data.redirect === "clientDashboard") {
          localStorage.setItem("clientInfo", JSON.stringify(data));
          window.location.href = "/client/dashboard";
        } else if (data.redirect === "adminDashboard") {
          window.location.href = "/admin/dashboard";
        } else if (data.redirect === "adminRegister") {
          window.location.href = "/admin/register";
        }
        if (onRedirect) onRedirect(data);
        if (onLoginSuccess) onLoginSuccess();
        return;
      }
      setMessage(data?.message || "Erreur de connexion.");
    } catch {
      setMessage("Erreur réseau.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 350,
        margin: "60px auto",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 2px 16px #0001",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Connexion</h2>
      <div style={{ marginBottom: 18 }}>
        <label
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          Nom d'utilisateur ou Email
        </label>
        <input
          name="identifier"
          placeholder="Nom d'utilisateur ou Email"
          value={form.identifier}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
          required
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          Mot de passe
        </label>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
          required
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 6,
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          border: "none",
          cursor: "pointer",
        }}
      >
        Se connecter
      </button>
      {message && (
        <div
          style={{
            marginTop: 16,
            color: "#d32f2f",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}
