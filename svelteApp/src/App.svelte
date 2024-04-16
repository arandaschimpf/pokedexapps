<script lang="ts">
  import Form from "./lib/Form.svelte";
  import Header from "./lib/Header.svelte";
  import Pokemon from "./lib/Pokemon.svelte";
  import TableSup from "./lib/TableSup.svelte";
  import TableInf from "./lib/TableInf.svelte";
  import { onMount } from "svelte";

  //   GET

  let page = 1;

  const getPokemon = async (page: number) => {
    const res = await fetch(
      `http://localhost:4321/api/pokemon.json?page=${page}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  onMount(() => {
    getPokemon(page);
  });

  $: page, getPokemon(page);

  function handleNextPage() {
    if (page) {
      console.log(page);
      page += 1;
    }
    getPokemon(page);
  }

  function handlePrevPage() {
    if (page) {
      console.log(page);
      page -= 1;
    }
    getPokemon(page);
  }

  //   POST

  async function handleSubmit(e: { detail: { id: number; name: string } }) {
    const { id, name } = e.detail;
    const response = await fetch("http://localhost:4321/api/pokemon.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });
  }

  // DELETE

  async function handleDelete(e: { detail: { pokemonId: number } }) {
    const { pokemonId } = e.detail;
    console.log("hola: ", pokemonId);
    const response = await fetch(
      `http://localhost:4321/api/pokemon/${pokemonId}.json`,
      {
        method: "DELETE",
      }
    );
  }
</script>

<Header />
<main>
  <Form on:submit={handleSubmit} />
  <TableSup />
  <div class="mt-4 border-4 border-[#484032] mx-auto w-4/5">
    {#await getPokemon(page)}
      <p></p>
    {:then data}
      {#each data.pokemonList as item}
        <Pokemon
          pokemonId={parseInt(item.id, 10)}
          pokemonName={JSON.stringify(item.name)}
          on:delete={handleDelete}
        />
      {/each}
    {/await}
  </div>
  <TableInf on:nextPage={handleNextPage} on:prevPage={handlePrevPage} />
</main>
