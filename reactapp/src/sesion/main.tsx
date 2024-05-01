import { useEffect, useState } from "react"

type Pokemon = {
  id: number
  name: string
}

const BASE_URL = `http://localhost:${import.meta.env.VITE_API_PORT}`;

function Pokemones() {
  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const pageCount = Math.ceil(count / 5)

  useEffect(() => {
    let cancelled = false;
  
    fetch(`${BASE_URL}/pokemon?page=${page}`)
      .then((res) => {
        console.log('Respuesta:', res); // Verifica la respuesta
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          console.log('Datos recibidos:', data); // Verifica los datos
          setList(data.list);
          setCount(data.count);
        }
      })
      .catch((error) => {
        console.error('Error fetching Pokémon:', error);
      });
  
    return () => {
      cancelled = true;
    };
  }, [page]);

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
			{list && list.length > 0 ? (
          list.map(pokemon => (
              <li className="flex items-center justify-between border-b border-gray-300 p-2">
                  <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
                  <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
                  <div className="w-1/3 text-right">
                      <button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>	
                  </div>
              </li>
          ))
        ) : (
            <div>No se encontraron Pokémon</div>
      )}
		</ul>
    <div className="flex justify-center gap-2">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span className="flex items-center self-stretch">{page}</span>
      <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
	</main>
  )
}

export default Pokemones