import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/Admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.text();
      if (res.ok) {
        setMessage("Connexion réussie !");
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setMessage(data || "Erreur de connexion.");
      }
    } catch {
      setMessage("Erreur réseau.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom d'utilisateur</label>
        <input
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </form>
  );
}
