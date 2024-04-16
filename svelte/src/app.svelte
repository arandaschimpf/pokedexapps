<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let list = writable([]);
    let page = 1;
    let count = 0;
    let pageCount = Math.ceil(count / 5);
    const BASE_URL = 'http://localhost:4321/api';
  
    const addPokemon = async (event) => {
      event.preventDefault();
  
      const form = event.target;
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
      if (page === pageCount && list.length < 5) {
        list.update(current => [...current, pokemon]);
      }
      count++;
    };
  
    const deletePokemon = async (id) => {
      await fetch(`${BASE_URL}/pokemon/${id}.json`, {
        method: 'DELETE'
      });
  
      list.update(current => current.filter(pokemon => pokemon.id !== id));
      count--;
  
      if (page >= pageCount) {
        page--;
      }
    };
  
    onMount(async () => {
      const res = await fetch(`${BASE_URL}/pokemon.json?page=${page}`);
      const data = await res.json();
      list.set(data.list);
      count = data.count;
      pageCount = Math.ceil(count / 5);
    });
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
      <button on:click={() => page = Math.max(1, page - 1)} disabled={page === 1} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span class="flex items-center self-stretch">{page}</span>
      <button on:click={() => page = Math.min(pageCount, page + 1)} disabled={page === pageCount} class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
  </main>
  
  <style>
    @import '@fontsource/fira-mono';
  
    :root {
      --font-body: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      --font-mono: 'Fira Mono', monospace;
      --color-bg-0: rgb(202, 216, 228);
      --color-bg-1: hsl(209, 36%, 86%);
      --color-bg-2: hsl(224, 44%, 95%);
      --color-theme-1: #ff3e00;
      --color-theme-2: #4075a6;
      --color-text: rgba(0, 0, 0, 0.7);
      --column-width: 42rem;
      --column-margin-top: 4rem;
      font-family: var(--font-body);
      color: var(--color-text);
    }
  
    body {
      min-height: 100vh;
      margin: 0;
      background-attachment: fixed;
      background-color: var(--color-bg-1);
      background-size: 100vw 100vh;
      background-image: radial-gradient(
          50% 50% at 50% 50%,
          rgba(255, 255, 255, 0.75) 0%,
          rgba(255, 255, 255, 0) 100%
        ),
        linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
    }
  
    h1,
    h2,
    p {
      font-weight: 400;
    }
  
    p {
      line-height: 1.5;
    }
  
    a {
      color: var(--color-theme-1);
      text-decoration: none;
    }
  
    a:hover {
      text-decoration: underline;
    }
  
    h1 {
      font-size: 2rem;
      text-align: center;
    }
  
    h2 {
      font-size: 1rem;
    }
  
    pre {
      font-size: 16px;
      font-family: var(--font-mono);
      background-color: rgba(255, 255, 255, 0.45);
      border-radius: 3px;
      box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
      padding: 0.5em;
      overflow-x: auto;
      color: var(--color-text);
    }
  
    .text-column {
      display: flex;
      max-width: 48rem;
      flex: 0.6;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
    }
  
    input,
    button {
      font-size: inherit;
      font-family: inherit;
    }
  
    button:focus:not(:focus-visible) {
      outline: none;
    }
  
    @media (min-width: 720px) {
      h1 {
        font-size: 2.4rem;
      }
    }
  
    .visually-hidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: auto;
      margin: 0;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;
    }
  </style>
  