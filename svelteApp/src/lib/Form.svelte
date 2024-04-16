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
      <h2 class="text-2xl text-[#403021] font-bold">Agregar nuevo pokemon</h2>
      <input
        type="number"
        name="id"
        placeholder="ID"
        class="my-1 w-full p-2 border border-gray-300 rounded-lg"
        min="1"
        required
      />
      <div id="errorId"></div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="my-1 w-full p-2 border border-gray-300 rounded-lg"
        maxlength="15"
        minlength="3"
        required
      />
      <div id="errorName"></div>
      <button
        type="submit"
        class="w-full p-2 bg-[#88795e] text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-[#413a2d]"
      >
        Agregar
      </button>
    </div>
  </div>
</form>
