import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClientProfile.css';
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Chip, Avatar, IconButton, Tooltip } from '@mui/material';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClientId, setEditingClientId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/AdminClient/GetAllClients');
        setClients(response.data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des clients', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.isActive).length;

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
      const updateData = {
        email: formData.email,
        clientNom: formData.clientNom,
        adress: formData.adress || '',
        phone: formData.phone || '',
        isActive: formData.isActive
      };
      await axios.put(`/api/AdminClient/UpdateClient/${editingClientId}`, updateData);
      setEditingClientId(null);
      const clientsResponse = await axios.get('/api/AdminClient/GetAllClients');
      setClients(clientsResponse.data || []);
      // message minimal pour l'instant
      alert('Client mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client', error);
      let errorMessage = 'Erreur lors de la mise à jour du client';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') errorMessage = error.response.data;
        else if (error.response.data.message) errorMessage = error.response.data.message;
      } else if (error.message) errorMessage = error.message;
      alert(errorMessage);
    }
  };

  const handleCancelClick = () => setEditingClientId(null);

  if (loading) return <div className="loading">Chargement...</div>;
  if (clients.length === 0) return <div className="no-clients">Aucun client trouvé.</div>;

  return (
    <div className="client-list-container">
      <div className="stats-row">
        <div className="stat-card">
          <PeopleIcon sx={{ color: '#1976d2', fontSize: 28 }} />
          <div className="stat-text">
            <div className="stat-sub">Total clients</div>
            <div className="stat-value">{totalClients}</div>
          </div>
        </div>
        <div className="stat-card">
          <CheckCircleIcon sx={{ color: '#43a047', fontSize: 28 }} />
          <div className="stat-text">
            <div className="stat-sub">Actifs</div>
            <div className="stat-value">{activeClients}</div>
          </div>
        </div>
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th className="col-id">ID</th>
            <th className="col-name">Nom</th>
            <th className="col-email">Email</th>
            <th className="col-address">Adresse</th>
            <th className="col-phone">Téléphone</th>
            <th className="col-status">Actif</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.clientId} className="client-row">
              <td className="id-cell">{client.clientId}</td>

              <td className="info-cell">
                <div className="name-wrapper">
                  <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', width: 36, height: 36 }}>
                    <PersonIcon />
                  </Avatar>
                  {editingClientId === client.clientId ? (
                    <input type="text" name="clientNom" value={formData.clientNom || ''} onChange={handleInputChange} />
                  ) : (
                    <div className="line-text">{client.clientNom || '—'}</div>
                  )}
                </div>
              </td>

              <td className="email-cell">
                <div className="line-with-icon">
                  <EmailIcon sx={{ color: '#1976d2', fontSize: 18 }} />
                  {editingClientId === client.clientId ? (
                    <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} />
                  ) : (
                    <div className="muted-text">{client.email || '—'}</div>
                  )}
                </div>
              </td>

              <td className="address-cell">
                <div className="line-with-icon">
                  <LocationOnIcon sx={{ color: '#1976d2', fontSize: 18 }} />
                  {editingClientId === client.clientId ? (
                    <input type="text" name="adress" value={formData.adress || ''} onChange={handleInputChange} />
                  ) : (
                    <div className="muted-text">{client.adress || '—'}</div>
                  )}
                </div>
              </td>

              <td className="phone-cell">
                <div className="line-with-icon">
                  <PhoneIcon sx={{ color: '#1976d2', fontSize: 18 }} />
                  {editingClientId === client.clientId ? (
                    <input type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
                  ) : (
                    <div className="muted-text">{client.phone || '—'}</div>
                  )}
                </div>
              </td>

              <td className="status-cell">
                {editingClientId === client.clientId ? (
                  <select
                    name="isActive"
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                  >
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                ) : (
                  <Chip
                    label={client.isActive ? 'Actif' : 'Inactif'}
                    color={client.isActive ? 'success' : 'default'}
                    size="small"
                    className="status-chip"
                  />
                )}
              </td>

              <td className="actions-cell">
                {editingClientId === client.clientId ? (
                  <>
                    <Tooltip title="Enregistrer">
                      <IconButton className="action-button save" onClick={handleSaveClick} size="small">
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Annuler">
                      <IconButton className="action-button cancel" onClick={handleCancelClick} size="small">
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title="Modifier">
                    <IconButton className="action-button edit" onClick={() => handleEditClick(client)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
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