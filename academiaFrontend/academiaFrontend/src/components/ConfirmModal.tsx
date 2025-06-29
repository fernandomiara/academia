import React from "react";
import "../css/Modal.css"; // Estilo separado para clareza

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title || "Confirmar ação"}</h2>
        <p>{message || "Você tem certeza que deseja continuar?"}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-btn">Confirmar</button>
          <button onClick={onCancel} className="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;