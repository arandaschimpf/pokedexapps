import { Link, redirect, Navigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const BASE_URL = 'http://localhost:3000'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    async function handleLogin() {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setLoggedIn(true)
                console.log(loggedIn)
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);

            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión, por favor intenta de nuevo.');
        }
        console.log(loggedIn)
    };
    const handleCloseError = () => {
        setError(null);
    };

    if(loggedIn){
        return window.location.href = '/';
    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-semibold mb-4">Iniciar sesión</h1>
            <Link to='/'>Salir</Link>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                       Correo
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleLogin}
                    >
                        Iniciar sesión
                    </button>
                    <button><Link to='/SignUp'>No tenes una cuenta?</Link></button>
                </div>
            </form>
            {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-red-500 mb-2">{error}</p>
                        <button onClick={handleCloseError} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
