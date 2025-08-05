import React, { useState } from "react";

export default function AdminRegisterView() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    adminName: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/Admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Admin enregistré avec succès !");
        setForm({ userName: "", email: "", adminName: "", password: "" });
      } else {
        const data = await res.text();
        setMessage(data || "Erreur lors de l'inscription.");
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
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nom Admin</label>
        <input
          name="adminName"
          value={form.adminName}
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
      <button type="submit">Inscrire</button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </form>
  );
}