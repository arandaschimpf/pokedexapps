import { useState } from "react";
import LoginForm from "../forms/loginForm"; 
import SignUpForm from "../forms/signupForm"; 


function Index() {

    const [activeForm, setActiveForm] = useState<string>(''); // Estado para cambiar entre formularios

    // Funciones para cambiar el formulario activo
    const showLoginForm = () => setActiveForm('login'); // Mostrar formulario de login
    const showSignUpForm = () => setActiveForm('signup'); // Mostrar formulario de registro

    return (
        <>
            <div>                
                <h1>POKEDEX</h1>
                <button onClick={showLoginForm}>Login</button>
                <button onClick={showSignUpForm}>Sign Up</button>
                
                {activeForm === 'login' && <LoginForm />} 
                {activeForm === 'signup' && <SignUpForm />} 
            </div>
        </>
    )
}

export default Index