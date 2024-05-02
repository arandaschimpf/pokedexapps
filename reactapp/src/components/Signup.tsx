import { BASE_URL } from "../App"
import {useState} from 'react'

export default function Signup(){
    const [redirected, setRedirected] = useState(false);

        async function  addUser(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();

    
            const form = event. currentTarget
            const data = new FormData(form)
            const user = {
                email : data.get('email') as string,
                password : data.get('password') as string
            }
            
            const response = await fetch(`${BASE_URL}`,{
                method : 'POST', 
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })

            form.reset();

            if (response.ok){
                setRedirected(true);
            }
        }
        
        if (redirected){
            window.location.href = 'http://localhost:5173/login'
        }
    
    return(
        <form onSubmit={addUser}>
            <label form="email">Email</label>
            <input className="border px-2" type="email" id="email" name="email" required/>
            <label form="password">Password</label>
            <input className="border px-2" type="password" id="password" name="password" required/>
            <button className="bg-blue-600 text-white px-2 py-1" type="submit">Registrarse</button>
        </form>
    )
}