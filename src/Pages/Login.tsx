import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Incorrect username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      
      navigate("/topics");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <p>Welcome back!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error && !username && (
            <p className="error-message">Username is required</p>
          )}

          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && !password && (
            <p className="error-message">Password is required</p>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            Login
          </button>

          <a href=""><span>Don't have an account?</span>Sign up</a>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
