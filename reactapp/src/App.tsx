import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:4321/api';

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null); // State to store JWT token

  const pageCount = Math.ceil(count / 5);

  interface Pokemon {
    id: number;
    name: string;
  }

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedToken = localStorage.getItem('token'); // Retrieve token from local storage
    if (storedLoggedIn === 'true' && storedToken) {
      setLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchPokemon();
    }
  }, [loggedIn, page]);

  async function fetchPokemon() {
    const response = await fetch(`${BASE_URL}/pokemon?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    const data = await response.json();
    setList(data.list);
    setCount(data.totalCount);
  }

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const id = parseInt(formData.get('id')?.toString()!, 10);
    const name = formData.get('name');
    
    const response = await fetch(`${BASE_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token in headers
      },
      body: JSON.stringify({ id, name })
    });
  
    if (response.ok) {
      await fetchPokemon();
    } else {
      console.error('Failed to add Pokémon');
    }
  }
  

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const loginEmail = formData.get('email')?.toString();
    const loginPassword = formData.get('password')?.toString();
    
    // Make a request to the login endpoint with the entered email and password
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
  
    if (response.ok) {
      // Retrieve the JWT token from the response
      const { token } = await response.json();
      // Set the loggedIn state to true
      setLoggedIn(true);
      // Store the JWT token in local storage
      localStorage.setItem('token', token);
      // Store the loggedIn state in local storage
      localStorage.setItem('loggedIn', 'true');
    } else {
      // Handle login errors
      setError("Invalid email or password");
    }
  }

  /**/
  

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const registerEmail = formData.get('email')?.toString();
    const registerPassword = formData.get('password')?.toString();
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: registerEmail, password: registerPassword }),
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
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    setList(currentList => currentList.filter(pokemon => pokemon.id !== id));
    setCount(currentCount => currentCount - 1);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token'); // Remove token from local storage on logout
    setList([]);
    setPage(1);
    setCount(0);
    setEmail('');
    setPassword('');
    setToken(null); // Clear token state
  }

  return (
   
  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 from-purple-500 to-pink-500 min-h-screen">
    <main className="container mx-auto flex flex-col " >
      {!loggedIn ? (
        <div>
         <form onSubmit={handleLogin} className="mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <input
                type="email"
                name="email" // Add name attribute
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                name="password" // Add name attribute
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-yellow-700"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

          <form onSubmit={handleRegister} className="mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              required
            />
            <button
              type="submit"
              className=" w-full p-2 bg-blue-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-yellow-700"
            >
              Register
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <form onSubmit={addPokemon} className="flex gap-2">
              <input
                type="number"
                name="id"
                placeholder="ID"
                className="p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-2 border border-gray-300 rounded-lg"
              />
              <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-blue-700">Add Pokémon</button>
            </form>
            <div>
              <button onClick={handleLogout} className="p-2 bg-blue-600 text-white rounded-lg font-bold uppercase duration-200 hover:bg-blue-700">Logout</button>
            </div>
          </div>
          <h1 className="text-5xl text-red-600 font-extrabold text-center mb-4">Pokedex</h1>
          <ul className="mt-4 border-4 border-red-700">
            <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
              <span className="text-lg text-white font-extrabold w-1/3">ID</span>
              <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
              <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
            </li>
            {list.map(pokemon => (
              <li key={pokemon.id} className="flex items-center justify-between border-b border-gray-300 p-2">
                <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
                <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
                <div className="w-1/3 text-right">
                  <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
            <span className="flex items-center self-stretch">{page}</span>
            <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
          </div>
        </div>
      )}
    </main>
    </div>
  );
}
