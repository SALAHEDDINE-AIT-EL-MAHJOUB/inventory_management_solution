import React, { useState } from "react";

export default function Login({ onLoginSuccess, onRedirect }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
         
          url('/login.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Overlay animé pour l'effet warehouse */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 110, 99, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
          `,
          animation: "warehouseFloat 8s ease-in-out infinite",
        }}
      />

      {/* Container principal */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "450px",
          margin: "0 auto",
          zIndex: 2,
        }}
      >
        {/* Logo warehouse flottant */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #d4a574 0%, #8d6e63 100%)",
            borderRadius: "50%",
            width: "90px",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `
              0 15px 35px rgba(139, 110, 99, 0.4),
              0 5px 15px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            zIndex: 3,
            animation: "logoWarehouse 4s ease-in-out infinite",
            border: "4px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <i
            className="fas fa-warehouse"
            style={{ 
              fontSize: "36px", 
              color: "#fff",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
            }}
          ></i>
        </div>

        {/* Carte de connexion principale */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(25px)",
            borderRadius: "24px",
            padding: "70px 35px 35px",
            boxShadow: `
              0 30px 60px rgba(0, 0, 0, 0.2),
              0 10px 30px rgba(139, 110, 99, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.3)
            `,
            border: "2px solid rgba(212, 165, 116, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Éléments décoratifs thème entrepôt */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "120px",
              height: "120px",
              background: "linear-gradient(45deg, rgba(212, 165, 116, 0.1), rgba(139, 110, 99, 0.1))",
              borderRadius: "50%",
              animation: "boxFloat 6s ease-in-out infinite",
            }}
          />
          
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "80px",
              height: "80px",
              background: "linear-gradient(45deg, rgba(139, 110, 99, 0.1), rgba(212, 165, 116, 0.1))",
              borderRadius: "50%",
              animation: "boxFloat 6s ease-in-out infinite 3s",
            }}
          />

          {/* Motif de caisses en arrière-plan */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "15px",
              height: "15px",
              background: "rgba(212, 165, 116, 0.2)",
              borderRadius: "2px",
              boxShadow: `
                25px 0 rgba(212, 165, 116, 0.15),
                50px 0 rgba(212, 165, 116, 0.1),
                0 25px rgba(139, 110, 99, 0.15),
                25px 25px rgba(139, 110, 99, 0.1)
              `
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* En-tête */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #8d6e63 0%, #d4a574 50%, #8d6e63 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "12px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Système d'Inventaire
              </h1>
              
            </div>

            <form onSubmit={handleSubmit}>
              {/* Champ identifiant */}
              <div style={{ marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 10,
                    fontWeight: 700,
                    color: "#8d6e63",
                    fontSize: "15px",
                  }}
                >
                  Identifiant
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "18px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8d6e63",
                      zIndex: 1,
                    }}
                  >
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    name="identifier"
                    placeholder="Email ou nom d'utilisateur"
                    value={form.identifier}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "18px 22px 18px 50px",
                      borderRadius: "16px",
                      border: "3px solid rgba(212, 165, 116, 0.3)",
                      fontSize: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      outline: "none",
                      boxSizing: "border-box",
                      fontWeight: "500",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8d6e63";
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow = "0 10px 30px rgba(139, 110, 99, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(212, 165, 116, 0.3)";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
              </div>

              {/* Champ mot de passe */}
              <div style={{ marginBottom: 35 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: 10,
                    fontWeight: 700,
                    color: "#8d6e63",
                    fontSize: "15px",
                  }}
                >
                  Mot de passe
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "18px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8d6e63",
                      zIndex: 1,
                    }}
                  >
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "18px 22px 18px 50px",
                      borderRadius: "16px",
                      border: "3px solid rgba(212, 165, 116, 0.3)",
                      fontSize: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      outline: "none",
                      boxSizing: "border-box",
                      fontWeight: "500",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8d6e63";
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow = "0 10px 30px rgba(139, 110, 99, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(212, 165, 116, 0.3)";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "18px 0",
                  borderRadius: "16px",
                  background: isLoading 
                    ? "linear-gradient(135deg, #d4a574 0%, #8d6e63 100%)"
                    : "linear-gradient(135deg, #8d6e63 0%, #d4a574 50%, #8d6e63 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "18px",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  boxShadow: "0 12px 30px rgba(139, 110, 99, 0.4)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(139, 110, 99, 0.5)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 12px 30px rgba(139, 110, 99, 0.4)";
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        border: "3px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "3px solid #ffffff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    se connecter
                  </>
                )}
              </button>

              {/* Affichage des messages */}
              {message && (
                <div
                  style={{
                    marginTop: 25,
                    padding: "15px 20px",
                    borderRadius: "12px",
                    backgroundColor: message.includes("réussie")
                      ? "rgba(76, 175, 80, 0.1)"
                      : "rgba(244, 67, 54, 0.1)",
                    border: `2px solid ${message.includes("réussie") ? "#4caf50" : "#f44336"}`,
                    color: message.includes("réussie") ? "#2e7d32" : "#d32f2f",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "15px",
                    animation: "slideIn 0.5s ease-out",
                  }}
                >
                  <i 
                    className={`fas ${message.includes("réussie") ? "fa-check-circle" : "fa-exclamation-triangle"}`}
                    style={{ marginRight: "10px", fontSize: "16px" }}
                  ></i>
                  {message}
                </div>
              )}
            </form>

            {/* Pied de page */}
            <div
              style={{
                textAlign: "center",
                marginTop: 35,
                paddingTop: 25,
                borderTop: "2px solid rgba(212, 165, 116, 0.2)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#8d6e63",
                  fontSize: "13px",
                  fontWeight: "600",
                  opacity: 0.7,
                }}
              >
                 © 2025 Système d'Inventaire Intelligent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations CSS améliorées */}
      <style>
        {`
          @keyframes warehouseFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-5px) rotate(0.5deg); }
            50% { transform: translateY(-8px) rotate(0deg); }
            75% { transform: translateY(-3px) rotate(-0.5deg); }
          }
          
          @keyframes logoWarehouse {
            0%, 100% { transform: translateX(-50%) translateY(0px) scale(1); }
            50% { transform: translateX(-50%) translateY(-8px) scale(1.05); }
          }
          
          @keyframes boxFloat {
            0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
            25% { opacity: 0.4; transform: scale(1.05) rotate(2deg); }
            50% { opacity: 0.6; transform: scale(1.1) rotate(0deg); }
            75% { opacity: 0.4; transform: scale(1.05) rotate(-2deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideIn {
            0% { opacity: 0; transform: translateY(15px) scale(0.9); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 20px !important;
              margin: 15px !important;
            }
            
            .login-form {
              padding: 50px 25px 25px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
