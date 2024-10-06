import { useState } from 'react';
import '../Styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita que la página se recargue

        const response = await fetch('http://localhost:8089/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local
            console.log('Authenticated! Token:', data.token); // Imprime el token en la consola
            // Redirige o realiza otra acción
        } else {
            const error = await response.text();
            console.error('Login failed:', error);
            // Maneja el error (muestra un mensaje al usuario, etc.)
        }
    };

    return (
        <>
            <div className="container">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                    <div className="field">
                        <p>Username</p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                        />
                        <p>Password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                    </div>
                    <button id="login" type="submit">Login</button>
                    <a href="#">Don't have an account?</a>
                </form>
            </div>
        </>
    );
}

export default Login;
