import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeOperateurs from "./ListeOperateurs";
import OperateurNavbar from "./OperateurNavbar";

// Composants d'icônes
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const IdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const AddUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const ManageUsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.02 3.02 0 0 0 17.1 7H16.9c-1.3 0-2.4.84-2.85 2.06L11.5 18l2 .5 1.5-5H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5C9 8.12 7.88 7 6.5 7S4 8.12 4 9.5V15H5.5v7h2z"/>
  </svg>
);

const RegisterOperateur = () => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    cin: "",
    email: "",
    telephone: "",
    password: "",
    siteId: ""
  });
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("ajouter");

  useEffect(() => {
    axios
      .get("/api/Site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await axios.post("/api/OperateurAuth/register", {
        Nom: form.nom,
        Prenom: form.prenom,
        Cin: form.cin,
        Email: form.email,
        Telephone: form.telephone,
        Password: form.password,
        SiteId: parseInt(form.siteId, 10)
      });
      
      setSuccess("Opérateur enregistré avec succès !");
      setForm({
        nom: "",
        prenom: "",
        cin: "",
        email: "",
        telephone: "",
        password: "",
        siteId: ""
      });
      
      setTimeout(() => {
        setActiveTab("liste");
      }, 2000);
      
    } catch (err) {
      const apiError = err.response?.data;
      if (apiError?.Errors) {
        setError(apiError.Errors.join(", "));
      } else if (apiError?.Message) {
        setError(apiError.Message);
      } else if (typeof apiError === "string") {
        setError(apiError);
      } else {
        setError("Erreur lors de l'enregistrement de l'opérateur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-operateur-page">
      <style>{`
        .register-operateur-page {
          max-width: 1000px;
          margin: 40px auto;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .register-operateur-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .page-title {
          text-align: center;
          margin-bottom: 32px;
          color: #2d3a4b;
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .form-section {
          background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e3f2fd;
          margin-bottom: 24px;
        }
        
        .form-title {
          margin-bottom: 24px;
          color: #2d3a4b;
          font-size: 1.6rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-label {
          font-weight: 600;
          color: #495057;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .form-control {
          padding: 14px 18px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 1rem;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          position: relative;
        }
        
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }
        
        .form-control:hover {
          border-color: #bbb;
        }
        
        .submit-container {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
          min-width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .btn-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .btn-submit:hover::before {
          left: 100%;
        }
        
        .btn-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }
        
        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-submit:disabled:hover {
          transform: none;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }
        
        .loading-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .alert {
          padding: 16px 20px;
          border-radius: 12px;
          margin-top: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .alert-success {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          color: #155724;
          border: 2px solid #b8dacd;
        }
        
        .alert-error {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          color: #721c24;
          border: 2px solid #f1b0b7;
        }
        
        @media (max-width: 768px) {
          .register-operateur-page {
            margin: 20px;
            padding: 24px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .page-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

    
      
      <OperateurNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "ajouter" && (
        <div className="form-section">
          <h3 className="form-title">
            <AddUserIcon />
            Ajouter un nouvel opérateur
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <UserIcon />
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  placeholder="Entrez le nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <UserIcon />
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  placeholder="Entrez le prénom"
                  value={form.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <IdIcon />
                  CIN
                </label>
                <input
                  type="text"
                  name="cin"
                  className="form-control"
                  placeholder="Entrez le CIN"
                  value={form.cin}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <EmailIcon />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="exemple@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <PhoneIcon />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  className="form-control"
                  placeholder="+212 6XX XXX XXX"
                  value={form.telephone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <LockIcon />
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Mot de passe sécurisé"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <BuildingIcon />
                  Site
                </label>
                <select
                  name="siteId"
                  className="form-control"
                  value={form.siteId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionner un site --</option>
                  {sites.map(site => (
                    <option key={site.id} value={site.id}>
                      {site.siteNom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="submit-container">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span className="loading-text">
                    <div className="loading-spinner"></div>
                    Enregistrement...
                  </span>
                ) : (
                  <>
                    <CheckIcon />
                    Enregistrer l'opérateur
                  </>
                )}
              </button>
            </div>
          </form>
          
          {success && (
            <div className="alert alert-success">
              <CheckIcon />
              {success}
            </div>
          )}
          
          {error && (
            <div className="alert alert-error">
              ⚠️ {error}
            </div>
          )}
        </div>
      )}
      
      {activeTab === "liste" && <ListeOperateurs />}
    </div>
  );
};

export default RegisterOperateur;