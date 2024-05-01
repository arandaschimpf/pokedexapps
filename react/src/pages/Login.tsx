import { useNavigate } from 'react-router-dom';
import { useState } from "react"
const BASE_URL = 'http://localhost:3000/auth/login'


export default function LOGIN() {

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [textVisible, setTextVisible] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de email
        setEmail(event.target.value);
    };

    const handleContraChange = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de contraseña
        setContra(event.target.value);
    };

    const loginUser = async () => {
        const loginData = {
            email: email,
            contra: contra
        };
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });

            // Verificar el estado de la respuesta
            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Credenciales incorrectas');
                    setTextVisible(true);
                } else {
                    console.error('Error en el servidor');
                } return;
            }

            if (response.ok) {

                console.log('Credenciales correctas');
                navigate('/home');

            }

            // // Obtener los datos de la respuesta en formato JSON
            // const data = await response.json();

            // const jwt = localStorage.getItem('jwt');

            // console.log('Respuesta del servidor:', data);
            // if (jwt) {
            //     console.log('Token:', jwt);

            // } else {
            //     console.log('No se encontró el token en el almacenamiento local');
            // }
            // console.log('Token:', data.jwt);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }

    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento de envío por defecto

        // Llamar a la función para iniciar sesión
        loginUser();
    };
    const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/signup');
    }

    return (

        <main className="container mx-auto flex flex-col h-screen justify-center items-center">
            <div className="w-full sm:max-w-md">
                <h1 className="text-5xl text-red-600 font-extrabold text-center">Iniciar Sesión</h1>

                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Correo Electrónico"
                        className="my-1 w-full p-2 border border-gray-300 rounded-lg"
                        onChange={handleEmailChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={contra}
                        placeholder="Contraseña"
                        className="my-1 w-full p-2 border border-gray-300 rounded-lg"
                        onChange={handleContraChange}
                    />
                    {textVisible && (
                        <h2 className="text-2xl text-red-700 font-bold text-center">¡Credenciales incorrectas!</h2>
                    )}
                    <button
                        type="submit"
                        className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700"
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={handleRegistration}
                        className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700"
                    >
                        Registrarme
                    </button>
                </form>
            </div>

        </main>
    );
};

