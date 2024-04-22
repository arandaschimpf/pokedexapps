
import { useEffect, useState } from "react"

type Pokemon = {
  id: number
  name: string
}

const BASE_URL = 'http://localhost:4321/api'

export default function App() {
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const pageCount = Math.ceil(count / 5)

  useEffect(() => {
    let cancelled = false
    fetch(`${BASE_URL}/pokemon?page=${page}`)
      .then((res) => res.json()) 
      .then((data) => {
        if (!cancelled) {
          setList(data.list)
          setCount(data.totalCount)
        }
      })
    return () => {
      cancelled = true
    }
  }, [page])

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

    await fetch(`${BASE_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })

    form.reset()
    if (page === pageCount && list.length < 5) {
      setList(current => [...current, pokemon])
    }
    setCount(current => current + 1)
  }

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)

    if (page >= pageCount) {
      setPage(page - 1)
    }
    console.log(count)
  }

  return (
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
				<li key={pokemon.id} className="flex items-center justify-between border-b border-gray-300 p-2">
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
  )
}





























/*
import { useState, useEffect } from "react";
import { registerUser } from "../../server/src/pages/api/registerUser";
import { loginUser } from "../../server/src/pages/api/loginUser";

type Pokemon = {
  id: number;
  name: string;
};



const hardcodedCredentials = {
  email: "test@example.com",
  password: "hola"
};

const BASE_URL = 'http://localhost:4321/api';

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registrationError, setRegistrationError] = useState<string>('');

  const pageCount = Math.ceil(count / 5);

  useEffect(() => {
    // Check if user is logged in
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
      fetchPokemon();
    }
  }, []);

  async function fetchPokemon() {
    const response = await fetch(`${BASE_URL}/pokemon?page=${page}`);
    const data = await response.json();
    setList(data.list);
    setCount(data.count);
  }

  

async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
    const token = await loginUser(email, password); // Assuming loginUser makes a POST request to your server's login endpoint
    localStorage.setItem('jwt', token);
    setLoggedIn(true);
  } catch (error) {
    setError('Invalid email or password');
  }
}



  async function handleRegistration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const success = await registerUser(email, password);
      if (success) {
        setLoggedIn(true);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  }

  async function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setList([]);
    setPage(1);
    setCount(0);
    setEmail('');
    setPassword('');
    setError('');
  }



  

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    // Check if the user is logged in before adding a Pokemon
    if (!loggedIn) {
      setError("You need to be logged in to add a Pokémon");
      return;
    }
  
    const form = event.currentTarget;
    const data = new FormData(form);
  
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    };
  
    const response = await fetch(`${BASE_URL}/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    });
  
    const obj = await response.json();
  
    if (obj.error) {
      setError(obj.error);
      return;
    }
  
    form.reset();
    if (list.length < 5) {
      setList(current => [...current, pokemon]);
    }
    setCount(current => current + 1);
    // Refetch the Pokémon list to update the count
    await fetchPokemon();
  }
  
  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}`, {
      method: 'DELETE'
    });
  
    setList(current => current.filter(pokemon => pokemon.id !== id));
    setCount(current => current - 1);
  
    // Refetch the Pokémon list to update the count
    await fetchPokemon();
  }

  /*
  if (!loggedIn) {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
       <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
      Email
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
      Password
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <p className="text-red-500 text-xs italic">{error}</p>
  </div>
  <div className="flex items-center justify-between">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Sign In
            </button>
          </div>
        </form>

      </div>
    );
  }
  */

  
