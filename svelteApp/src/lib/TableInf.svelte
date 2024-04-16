<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function NextPage() {
    dispatch("nextPage");
  }

  function PrevPage() {
    dispatch("prevPage");
  }
</script>

<ul
  class="mt-4 border-4 border-[#484032] mx-auto w-4/5 justify-between flex px-5"
>
  <button class="text-[#484032] font-extrabold" on:click={PrevPage}>back</button>
  <button class="text-[#484032] font-extrabold" on:click={NextPage}>next</button>
</ul>
