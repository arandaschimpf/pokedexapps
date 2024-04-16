<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let pokemonId = 0;
  export let pokemonName = "";

  /**
   * @param {{ preventDefault: () => void; target: any; }} e
   */

  function deletePokemon(e) {
    e.preventDefault();
    console.log(pokemonId);
    dispatch("delete", {pokemonId});
  }
</script>

<li
  class="flex items-center justify-between border-b border-[#484032] p-2 bg-dark"
>
  <span class="text-lg text-[#484032] font-bold w-1/3 pl-2">{pokemonId}</span>
  <span class="text-lg text-[#484032] font-bold w-1/3 text-center"
    >{pokemonName}</span
  >
  <form class="w-1/3 text-right" >
    <button
      type="submit"
      class="font-bold text-[#484032] hover:font-extrabold pr-2" on:click={deletePokemon}>X</button
    >
  </form>
</li>
