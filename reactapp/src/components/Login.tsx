import { useState } from "react";
import { BASE_URL } from "../App";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils/fetchClient";

export default function Login(){
    const [redirected,setRedirected] = useState(false);

    async function authUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event. currentTarget
        const data = new FormData(form)
        const user = {
            email : data.get('email') as string,
            password : data.get('password') as string
        }

        const response = await fetch(`${BASE_URL}/auth`,{
            method : 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        })    

        form.reset();
        if (response.ok){
            setRedirected(true);
            const {token} = await response.json();
            localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
        }
    } 

    if (redirected){
        window.location.href = 'http://localhost:5173/Home'
    }

    return(

        <form onSubmit={authUser}>
        <label form="email">Email</label>
        <input className="border px-2" type="email" id="email" name="email" required/>
        <label form="password">Password</label>
        <input className="border px-2" type="password" id="password" name="password" required/>
        <button className="bg-red-600 text-white px-2 py-1" type="submit">Iniciar sesion</button>
        </form>
    )
}