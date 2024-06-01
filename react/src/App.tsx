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
    fetch(`${BASE_URL}/pokemon.json?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data.list)
        setCount(data.count)
      })
  }, [page])

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

    await fetch(`${BASE_URL}/pokemon.json`, {
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
    
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
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
		<h1 className="m-6 text-8xl text-[#522b5b] font-extrabold text-center">Pokedex</h1>
		<h2 className="m-1 text-2xl text-[#522b5b] font-bold">Agregar nuevo pokemon</h2>
		<form className="flex" action="/api/pokemon" method="post" onSubmit={addPokemon}>
      <input type="number" name="id" placeholder="ID" className="w-24 p-2 border-2 m-1 text-[#dfb6b2] font-bold placeholder:text-[#dfb6b2] border-[#dfb6b2] bg-[#522b5b] bg-opacity-50 rounded-lg" />
			<input type="text" name="name" placeholder="Name" className="w-full p-2 border-2 m-1 text-[#dfb6b2] font-bold placeholder:text-[#dfb6b2] border-[#dfb6b2] bg-[#522b5b] bg-opacity-50 rounded-lg" />
			<button type="submit" className="p-2 bg-[#854f8c] text-white rounded-lg m-1 font-bold uppercase duration-200 hover:bg-[#522b5b]">Add</button>
		</form>
		<ul className="mt-4 border-8 bg-[#854f8c] border-[#854f8c] rounded-xl">
			<li className="flex items-center justify-between border-[#dfb6b2] border-b-4 rounded-lg p-2 bg-[#854f8c]">
				<span className="text-lg text-[#dfb6b2] font-extrabold w-1/3">ID</span>
				<span className="text-lg text-[#dfb6b2] font-extrabold w-1/3 text-center">Name</span>
				<span className="text-lg text-[#dfb6b2] font-extrabold w-1/3 text-right">DELETE</span>
			</li>
			{list.map(pokemon => (
				<li className="flex items-center justify-between border-b-4 rounded-lg m-2 border-[#dfb6b2] p-2">
					<span className="text-lg text-[#dfb6b2] font-bold w-1/3">{pokemon.id}</span>
					<span className="text-lg text-[#dfb6b2] font-bold w-1/3 text-center">{pokemon.name}</span>
					<div className="w-1/3 text-right">
						<button onClick={(event) => {deletePokemon(pokemon.id); event.preventDefault();}} className="font-bold hover:font-extrabold text-[#dfb6b2]">X</button>	
					</div>
				</li>
			))}
		</ul>
    <div className="flex justify-center gap-2">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-[#854f8c] text-[#dfb6b2] rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-[#522b5b]">Prev</button>
      <span className="flex items-center self-stretch">{page}</span>
      <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-[#854f8c] text-[#dfb6b2] rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-[#522b5b]">Next</button>
    </div>
	</main>
  )
}