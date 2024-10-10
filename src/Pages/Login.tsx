import React, { useState } from "react";
import "../Styles/Login.css";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      // Simulando una llamada a API
      console.log("Intento de registro con:", { firstName, lastName, email });
      // Aquí normalmente harías una llamada a una API
      // Como no podemos usar axios, tendrías que implementarlo usando fetch u otro método
      // Por ahora, solo registramos el intento y limpiamos el formulario
      setFirstName("");
      setLastName("");
      setEmail("");
      alert("¡Registro exitoso! (Esta es una simulación)");
    } catch (error) {
      setError("Fallo en el registro. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign Up</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</p>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            className="input-field"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="social-login">
          <button className="social-button">
            <span className="social-icon">G</span> Google
          </button>
          <button className="social-button">
            <span className="social-icon">f</span> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;