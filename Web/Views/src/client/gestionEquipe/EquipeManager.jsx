import React, { useState } from "react";
import ListEquipe from "./listEquipe";
import CreeEquipe from "./creeEquipe";

const EquipeManager = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Pour rafraîchir la liste après création ou modification
  const handleCreatedOrUpdated = () => {
    setShowCreate(false);
    setEditingEquipe(null);
    setRefresh(r => !r);
  };

  return (
    <div style={{
      background: "#f4f6fa",
      minHeight: "100vh",
      padding: "40px 0"
    }}>
      {!showCreate && !editingEquipe ? (
        <ListEquipe
          onAddEquipe={() => setShowCreate(true)}
          onEditEquipe={setEditingEquipe} // <-- Ajoute cette ligne
          refresh={refresh}
        />
      ) : null}
      {showCreate && (
        <CreeEquipe onCreated={handleCreatedOrUpdated} onCancel={() => setShowCreate(false)} />
      )}
      {editingEquipe && (
        <CreeEquipe
          equipe={editingEquipe} // Passe l'équipe à modifier
          onCreated={handleCreatedOrUpdated}
          onCancel={() => setEditingEquipe(null)}
        />
      )}
    </div>
  );
};

export default EquipeManager;