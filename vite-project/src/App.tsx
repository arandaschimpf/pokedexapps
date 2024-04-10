import { useEffect, useState } from "react"
const BASE_URL = 'http://localhost:4321/api'

function App() {
  const [pokemon, setPokemon] = useState([{id : 1, name: "Clefairy"}])
  const [page, setPage] = useState([{}])
  useEffect(()=>{
    fetch(`${BASE_URL}/pokemon.json?page=${page}`).then(response => response.json()).then(pokemon => setPokemon(pokemon))
    
  }, [page])
  return (
    <main className="container mx-auto flex flex-col">
		<h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
		<form action="/api/pokemon" method="post">
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
			{pokemon.map(pokemon => (
				<li className="flex items-center justify-between border-b border-gray-300 p-2">
					<span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
					<span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
					<form action={`/api/pokemon/${pokemon.id}`} method="post" className="w-1/3 text-right">
						<button type="submit" className="font-bold hover:font-extrabold">X</button>	
					</form>
				</li>
			))}
		</ul>
	</main>
  )
}

export default App
