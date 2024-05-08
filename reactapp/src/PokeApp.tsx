import { useEffect, useState } from "react" 

type Pokemon = { // Tipo para representar un pokemon
  id: number
  name: string
}

const BASE_URL = 'http://localhost:4321/api' // URL base del servidor

export  function PokeApp() { 
  const [list, setList] = useState<Pokemon[]>([]) // Lista de pokemones
  const [page, setPage] = useState(1) // Página actual
  const [count, setCount] = useState(0) // Cantidad total de pokemones
  const pageCount = Math.ceil(count / 5) // Cantidad de páginas

  useEffect(() => { // Efecto para cargar la lista de pokemones
    let cancelled = false // Variable para saber si el efecto fue cancelado
    fetch(`${BASE_URL}/pokemon.json?page=${page}`) // Hace una petición GET al servidor
      .then((res) => res.json()) // Convierte la respuesta a un objeto JSON
      .then((data) => { // Cuando se resuelva la promesa
        if (!cancelled) { // Si el efecto no fue cancelado
          setList(data.list) // Actualiza la lista de pokemones
          setCount(data.count) // Actualiza la cantidad total de pokemones
        }
      })

    return () => {
      cancelled = true // Cuando el componente se desmonte, cancela el efecto
    }
  }, [page]) // Se ejecuta cuando la página cambie

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault() // Evita que el formulario se envíe por defecto

    const form = event.currentTarget 
    const data = new FormData(form) // Obtiene los datos del formulario
    const pokemon = { // Crea un objeto pokemon con los datos del formulario
      id: parseInt(data.get('id') as string), 
      name: data.get('name') as string
    }

    await fetch(`${BASE_URL}/pokemon.json`, { // Hace una petición POST al servidor
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon) // Convierte el objeto pokemon a un string JSON
    })

    form.reset() // Limpia el formulario
    if (page === pageCount && list.length < 5) { // Si estamos en la última página y hay menos de 5 pokemones en la lista
      setList(current => [...current, pokemon]) // Agrega el nuevo pokemon a la lista
    }
    setCount(current => current + 1) // Incrementa el contador de pokemones
  }

  async function deletePokemon(id: number) { // Función para eliminar un pokemon
    await fetch(`${BASE_URL}/pokemon/${id}.json`, { // Hace una petición DELETE al servidor
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id)) // Filtra la lista para eliminar el pokemon con el id dado
    setCount(current => current - 1) // Decrementa el contador de pokemones

    if (page >= pageCount) { // Si estamos en la última página
      setPage(page - 1) // Retrocede una página
    }
  }

  return ( // Renderiza el component
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
  )
}