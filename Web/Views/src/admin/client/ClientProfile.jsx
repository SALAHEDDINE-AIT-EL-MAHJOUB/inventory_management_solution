import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClientProfile.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClientId, setEditingClientId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/AdminClient/GetAllClients');
        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEditClick = (client) => {
    setEditingClientId(client.clientId);
    setFormData({ 
      clientId: client.clientId,
      email: client.email || '',
      clientNom: client.clientNom || '',
      adress: client.adress || '',
      phone: client.phone || '',
      isActive: client.isActive
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      // Préparer les données à envoyer selon le DTO attendu par l'API
      const updateData = {
        email: formData.email,
        clientNom: formData.clientNom,
        adress: formData.adress || '',
        phone: formData.phone || '',
        isActive: formData.isActive
      };

      console.log('Envoi des données de mise à jour:', updateData);

      const response = await axios.put(`/api/AdminClient/UpdateClient/${editingClientId}`, updateData);
      
      console.log('Réponse de l\'API:', response.data);
      
      setEditingClientId(null);
      
      // Recharger la liste des clients
      const clientsResponse = await axios.get('/api/AdminClient/GetAllClients');
      setClients(clientsResponse.data);
      
      // Optionnel: afficher un message de succès
      alert('Client mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client', error);
      
      // Afficher un message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de la mise à jour du client';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      alert(errorMessage);
    }
  };

  const handleCancelClick = () => {
    setEditingClientId(null);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (clients.length === 0) return <div className="no-clients">Aucun client trouvé.</div>;

  return (
    <div className="client-list-container">
      <h2>Liste des clients</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Actif</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId}>
              <td>{client.clientId}</td>
              <td>
                {editingClientId === client.clientId ? (
                  <input
                    type="text"
                    name="clientNom"
                    value={formData.clientNom || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  client.clientNom
                )}
              </td>
              <td>
                {editingClientId === client.clientId ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  client.email
                )}
              </td>
              <td>
                {editingClientId === client.clientId ? (
                  <input
                    type="text"
                    name="adress"
                    value={formData.adress || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  client.adress
                )}
              </td>
              <td>
                {editingClientId === client.clientId ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  client.phone
                )}
              </td>
              <td>
                {editingClientId === client.clientId ? (
                  <select
                    name="isActive"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.value === 'true' })
                    }
                  >
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                ) : (
                  client.isActive ? 'Oui' : 'Non'
                )}
              </td>
              <td>
                {editingClientId === client.clientId ? (
                  <>
                    <button className="save-button" onClick={handleSaveClick}>
                      Enregistrer
                    </button>
                    <button className="cancel-button" onClick={handleCancelClick}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <button className="edit-button" onClick={() => handleEditClick(client)}>
                    Modifier
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;