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
  class="mt-4 mx-auto w-4/5 justify-center flex px-5"
>
  <button class="text-[#c6c6d0] bg-[#c0754d] border-[#b6410f] rounded-xl border-4 p-2 m-2 font-extrabold" on:click={PrevPage}>back</button>
  <button class="text-[#c6c6d0] bg-[#c0754d] border-[#b6410f] rounded-xl border-4 p-2 m-2 font-extrabold" on:click={NextPage}>next</button>
</ul>
