import React, { useEffect, useState } from "react";
import axios from "axios";

// Composants d'icônes SVG
const SupplierIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const ContactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 6c0 1.25.77 2.28 1.86 2.73L15.94 16H4.06l-.92-3.27C4.23 12.28 5 11.25 5 10V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
  </svg>
);

const CancelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </svg>
);

const Fournisseur = () => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [form, setForm] = useState({ Nom: "", Contact: "", Email: "", Telephone: "" });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/Fournisseur");
      setFournisseurs(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des fournisseurs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editId) {
        await axios.put(`/api/Fournisseur/${editId}`, { FournisseurId: editId, ...form });
        setSuccess("Fournisseur modifié avec succès !");
      } else {
        await axios.post("/api/Fournisseur", form);
        setSuccess("Fournisseur ajouté avec succès !");
      }

      setForm({ Nom: "", Contact: "", Email: "", Telephone: "" });
      setEditId(null);
      setShowForm(false);
      fetchFournisseurs();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Erreur lors de l'opération");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (f) => {
    setForm({
      Nom: f.nom || f.Nom,
      Contact: f.contact || f.Contact,
      Email: f.email || f.Email,
      Telephone: f.telephone || f.Telephone,
    });
    setEditId(f.fournisseurId || f.FournisseurId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) {
      try {
        setLoading(true);
        await axios.delete(`/api/Fournisseur/${id}`);
        setSuccess("Fournisseur supprimé avec succès !");
        fetchFournisseurs();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Erreur lors de la suppression");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreate = () => {
    setForm({ Nom: "", Contact: "", Email: "", Telephone: "" });
    setEditId(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ Nom: "", Contact: "", Email: "", Telephone: "" });
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const filteredFournisseurs = fournisseurs.filter((f) =>
    f.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.telephone.includes(searchTerm)
  );

  return (
    <div className="fournisseur-page">
      <style>{`
        .fournisseur-page {
          max-width: 1100px;
          margin: 40px auto;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .fournisseur-page::before {
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
        
        .actions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .stats-info {
          color: #6c757d;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .search-input {
          padding: 10px 16px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 0.95rem;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          width: 250px;
        }
        
        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .form-container {
          background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e3f2fd;
          margin-bottom: 32px;
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-title {
          margin-bottom: 24px;
          color: #2d3a4b;
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          font-size: 1rem;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }
        
        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        
        .btn-success {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
        }
        
        .btn-danger {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(220, 53, 69, 0.3);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(108, 117, 125, 0.3);
        }
        
        .table-container {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e9ecef;
        }
        
        .suppliers-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .suppliers-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 18px 16px;
          text-align: left;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.3px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .suppliers-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f3f4;
          color: #495057;
          font-size: 0.95rem;
          vertical-align: middle;
        }
        
        .suppliers-table tr:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);
          transform: scale(1.002);
          transition: all 0.2s ease;
        }
        
        .suppliers-table tr:nth-child(even) {
          background: #fafbfc;
        }
        
        .supplier-name {
          font-weight: 600;
          color: #2d3a4b;
        }
        
        .supplier-email {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        
        .supplier-email:hover {
          text-decoration: underline;
        }
        
        .supplier-phone {
          background: #f1f8e9;
          color: #388e3c;
          padding: 4px 12px;
          border-radius: 15px;
          font-weight: 600;
          font-size: 0.85rem;
          display: inline-block;
        }
        
        .table-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-sm {
          padding: 6px 12px;
          font-size: 0.85rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
        }
        
        .btn-edit {
          background: #3182ce;
          color: white;
        }
        
        .btn-edit:hover {
          background: #2c5aa0;
          transform: translateY(-1px);
        }
        
        .btn-delete {
          background: #e53e3e;
          color: white;
        }
        
        .btn-delete:hover {
          background: #c53030;
          transform: translateY(-1px);
        }
        
        .alert {
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.3s ease;
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
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          z-index: 1000;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e9ecef;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }
        
        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #495057;
        }
        
        @media (max-width: 768px) {
          .fournisseur-page {
            margin: 20px;
            padding: 24px;
          }
          
          .actions-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-container {
            flex-direction: column;
          }
          
          .search-input {
            width: 100%;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            justify-content: stretch;
          }
          
          .form-actions button {
            flex: 1;
          }
          
          .table-container {
            overflow-x: auto;
          }
          
          .table-actions {
            flex-direction: column;
          }
        }
      `}</style>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      <h2 className="page-title">
        <SupplierIcon />
        Gestion des Fournisseurs
      </h2>

      {success && (
        <div className="alert alert-success">
          <SaveIcon />
          {success}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <CancelIcon />
          {error}
        </div>
      )}

      <div className="actions-header">
        <div className="stats-info">
          <SupplierIcon />
          {filteredFournisseurs.length} fournisseur{filteredFournisseurs.length > 1 ? 's' : ''}
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un fournisseur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-primary" onClick={handleCreate}>
            <AddIcon />
            Nouveau Fournisseur
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <h3 className="form-title">
            {editId ? <EditIcon /> : <AddIcon />}
            {editId ? "Modifier le fournisseur" : "Ajouter un nouveau fournisseur"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <UserIcon />
                  Nom du fournisseur
                </label>
                <input
                  name="Nom"
                  className="form-control"
                  placeholder="Entrez le nom du fournisseur"
                  value={form.Nom}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <ContactIcon />
                  Contact
                </label>
                <input
                  name="Contact"
                  className="form-control"
                  placeholder="Nom du contact principal"
                  value={form.Contact}
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
                  name="Email"
                  type="email"
                  className="form-control"
                  placeholder="exemple@fournisseur.com"
                  value={form.Email}
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
                  name="Telephone"
                  type="tel"
                  className="form-control"
                  placeholder="+212 6XX XXX XXX"
                  value={form.Telephone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-success" disabled={loading}>
                <SaveIcon />
                {editId ? "Modifier" : "Ajouter"}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                <CancelIcon />
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        {filteredFournisseurs.length > 0 ? (
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>
                  <div className="header-content">
                    <UserIcon />
                    Nom
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <ContactIcon />
                    Contact
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <EmailIcon />
                    Email
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <PhoneIcon />
                    Téléphone
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFournisseurs.map((f) => (
                <tr key={f.fournisseurId}>
                  <td>
                    <span className="supplier-name">{f.nom}</span>
                  </td>
                  <td>{f.contact}</td>
                  <td>
                    <a href={`mailto:${f.email}`} className="supplier-email">
                      {f.email}
                    </a>
                  </td>
                  <td>
                    <span className="supplier-phone">{f.telephone}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-sm btn-edit"
                        onClick={() => handleEdit(f)}
                        disabled={loading}
                      >
                        <EditIcon />
                        Modifier
                      </button>
                      <button
                        className="btn-sm btn-delete"
                        onClick={() => handleDelete(f.fournisseurId)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <h3>Aucun fournisseur trouvé</h3>
            <p>Commencez par ajouter votre premier fournisseur</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fournisseur;