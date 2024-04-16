<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  interface Pokemon {
    id: number;
    name: string;
  }

  let BASE_URL: string = 'http://localhost:4321/api';

  const list = writable<Pokemon[]>([]);
  const page = writable<number>(1);
  const count = writable<number>(0);
  let pageCount = Math.ceil($count / 5);
    
    $: $page, fetchData();

  async function fetchData() {
    try {
      const res = await fetch(`${BASE_URL}/pokemon.json?page=${$page}`);
      const data = await res.json();
      list.set(data.list);
      count.set(data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
    fetchData();
  });

  async function addPokemon(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const pokemon: Pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    };

    await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    });

    form.reset();
    if ($page === Math.ceil($count / 5) && $list.length < 5) {
      list.update(current => [...current, pokemon]);
    }
    count.update(current => current + 1);
  }

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    });

    list.update(current => current.filter(pokemon => pokemon.id !== id));
    count.update(current => current - 1);

    if ($page >= Math.ceil($count / 5)) {
      page.update(page => page - 1);
    }
  }
</script>

<main class="container mx-auto flex flex-col">
  <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
  <form on:submit={addPokemon}>
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
    {#each $list as pokemon}
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
    <button on:click={() => page.update(c => Math.max(1, c - 1))} disabled={$page === 1} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
    <span class="flex items-center self-stretch">{$page}</span>
    <button on:click={() => page.update(c => Math.min($count, c + 1))} disabled={$page === Math.ceil($count / 5)} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
  </div>
</main>
