import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:4321/api';

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const pageCount = Math.ceil(count / 5);

  interface Pokemon {
    id: number;
    name: string;
  }

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const id = parseInt(formData.get('id')?.toString()!, 10);
      const name = formData.get('name');


      const response = await fetch(`${BASE_URL}/pokemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name })
      });

      if (response.ok) {

        await fetchPokemon();
      } else {
        // Handle the case where the request fails
        // You can display an error message or perform other actions
        console.error('Failed to add Pokémon');
      }
  } 


    useEffect(() => {
      const storedLoggedIn = localStorage.getItem('loggedIn');
      if (storedLoggedIn === 'true') {
        setLoggedIn(true);
      }
    }, [])


      useEffect(() => {
        if (loggedIn) {
          fetchPokemon();
        }
      }, [loggedIn, page]);

  async function fetchPokemon() {
      const response = await fetch(`${BASE_URL}/pokemon?page=${page}`);
      const data = await response.json();
      setList(data.list);
      setCount(data.totalCount);
  }




  
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === "test@example.com" && password === "hola") {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError("Invalid email or password");
    }
  }



    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const registerEmail = formData.get('email')?.toString();
      const registerPassword = formData.get('password')?.toString();
      const response = await fetch(`${BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: registerEmail, password: registerPassword })
      });


      if (response.ok) {
        // User created successfully
        // You can redirect the user to the login screen or show a success message
        console.log('User created successfully');
      } else {
        // Handle errors
        setError('Failed to create user');
      }
    };






  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE'
    });
    setList(currentList => currentList.filter(pokemon => pokemon.id !== id));
    setCount(currentCount => currentCount - 1);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    setList([]);
    setPage(1);
    setCount(0);
    setEmail('');
    setPassword('');
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-center border-4 border-gray-700;">
    {!loggedIn ? (
      <div>
        <form onSubmit={handleLogin} className="mx-auto mt-8">
          <h2 className="text-2xl text-center mb-4">Inicie sesión</h2>
          <input
            type="email" placeholder="E-mail"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4" required/>
          <input
            type="password" placeholder="Contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4" required/>
          <button type="submit"
            className="w-full p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-red-700">
            Iniciar sesión
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <form onSubmit={handleRegister} className="mx-auto mt-8">
            <h2 className="text-2xl text-center mb-4">Regístrese</h2>
            <input type="email" name="email" placeholder="E-mail"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4" required/>
            <input type="password" name="password" placeholder="Contraseña"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4" required/>
            <button type="submit"
              className="w-full p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-red-700">
              Registrarse
            </button>
            <div className="mt-4"></div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
      </div>
      ) : (
        <main className="container mx-auto flex flex-col">
		<h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
		<form action="/api/pokemon" method="post" onSubmit={addPokemon}>
			<h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
			<input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
		</form>
		<ul className="mt-4 border-4 border-red-700">
			<li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
				<span className="text-lg text-white font-extrabold w-1/3">ID</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
			</li>
			{list.map(pokemon => (
				<li className="flex items-center justify-between border-b border-gray-300 p-2">
					<span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
					<span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
					<div className="w-1/3 text-right">
						<button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>	
					</div>
				</li>
			))}
		</ul>
    <div className="flex justify-center gap-2">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span className="flex items-center self-stretch">{page}</span>
      <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
	</main>
      )}
    </main>
  );
}