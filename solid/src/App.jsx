import { createSignal, createEffect } from 'solid-js';

const BASE_URL = 'http://localhost:4321/api';

export default function App() {
  let [list, setList] = createSignal([]);//crea la lista
  let [page, setPage] = createSignal(1);//almacena el número de paginas
  let [count, setCount] = createSignal(0); //almacena el número total de elementos de la lista

  createEffect(() => {
    fetch(`${BASE_URL}/pokemon.json?page=${page()}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data.list);
        setCount(data.count);
      });
  });

  createEffect(() => {
    // Calcular pageCount cada vez que cambia count
    let pageCount = Math.ceil(count() / 5);

    // Actualizar page si es mayor a pageCount
    if (page() > pageCount && pageCount > 0) {
      setPage(pageCount);
    }
  });

  async function addPokemon(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const pokemon = {
      id: parseInt(data.get('id')),
      name: data.get('name')
    };

    await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    });

    form.reset();
    if (page() === pageCount && list().length < 5) {
      setList([...list(), pokemon]);
    }
    setCount(count() + 1);
  }

  async function deletePokemon(id) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    });

    setList(list().filter(pokemon => pokemon.id !== id));
    setCount(count() - 1);

    if (page() >= pageCount) {
      setPage(page() - 1);
    }
  }

  return (
    <main class="container mx-auto flex flex-col">
      <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <form action="/api/pokemon" method="post" onSubmit={addPokemon}>
        <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
        <input type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <input type="text" name="name" placeholder="Name" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
        <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
      </form>
      <ul class="mt-4 border-4 border-red-700">
        <li class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
          <span class="text-lg text-white font-extrabold w-1/3">ID</span>
          <span class="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
          <span class="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
        </li>
        {list().map(pokemon => (
          <li class="flex items-center justify-between border-b border-gray-300 p-2">
            <span class="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
            <span class="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
            <div class="w-1/3 text-right">
              <button onClick={() => deletePokemon(pokemon.id)} class="font-bold hover:font-extrabold">X</button>  
            </div>
          </li>
        ))}
      </ul>
      <div class="flex justify-center gap-2">
      <button onClick={() => setPage(Math.max(1, page() - 1))} disabled={page() === 1} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <span class="flex items-center self-stretch">{page()}</span>
        <button onClick={() => setPage(Math.min(Math.ceil(count() / 5), page() + 1))} disabled={page() === Math.ceil(count() / 5)} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    </main>
  );
}
