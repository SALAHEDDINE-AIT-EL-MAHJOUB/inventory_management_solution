import React, { useEffect, useState } from "react";
import axios from "axios";

const SiteList = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/site")
      .then(res => setSites(res.data))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Liste des sites</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Ville</th>
            <th>Société</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.id}>
              <td>{site.siteNom}</td>
              <td>{site.adress}</td>
              <td>{site.siteTelephone}</td>
              <td>{site.email}</td>
              <td>{site.siteVilleId}</td>
              <td>{site.societeId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteList;