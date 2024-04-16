<script lang="ts">
  import { onMount } from 'svelte';
  
  type Pokemon = {
    id: number;
    name: string;
  };
  
  const BASE_URL:string = 'http://localhost:4321/api';
  let list: Pokemon[] = [];
  let page = 1;
  let count = 0;
  let pageCount = Math.ceil(count / 5);
  
  async function fetchData() {
    const response = await fetch(`${BASE_URL}/pokemon.json?page=${page}`);
    const data = await response.json();
    list = data.list;
    count = data.count;
    pageCount = Math.ceil(count / 5);
  }
  
  onMount(fetchData);
  
  async function addPokemon(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const id: number = parseInt(formData.get('id') as string);
    const name: string = formData.get('name') as string;
    const response = await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name })
    });
    if (response.ok) {
      form.reset();
      if (page === pageCount && list.length < 5) {
        list = [...list, { id, name }];
      }
      count += 1;
    }
  }
  
  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    });
    list = list.filter(pokemon => pokemon.id !== id);
    count -= 1;
    if (page >= pageCount) {
      page -= 1;
    }
  }
  
  function prevPage() {
    page = Math.max(1, page - 1);
    fetchData();
  }
  
  function nextPage() {
    page = Math.min(pageCount, page + 1);
    fetchData();
  }
</script>

<main class="container mx-auto flex flex-col">
  <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
  <form on:submit={addPokemon}>
    <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
    <input type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
    <input type="text" name="name" placeholder="Nombre" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
    <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
  </form>
  <ul class="mt-4 border-4 border-red-700">
    <li class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
      <span class="text-lg text-white font-extrabold w-1/3">ID</span>
      <span class="text-lg text-white font-extrabold w-1/3 text-center">Nombre</span>
      <span class="text-lg text-white font-extrabold w-1/3 text-right">BORRAR</span>
    </li>
    {#each list as pokemon (pokemon.id)}
      <li class="flex items-center justify-between border-b border-gray-300 p-2">
        <span class="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
        <span class="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
        <div class="w-1/3 text-right">
          <button on:click={() => deletePokemon(pokemon.id)} class="font-bold hover:font-extrabold">X</button> 
        </div>
      </li>
    {/each}
  </ul>
  <div class="flex justify-center gap-2">
    <button on:click={prevPage} disabled={page === 1} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700" class:disabled={page === 1}>Anterior</button>
    <span class="flex items-center self-stretch font-mono font-bold ">{page}</span>
    <button on:click={nextPage} disabled={page === pageCount} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700" class:disabled={page === pageCount}>Siguiente</button>
  </div>
</main>
