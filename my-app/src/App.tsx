import { createSignal, createEffect } from "solid-js"

type Pokemon = {
  id: number
  name: string
}

const BASE_URL = 'http://localhost:4321/api'

export default function App() {
  const [list, setList] = createSignal<Pokemon[]>([])
  const [page, setPage] = createSignal(1)
  const [count, setCount] = createSignal(0)
  const [pageCount, setPageCount] = createSignal(1)

  createEffect(() => {
    let cancelled = false
    fetch(`${BASE_URL}/pokemon.json?page=${page()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setList(data.list)
          setCount(data.count)        
        }})
        if (count()) {
          setPageCount(Math.ceil(count() / 5))
        }
    return () => {
      cancelled = true
    }
  }, [page])

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    })

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)

    if (page >= pageCount) {
      setPage(page() - 1)
    }
  }

  async function addPokemon(event: Event) {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
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

  return (
    <main class="container">
		<h1>Pokedex (Solid)</h1>
		<form action="/api/pokemon" method="post" onSubmit={addPokemon}>
			<h2>Agregar un nuevo pokemon</h2>
			<input type="number" name="id" placeholder="Id" />
			<input type="text" name="name" placeholder="Nombre" />
			<button type="submit">Agregar</button>
		</form>
		<ul>
			<li>
				<span>Id</span>
				<span>Nombre</span>
				<span>Eliminar</span>
			</li>
			{list().map(pokemon => (
				<li>
					<span>{pokemon.id}</span>
					<span>{pokemon.name}</span>
					<div>
						<button onClick={() => deletePokemon(pokemon.id)}>x</button>	
					</div>
				</li>
			))}
		</ul>
    <div class="pagination">
      <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page() === 1}>Anterior</button>
      <span>{page()}</span>
      <button onClick={() => setPage(c => Math.min(pageCount(), c + 1))} disabled={page === pageCount}>Siguiente</button>
    </div>
	</main>
  )
}