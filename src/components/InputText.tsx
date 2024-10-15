import React, { useState } from "react";
import "../Styles/InputText.css";

function InputText() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Verificar si los campos están vacíos
    if (!title || !description) {
      setErrorMessage("Both title and description are required.");
      return;
    }

    // Obtener el token JWT de localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5185/api/v1/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el Bearer token
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish the topic");
      }

      setSuccessMessage("Topic published successfully!");
      setTitle("");
      setDescription("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Si el error es de tipo Error, accedemos a su mensaje
        setErrorMessage(error.message);
      } else {
        // Si no, mostramos un error genérico
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="container-post">
      <h1>Post:</h1>
      <input
        className={`Title-topic ${!title && errorMessage ? "error" : ""}`}
        type="text"
        placeholder="Topic Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`Content-topic ${
          !description && errorMessage ? "error" : ""
        }`}
        placeholder="Body..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button className="post-button" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
}

export default InputText;
