import { useEffect, useState } from "react"


type Pokemon = {
  id: number
  name: string
}

const BASE_URL = 'http://localhost:3000'

export default function App() {
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [newPokemonName, setNewPokemonName] = useState('');
  const [newPokemonId, setNewPokemonId] = useState('');
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchPokemon();
  }, [page]);

async function fetchPokemon() {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    setList(data); // Assuming data is an array of Pokemon
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  }
}


  // ADDDDDD
  const AddPokemon = (event: React.FormEvent) => {
    event.preventDefault();
  
    const newPokemon = { id: newPokemonId, name: newPokemonName };
  
    fetch(('http://localhost:3000'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPokemon),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
    })
    .then(() => {
      setList(prevList => [...prevList, newPokemon]); //actualiza el estado list en el componente de react
      setNewPokemonName('');
      setNewPokemonId('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  //DELETEEEE
  async function deletePokemon(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete Pokemon');
    }

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)


  }

  async function handlePageChange(newPage: number) {
    setPage(newPage);
  }
    

  


// ...

return (
  <main className="container mx-auto flex flex-col">
    <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <form action="/api/pokemon" method="post" onSubmit={AddPokemon}>
    <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
    <input type="number" name="id" value={newPokemonId} placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" onChange={(e) => setNewPokemonId(e.target.value)} />
    <input type="text" name="name"  value={newPokemonName} placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg"   onChange={(e) => setNewPokemonName(e.target.value)}/>
    <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>

      </form>
    
    <ul className="mt-4 border-4 border-red-700">
    <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
				<span className="text-lg text-white font-extrabold w-1/3">ID</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
			</li>
 
      {list && list.map((pokemon) => (
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
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    
  </main>
)
}