import React, { useState } from "react";
import axios from "axios";
import "../Styles/Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/", {
        username,
        password,
      });

      const token = response.data.token; // asegúrate de que el token está en response.data.token
      localStorage.setItem("token", token);

      alert("Login successful!");
      // Aquí puedes redirigir al usuario a otra página o mostrar topics
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="mt-600 loginOwO">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Username:</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Password:</label>
          <input
            className="border border-gray-300 p-2 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
