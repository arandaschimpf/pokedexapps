<script lang="ts">
  import Form from "./lib/Form.svelte";
  import Header from "./lib/Header.svelte";
  import Pokemon from "./lib/Pokemon.svelte";
  import TableSup from "./lib/TableSup.svelte";
  import TableInf from "./lib/TableInf.svelte";

  const getPokemon = async () => {
    const res = await fetch("http://localhost:4321/api/pokemon.json");
    const data = await res.json();
    console.log(data);
    return data;
  };

</script>

<Header />
<main>
  <Form />
  <TableSup />
  <div class="mt-4 border-4 border-[#484032] mx-auto w-4/5">
    {#await getPokemon()}
      <p></p>
    {:then data}
      {#each data.pokemonList as item}
        <Pokemon pokemonId={item.id} pokemonName={JSON.stringify(item.name)} />
      {/each}
    {/await}
  </div>
  <TableInf />
</main>
