import React from "react";
import "../Styles/Modal.css"; 

interface PermissionDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const PermissionDeniedModal: React.FC<PermissionDeniedModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Permission Denied</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PermissionDeniedModal;
