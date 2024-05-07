import { useEffect} from "react";

const BASE_URL = 'http://localhost:3000/auth/login';

export default function App() {
   // const [user, setUser] = useState([]);
    useEffect(() => {
        document.title = "Login";
    }, []);

    
    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const user = {
            email: data.get('email') as string,
            password: data.get('password') as string
        }
        //console.log(user);
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const jwt = await response.text();
                //redigir usuario despues del login
                localStorage.setItem('jwt', jwt);
                window.location.href = 'http://localhost:5173/'
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        }   

    }
    
    
    return (
        <div>
          <h1>Login</h1>
          <form onSubmit={login}>
            <label htmlFor="email">Email</label>
            <input className="border px-2" type="email" id="email" name="email" required/>
            <label htmlFor="password">Password</label>
            <input className="border px-2" type="password" id="password" name="password" required/>
            <button className="bg-red-600 text-white px-2 py-1" type="submit">Iniciar sesion</button>
            <button className="bg-blue-600 text-white px-2 py-1" type="button" onClick={() => window.location.href = 'http://localhost:5173/signup'}>Crear una cuenta</button>
          </form>
        </div>
    )
}