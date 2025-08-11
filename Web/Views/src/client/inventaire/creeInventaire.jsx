import React, { useEffect, useState } from "react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  borderRadius: "8px",
  overflow: "hidden"
};

const thStyle = {
  background: "#1976d2",
  color: "#fff",
  padding: "12px",
  fontWeight: "bold",
  textAlign: "left",
  borderBottom: "2px solid #1565c0"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e0e0e0",
  background: "#fafbfc"
};

const actionBtn = {
  margin: "0 4px",
  padding: "6px 14px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold"
};

const editBtn = {
  ...actionBtn,
  background: "#1976d2",
  color: "#fff"
};

const saveBtn = {
  ...actionBtn,
  background: "#43a047",
  color: "#fff"
};

const cancelBtn = {
  ...actionBtn,
  background: "#e53935",
  color: "#fff"
};

const selectStyle = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #bdbdbd",
  background: "#fff"
};

const CreeInventaire = () => {
  const [inventaires, setInventaires] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchInventaires();
    fetchStatuts();
    fetchTypes();
  }, []);

  const fetchInventaires = async () => {
    const res = await fetch("/api/inventaire");
    const data = await res.json();
    setInventaires(data);
    setLoading(false);
  };

  const fetchStatuts = async () => {
    const res = await fetch("/api/statut");
    const data = await res.json();
    setStatuts(data);
  };

  const fetchTypes = async () => {
    const res = await fetch("/api/typeinventaire");
    const data = await res.json();
    setTypes(data);
  };

  const handleEdit = (inv) => {
    setEditRow(inv.inventaireId);
    setEditValues({
      statutId: inv.inventaireStatut?.statutId || "",
      typeInventaireId: inv.inventaireTypeInventaire?.typeInventaireId || "",
    });
  };

  const handleCancel = () => {
    setEditRow(null);
    setEditValues({});
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    if (editValues.statutId) {
      await fetch(`/api/inventaire/${id}/statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statutId: editValues.statutId }),
      });
    }
    if (editValues.typeInventaireId) {
      await fetch(`/api/inventaire/${id}/type`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typeInventaireId: editValues.typeInventaireId }),
      });
    }
    setEditRow(null);
    setEditValues({});
    fetchInventaires();
  };

  if (loading) return <div style={{margin: "30px", fontSize: "18px"}}>Chargement...</div>;

  return (
    <div style={{maxWidth: "1100px", margin: "40px auto", padding: "20px"}}>
      <h2 style={{color: "#1976d2", textAlign: "center", marginBottom: "18px"}}>Liste des Inventaires</h2>
      <div style={{overflowX: "auto"}}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Libellé</th>
              <th style={thStyle}>Statut</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventaires.map(inv => (
              <tr key={inv.inventaireId}>
                <td style={tdStyle}>{inv.inventaireId}</td>
                <td style={tdStyle}>{inv.inventaireLibelle}</td>
                <td style={tdStyle}>
                  {editRow === inv.inventaireId ? (
                    <select
                      style={selectStyle}
                      value={editValues.statutId}
                      onChange={e => handleChange("statutId", e.target.value)}
                    >
                      <option value="" disabled>Choisir...</option>
                      {statuts.map(s => (
                        <option key={s.statutId} value={s.statutId}>
                          {s.statutLibelle || s.statutNom}
                        </option>
                      ))}
                    </select>
                  ) : (
                    inv.inventaireStatut?.statutLibelle || inv.inventaireStatut?.statutNom || "N/A"
                  )}
                </td>
                <td style={tdStyle}>
                  {editRow === inv.inventaireId ? (
                    <select
                      style={selectStyle}
                      value={editValues.typeInventaireId}
                      onChange={e => handleChange("typeInventaireId", e.target.value)}
                    >
                      <option value="" disabled>Choisir...</option>
                      {types.map(t => (
                        <option key={t.typeInventaireId} value={t.typeInventaireId}>
                          {t.typeInventaireLibelle}
                        </option>
                      ))}
                    </select>
                  ) : (
                    inv.inventaireTypeInventaire?.typeInventaireLibelle || "N/A"
                  )}
                </td>
                <td style={tdStyle}>
                  {editRow === inv.inventaireId ? (
                    <>
                      <button style={saveBtn} onClick={() => handleSave(inv.inventaireId)}>Enregistrer</button>
                      <button style={cancelBtn} onClick={handleCancel}>Annuler</button>
                    </>
                  ) : (
                    <button style={editBtn} onClick={() => handleEdit(inv)}>Modifier</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreeInventaire;