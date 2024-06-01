<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  /**
   * @param {{ preventDefault: () => void; target: any; }} e
   */
  function submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const id = parseInt(form.id.value, 10);
    const name = form.name.value;

    dispatch("submit", { id, name });
  }
</script>

<form id="add-pokemon" on:submit={submitForm}>
  <!-- <div class="absolute opacity-35 h-[100%] w-screen bg-black"></div> -->
  <div class="relative">
    <div class="mx-auto w-4/5 p-4">
      <h2 class="text-2xl text-[#d59d80] m-1 font-bold">Agregar nuevo pokemon</h2>
      <div class="flex">
        <input
          type="number"
          name="id"
          placeholder="ID"
          class="m-1 w-24 p-2 border-4 bg-[#] border-[#d59d80] rounded-lg"
          min="1"
          required
        />
        <div id="errorId"></div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          class="m-1 w-full p-2 border-4 border-[#d59d80] rounded-lg"
          maxlength="15"
          minlength="3"
          required
        />
        <div id="errorName"></div>
        <button
          type="submit"
          class=" px-4 bg-[#c0754d] text-[#c6c6d0] rounded-lg m-1 font-bold duration-200 hover:bg-[#b6410f]"
        >
          Add
        </button>
      </div>
      
    </div>
  </div>
</form>
