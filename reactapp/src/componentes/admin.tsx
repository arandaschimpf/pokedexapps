import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"

type Pokemon = {
  id: number
  name: string
}


//server nestjs
const BASE_URL = 'http://localhost:3000/pokemon'

export  function Admin() {

  const navigate = useNavigate()


  const [list, setList] = useState<Pokemon[]>([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const pageCount = Math.ceil(count / 5)

  const jwt = Cookies.get('user');
  useEffect(() => {
    let cancelled = false
    fetch(`${BASE_URL}/${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setList(data.list)
          setCount(data.count)
          const jwt = Cookies.get('user');
          console.log("jwt:::: ",jwt)
        }
        
      })

    return () => {
      cancelled = true
    }
  }, [page])

  useEffect(() => {

    
    console.log(jwt)
    if(!jwt) return navigate("/login")
    
  })

  async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

  await fetch(`${BASE_URL}`, {
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
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)

    if (page >= pageCount && list.length === 1 && page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <main className="container mx-auto flex flex-col pt-10">
		<h1 className="text-5xl text-blue-600 font-extrabold text-center">Pokedex</h1>
		<form action="/api/pokemon" method="post" onSubmit={addPokemon}>
			<h2 className="text-2xl text-blue-700 font-bold">Agregar nuevo pokemon</h2>
			<input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
			<button type="submit" className="w-full p-2 bg-green-500 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-blue-700">Agregar</button>
		</form>
		<ul className="mt-4 border-4 border-black-700">
			<li className="flex items-center justify-between border-b border-gray-300 p-2 bg-green-700">
				<span className="text-lg text-white font-extrabold w-1/3">ID</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
				<span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
			</li>
			{list.map(pokemon => (
				<li className="flex items-center justify-between border-b border-gray-300 p-2">
					<span className="text-lg text-black-600 font-bold w-1/3">{pokemon.id}</span>
					<span className="text-lg text-black-600 font-bold w-1/3 text-center">{pokemon.name}</span>
					<div className="w-1/3 text-right">
						<button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>	
					</div>
				</li>
			))}
		</ul>
    <div className="flex justify-center gap-2">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-green-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-green-700">Prev</button>
      <span className="flex items-center self-stretch">{page}</span>
      <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-green-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-green-700">Next</button>
    </div>
	</main>
  )
}

