import React, { useEffect, useState } from "react";
import axios from "axios";

// Composants d'icônes
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>
);

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

const BuildingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const ListeOperateurs = () => {
  const [operateurs, setOperateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBySite, setFilterBySite] = useState("");
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [operateursRes, sitesRes] = await Promise.all([
          axios.get("/api/Operateur"),
          axios.get("/api/Site")
        ]);
        setOperateurs(operateursRes.data);
        setSites(sitesRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getSiteName = (siteId) => {
    const site = sites.find(s => s.id === siteId);
    return site ? site.siteNom : `Site ${siteId}`;
  };

  const filteredOperateurs = operateurs.filter(op => {
    const matchesSearch = 
      op.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.cin.includes(searchTerm) ||
      op.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSite = !filterBySite || op.siteId.toString() === filterBySite;
    
    return matchesSearch && matchesSite;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des opérateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="liste-operateurs">
      <style>{`
        .liste-operateurs {
          width: 100%;
        }
        
        .liste-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .liste-title {
          color: #2d3a4b;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stats-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 18px;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        
        .filters-container {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          align-items: flex-end;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .filter-label {
          font-weight: 600;
          color: #495057;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .search-input, .filter-select {
          padding: 8px 12px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          width: 180px;
        }
        
        .search-input:focus, .filter-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }
        
        .operateurs-table-container {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e9ecef;
        }
        
        .operateurs-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .operateurs-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 14px 12px;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.3px;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .operateurs-table .header-content {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .operateurs-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f3f4;
          color: #495057;
          font-size: 0.9rem;
          vertical-align: middle;
        }
        
        .operateurs-table tr:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);
          transform: scale(1.002);
          transition: all 0.2s ease;
        }
        
        .operateurs-table tr:nth-child(even) {
          background: #fafbfc;
        }
        
        .operator-name {
          font-weight: 600;
          color: #2d3a4b;
        }
        
        .operator-cin {
          background: #e3f2fd;
          color: #1565c0;
          padding: 3px 10px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.8rem;
          display: inline-block;
        }
        
        .operator-email {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        
        .operator-email:hover {
          text-decoration: underline;
        }
        
        .operator-phone {
          background: #f1f8e9;
          color: #388e3c;
          padding: 3px 10px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.8rem;
          display: inline-block;
        }
        
        .operator-site {
          background: #fff3e0;
          color: #f57c00;
          padding: 3px 10px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.8rem;
          display: inline-block;
        }
        
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          color: #6c757d;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e9ecef;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 16px;
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
          .operateurs-table-container {
            overflow-x: auto;
          }
          
          .filters-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-input, .filter-select {
            width: 100%;
          }
          
          .liste-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="liste-header">
        <h3 className="liste-title">
          <ListIcon />
          Liste des Opérateurs
        </h3>
        <div className="stats-badge">
          {filteredOperateurs.length} opérateur{filteredOperateurs.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">
            <SearchIcon />
            Rechercher
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="Nom, prénom, CIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">
            <FilterIcon />
            Filtrer par site
          </label>
          <select
            className="filter-select"
            value={filterBySite}
            onChange={(e) => setFilterBySite(e.target.value)}
          >
            <option value="">Tous les sites</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>
                {site.siteNom}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="operateurs-table-container">
        {filteredOperateurs.length > 0 ? (
          <table className="operateurs-table">
            <thead>
              <tr>
                <th>
                  <div className="header-content">
                    <UserIcon />
                    Nom complet
                  </div>
                </th>
                <th>
                  <div className="header-content">
                    <IdIcon />
                    CIN
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
                <th>
                  <div className="header-content">
                    <BuildingIcon />
                    Site
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOperateurs.map(op => (
                <tr key={op.id}>
                  <td>
                    <span className="operator-name">
                      {op.nom} {op.prenom}
                    </span>
                  </td>
                  <td>
                    <span className="operator-cin">{op.cin}</span>
                  </td>
                  <td>
                    <a href={`mailto:${op.email}`} className="operator-email">
                      {op.email}
                    </a>
                  </td>
                  <td>
                    <span className="operator-phone">{op.telephone}</span>
                  </td>
                  <td>
                    <span className="operator-site">
                      {getSiteName(op.siteId)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <h3>Aucun opérateur trouvé</h3>
            <p>Ajustez vos critères de recherche ou ajoutez de nouveaux opérateurs</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeOperateurs;