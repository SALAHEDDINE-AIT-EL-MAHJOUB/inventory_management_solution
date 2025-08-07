import React, { useState, useEffect } from "react";
import axios from "axios";
import ListeOperateurs from "./ListeOperateurs";
import OperateurNavbar from "./OperateurNavbar"; // <-- Ajout

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
  const [activeTab, setActiveTab] = useState("ajouter"); // <-- Ajout

  useEffect(() => {
    // Charger la liste des sites au montage du composant
    axios
      .get("/api/Site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      console.log("siteId envoyé :", form.siteId);
      await axios.post("/api/OperateurAuth/register", {
        Nom: form.nom,
        Prenom: form.prenom,
        Cin: form.cin,
        Email: form.email,
        Telephone: form.telephone,
        Password: form.password, // Ajoute le mot de passe ici
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
    } catch (err) {
      const apiError = err.response?.data;
      if (apiError?.Errors) {
        setError(apiError.Errors.map((e, i) => <div key={i}>{e}</div>));
      } else if (apiError?.Message) {
        setError(apiError.Message);
      } else if (typeof apiError === "string") {
        setError(apiError);
      } else if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Erreur lors de l'enregistrement de l'opérateur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-operateur-page">
      <style>{`
        .register-operateur-page {
          max-width: 900px;
          margin: 40px auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 32px 40px 40px 40px;
        }
        .register-operateur-page h3 {
          margin-bottom: 24px;
          color: #2d3a4b;
          font-size: 1.7rem;
          font-weight: 600;
        }
        .register-operateur-page form {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 18px;
        }
        .register-operateur-page input,
        .register-operateur-page select {
          flex: 1 1 220px;
          padding: 10px 12px;
          border: 1px solid #d2d6dc;
          border-radius: 6px;
          font-size: 1rem;
          background: #f7fafc;
          transition: border 0.2s;
        }
        .register-operateur-page input:focus,
        .register-operateur-page select:focus {
          border-color: #007bff;
          outline: none;
        }
        .register-operateur-page button[type="submit"] {
          padding: 10px 28px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .register-operateur-page button[type="submit"]:hover {
          background: #0056b3;
        }
        .success-message {
          color: #2e7d32;
          background: #e8f5e9;
          padding: 8px 14px;
          border-radius: 5px;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        .error-message {
          color: #c62828;
          background: #ffebee;
          padding: 8px 14px;
          border-radius: 5px;
          margin-bottom: 10px;
          margin-top: 10px;
        }
        /* Table design for ListeOperateurs */
        .register-operateur-page table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
          background: #f9f9f9;
        }
        .register-operateur-page th, .register-operateur-page td {
          padding: 10px 8px;
          border-bottom: 1px solid #e0e0e0;
          text-align: left;
        }
        .register-operateur-page th {
          background: #f1f5fa;
          color: #2d3a4b;
          font-weight: 600;
        }
        .register-operateur-page tr:hover {
          background: #f0f7ff;
        }
      `}</style>
      <OperateurNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "ajouter" && (
        <>
          <h3>Ajouter un opérateur</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={form.prenom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cin"
              placeholder="CIN"
              value={form.cin}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={form.telephone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
            <select
              name="siteId"
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
            <button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
        </>
      )}
      {activeTab === "liste" && <ListeOperateurs />}
    </div>
  );
};

export default RegisterOperateur;