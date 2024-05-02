import React from "react";

export default function Signup() {
    const BASE_URL2 = 'http://localhost:3000'
    const [error, setError] = React.useState('');
    const campoVacio: string = 'Complete todos los campos';
    // const emailNoEncontrado: string = 'No se encontró el email';
    // const contraseñaIncorrecta: string = 'Contraseña incorrecta';
    async function crearCuenta(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
        await fetch(`${BASE_URL2}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        window.location.reload();
    }
    return (
        <div>
            <main className="container mx-auto flex flex-col">
                <h1 className="text-4xl text-blue-600 font-extrabold text-center">Sign Up</h1>
                {error && (
                    <div className="bg-red-400/70 p-4 rounded my-2 text-white text-xl">
                        Error: {error}
                    </div>
                )}
                <form action="/users" method="post" onSubmit={crearCuenta}>
                    <h2 className="text-2xl text-black-700 font-bold">Crear Cuenta</h2>
                    <input type="email" name="email" placeholder="Email" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
                    <input type="password" name="password" placeholder="Contraseña" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
                    <button type="submit" className="w-full p-2 bg-green-300 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-600">Crear</button>
                </form>
            </main>
        </div>
    )
}