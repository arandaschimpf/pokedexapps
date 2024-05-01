import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


type Pokemon = {
  idPoke: number;
  pokemonName: string;
};

const BASE_URL = 'http://localhost:3000/pokemon'

export default function App() {
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [newPokemonName, setNewPokemonName] = useState('');
  const [newPokemonId, setNewPokemonId] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();


  const handleIdPokeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPokemonId(event.target.value); // Update newPokemonId state
  };
  const handleNamePokeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPokemonName(event.target.value);
  };
  useEffect(() => {
    ListarPokemones(page);
  }, [page]);

  const ListarPokemones = async (pageNumber: number) => {
    try {
      const response = await fetch(`${BASE_URL}?page=${pageNumber}`, { credentials: 'include' });
      if (!response.ok) {
        if (response.status === 401) {
          navigate('/');
        } else {
          throw new Error('Failed to fetch data');
        }
      }
      const data = await response.json();
      setList(data.pokemons);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }


  //Añadir Pokemones
  const AgregarPokemon = async () => {
    const idPoke = parseInt(newPokemonId);

    const newPokemon = { idPoke, pokemonName: newPokemonName };
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorMessage = await response.text();
          console.error('Pokemon existente:', errorMessage);
          setTextVisible(true);
        } else {
          throw new Error('Error en el servidor');
        }
      } else {
        setTextVisible(false);

        const pokemon = await response.json();
        console.log('Respuesta del servidor:', pokemon);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Eliminar pokemon
  const deletePokemon = async (id: number) => {
    console.log('Deleting Pokemon:', id);
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include'

      });
      if (!response.ok) {
        throw new Error('Failed to delete Pokemon');
      }
      // Actualizar la lista después de eliminar el Pokémon
      ListarPokemones(page);
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
    }
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    AgregarPokemon();
  };


  return (
    <main className="container mx-auto flex flex-col">
      <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <form onSubmit={handleSubmit} method="post" >
        <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
        <input type="number" name="id" onChange={handleIdPokeChange} value={newPokemonId} placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" onChange={(e) => setNewPokemonId(e.target.value)} />
        <input type="text" name="name" onChange={handleNamePokeChange} value={newPokemonName} placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" onChange={(e) => setNewPokemonName(e.target.value)} />
        {textVisible && (
          <h2 className="text-2xl text-red-700 font-bold text-center">¡Ese pokemon ya existe!</h2>
        )}
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
            <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.idPoke}</span>
            <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.pokemonName}</span>
            <div className="w-1/3 text-right">

              <button onClick={() => deletePokemon(pokemon.idPoke)} className="font-bold text-red-700 hover:font-extrabold">X</button>

            </div>
          </li>

        ))}
      </ul>
      <div className="flex justify-center gap-2">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    </main>
  )
}


