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
  const [loginError, setLoginError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const pageCount = Math.ceil(count / 5);

  interface Pokemon {
    id: number;
    name: string;
  }

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedToken = localStorage.getItem('token');
    if (storedLoggedIn === 'true') {
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, name })
    });

    if (response.ok) {
      await fetchPokemon();
    } else {
      console.error('Failed to add pokemon');
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const loginEmail = formData.get('email')?.toString();
    const loginPassword = formData.get('password')?.toString();
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
  
    if (response.ok) {
      const { token } = await response.json();
      setLoggedIn(true);
      localStorage.setItem('token', token);
      localStorage.setItem('loggedIn', 'true');
    } else {
      setLoginError("Invalid email or password");
    }
  }

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const signUpEmail = formData.get('email')?.toString();
    const signUpPassword = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
  
    if (signUpPassword !== confirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }
  
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
    });
  
    if (response.ok) {
      setSuccessMessage('User created successfully');
      setSignUpError('');
    } else {
      setSignUpError('Failed to create user');
    }
  };

  async function deletePokemon(id: number) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  
    if (response.ok) {
      setList(currentList => currentList.filter(pokemon => pokemon.id !== id));
      setCount(currentCount => currentCount - 1);
    } else {
      console.error('Failed to delete pokemon');
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    setList([]);
    setPage(1);
    setCount(0);
    setloginEmail('');
    setLoginPassword('');
    setConfirmPassword('');
    setSignUpEmail('');
    setSignUpPassword('');
    setLoginError('');
    setSignUpError('');
    setSuccessMessage('');
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-white">
      <h2 className="text-7xl font-bold mb-4 text-center w-full absolute top-36">
        <span className="text-red-500" style={{textShadow: '2px 2px #000'}}>P</span>
        <span className="text-blue-500" style={{textShadow: '2px 2px #000'}}>O</span>
        <span className="text-red-500" style={{textShadow: '2px 2px #000'}}>K</span>
        <span className="text-blue-500" style={{textShadow: '2px 2px #000'}}>E</span>
        <span className="text-red-500" style={{textShadow: '2px 2px #000'}}>D</span>
        <span className="text-blue-500" style={{textShadow: '2px 2px #000'}}>E</span>
        <span className="text-red-500" style={{textShadow: '2px 2px #000'}}>X</span>
      </h2>
      {!loggedIn ? (
        <div className="flex justify-end items-center min-h-screen">
          <div className="flex justify-between">
          <form onSubmit={handleLogin} className="w-64 h-80 mr-4 bg-white border border-gray-300 shadow-md p-4 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name= "password"
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
              {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
            </form>
          </div>

          {/* Sign Up */}

          <div className="flex-1 ml-2">
            <form onSubmit={handleSignup} className="w-64 h-80 bg-white border border-gray-300 shadow-md p-4">
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
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
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              {signUpError && <p className="text-red-500 mt-2">{signUpError}</p>}
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <form onSubmit={addPokemon} className="flex gap-8">
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
              <button onClick={handleLogout} className="p-2 bg-purple-800 text-white rounded-lg font-bold uppercase duration-200 hover:bg-purple-700 ml-6">Logout</button>
            </div>
          </div>
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
