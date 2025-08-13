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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/warehouse.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px", // Ajout de padding pour éviter le débordement sur petits écrans
      }}
    >
      {/* Overlay semi-transparent pour améliorer la lisibilité */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "380px", // Légèrement réduit
          margin: "40px auto", // Centrage vertical avec espace suffisant
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-25px", // Réduit pour moins dépasser
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#e8a87c",
            borderRadius: "50%",
            width: "70px", // Légèrement réduit
            height: "70px", // Légèrement réduit
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        >
          <i
            className="fas fa-box"
            style={{ fontSize: "28px", color: "#fff" }}
          ></i>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            padding: "50px 25px 25px", // Augmenté en haut pour l'icône
            borderRadius: "12px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
            background: "rgba(255, 255, 255, 0.95)",
            position: "relative",
            zIndex: 1,
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxSizing: "border-box", // Garantit que le padding est inclus dans la largeur
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: 25,
              color: "#8d6e63",
              fontWeight: "600",
              fontSize: "26px", // Légèrement réduit
            }}
          >
            Gestion d'Inventaire
          </h2>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#5d4037",
              }}
            >
              Nom d'utilisateur ou Email
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#8d6e63",
                }}
              >
                <i className="fas fa-user"></i>
              </span>
              <input
                name="identifier"
                placeholder="Entrez votre identifiant"
                value={form.identifier}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #d7ccc8",
                  fontSize: 16,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#5d4037",
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
                  color: "#8d6e63",
                }}
              >
                <i className="fas fa-lock"></i>
              </span>
              <input
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: 8,
                  border: "1px solid #d7ccc8",
                  fontSize: 16,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  transition: "all 0.3s",
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              background: "linear-gradient(135deg, #a1887f 0%, #8d6e63 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Se connecter
          </button>

          {message && (
            <div
              style={{
                marginTop: 20,
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: message.includes("réussie")
                  ? "#c8e6c9"
                  : "#ffcdd2",
                color: message.includes("réussie")
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
