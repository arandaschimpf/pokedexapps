import React, { useState, useEffect } from "react"; 
const BASE_URL = 'http://localhost:4321/api';

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

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
      console.error('Failed to add Pokémon');
    }
  }

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

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
    if (loginEmail === "gabriel.blanco@gmail.com" && loginPassword === "123456") {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError("Invalid email or password");
    }
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signUpPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ signUpEmail, signUpPassword })
    });

    if (response.ok) {
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError("Failed to sign up");
    }
  }

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
    setloginEmail('');
    setLoginPassword('');
    setConfirmPassword('');
  }

  return (
    <main className="container mx-auto flex flex-col">
      {!loggedIn ? (
        <div className="flex justify-between">
          <div className="flex-1 mr-2">
            <form onSubmit={handleLogin} className="mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 hover:bg-purple-700"
              >
                Login
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>

          {/* Sign Up */}

          <div className="flex-1 ml-2">
            <form onSubmit={handleSignup} className="mx-auto mt-8">
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 hover:bg-purple-700"
              >
                Sign Up
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
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
              <button type="submit" className="p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 hover:bg-purple-700">Add Pokémon</button>
            </form>
            <div>
              <button onClick={handleLogout} className="p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 hover:bg-purple-700">Logout</button>
            </div>
          </div>
          <h1 className="text-5xl text-purple-800 font-extrabold text-center mb-4">Pokedex</h1>
          <ul className="mt-4 border-4 border-purple-800">
            <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-purple-800">
              <span className="text-lg text-white font-extrabold w-1/3">ID</span>
              <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
              <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
            </li>
            {list.map(pokemon => (
              <li key={pokemon.id} className="flex items-center justify-between border-b border-gray-300 p-2">
                <span className="text-lg text-purple-800 font-bold w-1/3">{pokemon.id}</span>
                <span className="text-lg text-purple-800 font-bold w-1/3 text-center">{pokemon.name}</span>
                <div className="w-1/3 text-right">
                  <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-purple-700">Prev</button>
            <span className="flex items-center self-stretch">{page}</span>
            <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-purple-700">Next</button>
          </div>
        </div>
      )}
    </main>
  );
}
