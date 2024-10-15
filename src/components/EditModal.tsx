import React, { useState, useEffect } from "react";
import "../Styles/InputText.css";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string, description: string) => void;
  initialTitle: string;
  initialDescription: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialTitle,
  initialDescription,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validate fields
    if (!title || !description) {
      setErrorMessage("Both title and description are required.");
      return;
    }

    // Call onConfirm to update the topic
    onConfirm(title, description);
    setSuccessMessage("Topic updated successfully!");
    onClose(); // Close the modal after successful update
  };

  if (!isOpen) return null; // If not open, return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Topic</h2>
        <input
          type="text"
          placeholder="Topic Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
