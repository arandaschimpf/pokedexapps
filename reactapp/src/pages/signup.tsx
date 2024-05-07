import { useEffect} from "react";
const BASE_URL = 'http://localhost:3000/auth/signup';


export default function App() {
    useEffect(() => {
        document.title = "Signup";
    }, []);

    async function signup(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const form = event.currentTarget;
        const data = new FormData(form);
        const user = {
            email: data.get('email') as string,
            password: data.get('password') as string
      }
      try{
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (response.ok) {
            const jwt = await response.json();
            console.log(jwt);
            localStorage.setItem('jwt', jwt);
            //redigir usuario despues del login
            window.location.href = 'http://localhost:5173/login'
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch failed:', error);
    }   
  }


    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={signup}>
            <label htmlFor="email">Email</label>
            <input className="border px-2" type="email" id="email" name="email" required/>
            <label htmlFor="password">Password</label>
            <input className="border px-2" type="password" id="password" name="password" required/>
            <button className="bg-blue-600 text-white px-2 py-1" type="submit">Registrarse</button>
            <button className="bg-red-600 text-white px-2 py-1" type="button" onClick={() => window.location.href = 'http://localhost:5173/login'}>Iniciar Sesión</button>
        </form>
      </div>
    )
  }
 