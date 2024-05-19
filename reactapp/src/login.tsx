import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Signup from './signup.tsx'

export default function Login() {
    const BASE_URL2 = 'http://localhost:3000'
    const [error, setError] = React.useState('');
    const campoVacio: string = 'Complete todos los campos';
    const emailNoEncontrado: string = 'No se encontró el email';
    const contraseñaIncorrecta: string = 'Contraseña incorrecta';

    async function iniciarSesion(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)
        const user = {
            email: data.get('email') as string,
            password: data.get('password') as string
        }
        if(user.email.length === 0 || user.password.length === 0) {
            setError(campoVacio);
            return
        }
        try {
            const userEncontrado = await fetch(`${BASE_URL2}/users/${user.email}`, {
                method: 'GET'
            });

            if (!userEncontrado.ok) {
                throw new Error('Error al realizar la solicitud');
            }

            const userData = await userEncontrado.json();
            if (!userData || Object.keys(userData).length === 0) {
                throw new Error('Usuario no encontrado');
            }
            if (userData.password !== user.password) {
                setError(contraseñaIncorrecta);
                return;
            }
            if(userData.password === user.password) {
                ReactDOM.createRoot(document.getElementById('root')!).render(
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>,
                )
            }            
        } catch (error) {
            setError(emailNoEncontrado);
            return;
        }
        form.reset()
    }
    async function crearCuenta() {
        
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <Signup />
            </React.StrictMode>,
        )
        
    }
    return (
        <div>
            <main className="container mx-auto flex flex-col">
                <h1 className="text-4xl text-blue-600 font-extrabold text-center">Login</h1>
                {error && (
                    <div className="bg-red-400/70 p-4 rounded my-2 text-white text-xl">
                        Error: {error}
                    </div>
                )}
                <form action="/users" method="get" onSubmit={iniciarSesion}>
                    <h2 className="text-2xl text-black-700 font-bold">Ingresa tus credenciales</h2>
                    <input type="email" name="email" placeholder="Email" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
                    <input type="password" name="password" placeholder="Contraseña" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
                    <button type="submit" className="w-full p-2 bg-blue-300 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-blue-600">Iniciar Sesion</button>
                </form>
                <button type="button" onClick={crearCuenta} className="w-full p-2 bg-green-300 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-600">Crear Cuenta</button>
            </main>
        </div>
    )
}

