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
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa", // Couleur de fond blanche/bleutée claire
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Plus d'overlay ni d'image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "450px",
          margin: "40px auto",
        }}
      >
        {/* Icône décorative */}
        <div
          style={{
            position: "absolute",
            top: "-25px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1976d2",
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            zIndex: 2,
          }}
        >
          <i
            className="fas fa-user-shield"
            style={{ fontSize: "28px", color: "#fff" }}
          ></i>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            padding: "50px 30px 30px",
            borderRadius: "12px",
            boxShadow: "0 5px 20px rgba(25, 118, 210, 0.10)",
            background: "#fff",
            position: "relative",
            zIndex: 1,
            border: "1px solid #e3eaf3",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: 30,
              color: "#1976d2",
              fontWeight: "700",
              fontSize: "26px",
              letterSpacing: "0.5px",
            }}
          >
            Inscription Administrateur
          </h2>

          {/* Nom d'utilisateur */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
              }}
            >
              Nom d'utilisateur
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <i className="fas fa-user"></i>
              </span>
              <input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Entrez votre nom d'utilisateur"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 16,
                  backgroundColor: "#f5f7fa",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
              }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <i className="fas fa-envelope"></i>
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 16,
                  backgroundColor: "#f5f7fa",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          {/* Nom Admin */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
              }}
            >
              Nom Admin
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <i className="fas fa-id-badge"></i>
              </span>
              <input
                name="adminName"
                value={form.adminName}
                onChange={handleChange}
                placeholder="Entrez votre nom d'administrateur"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 16,
                  backgroundColor: "#f5f7fa",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
              }}
            >
              Mot de passe
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#1976d2",
                }}
              >
                <i className="fas fa-lock"></i>
              </span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Créez un mot de passe"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #bbdefb",
                  fontSize: 16,
                  backgroundColor: "#f5f7fa",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.10)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            S'inscrire
          </button>

          {/* Message de résultat */}
          {message && (
            <div
              style={{
                marginTop: 20,
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: message.includes("succès")
                  ? "#c8e6c9"
                  : "#ffcdd2",
                color: message.includes("succès")
                  ? "#2e7d32"
                  : "#c62828",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}