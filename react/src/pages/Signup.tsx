
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000/auth/signup'


export default function SIGNUP() {


    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const [contraConfirmar, setContraConfirmar] = useState('');
    const [textVisibleError, setTextVisibleError] = useState(false);
    const [textVisibleError2, setTextVisibleError2] = useState(false);
    const [textVisibleOk, setTextVisibleOk] = useState(false);

    const navigate = useNavigate();

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de email
        setUser(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de email
        setEmail(event.target.value);
    };

    const handleContraChange = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de contraseña
        setContra(event.target.value);
    };
    const handleContraChangeConfirmar = (event: React.ChangeEvent<HTMLInputElement>) => { //acá estamos creando una función que se encargará de manejar los cambios en el input de contraseña
        setContraConfirmar(event.target.value);
    };

    const SignUpUser = async () => {
        if (contra !== contraConfirmar) {
            console.error('Las contraseñas no coinciden');
            setTextVisibleError2(true);
            return;
        }
        const loginData = {
            user: user,
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
                if (response.status === 400) {
                    console.error('Usuario existente');
                    setTextVisibleError2(false);

                    setTextVisibleError(true);
                } else {
                    console.error('Error en el servidor');
                }
            }
            if (response.ok) {
                setTextVisibleOk(true);
                setTimeout(() => {
                    navigate('/');
                }, 1500);

            }

            //const data = await response.json();
            //console.log('Respuesta del servidor:', data);
            setTextVisibleError(false);



        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }


    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento de envío por defecto

        // Llamar a la función para iniciar sesión
        SignUpUser();

    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento de envío por defecto

        // Llamar a la función para iniciar sesión
        navigate('/');
    }
    return (

        <main className="container mx-auto flex flex-col h-screen justify-center items-center">
            <div className="w-full sm:max-w-md">

                <h1 className="text-5xl text-red-600 font-extrabold text-center">Registro</h1>
                {textVisibleOk && (
                    <>
                        <h2 className="text-2xl text-red-700 font-bold text-center">¡Cuenta creada!</h2>
                        <h3 className="text-2xl text-red-700 font-bold text-center">Inicie sesión para continuar</h3>

                    </>
                )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="user"
                        value={user}
                        placeholder="Usuario"
                        className="my-1 w-full p-2 border border-gray-300 rounded-lg"
                        onChange={handleUserChange}
                    />
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
                    <input
                        type="password"
                        name="password"
                        value={contraConfirmar}
                        placeholder="Confirmar contraseña"
                        className="my-1 w-full p-2 border border-gray-300 rounded-lg"
                        onChange={handleContraChangeConfirmar}
                    />

                    {textVisibleError && (
                        <h2 className="text-2xl text-red-700 font-bold text-center">¡Ese correo/usuario ya existe!</h2>
                    )}
                    {textVisibleError2 && (
                        <h2 className="text-2xl text-red-700 font-bold text-center">¡Las contraseñas no son iguales!</h2>
                    )}

                    <button
                        type="submit"
                        className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700"
                    >
                        Registrarme
                    </button>
                    <button
                        onClick={handleLogin}
                        className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>

        </main>


    );
};
