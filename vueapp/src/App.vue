<template>
  <div class="container mx-auto flex flex-col">
    <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <form @submit.prevent="addPokemon">
      <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
      <input
        v-model="newPokemon.id"
        type="number"
        name="id"
        placeholder="ID"
        class="my-1 w-full p-2 border border-gray-300 rounded-lg"
      />
      <input
        v-model="newPokemon.name"
        type="text"
        name="name"
        placeholder="Name"
        class="my-1 w-full p-2 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700"
      >
        Agregar
      </button>
    </form>
    <ul class="mt-4 border-4 border-red-700">
      <li
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700"
      >
        <span class="text-lg text-white font-extrabold w-1/3">{{
          pokemon.id
        }}</span>
        <span class="text-lg text-white font-extrabold w-1/3 text-center">{{
          pokemon.name
        }}</span>
        <button
          @click="deletePokemon(pokemon.id)"
          class="text-lg text-white font-extrabold w-1/3 text-right"
        >
          DELETE
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonList: [],
      newPokemon: { id: null, name: "" },
      page: 1,
      count: 0,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / 5); 
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          `http://localhost:4321/api/pokemon.json?page=${this.page}`
        );
        const data = await response.json();
        this.pokemonList = data.list;
        this.count = data.count;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addPokemon() {
      try {
        const response = await fetch("http://localhost:4321/api/pokemon.json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newPokemon),
        });
        this.newPokemon = { id: null, name: "" };
        await this.fetchData();
      } catch (error) {
        console.error("Error adding Pokemon:", error);
      }
    },
    async deletePokemon(id) {
      try {
        await fetch(`http://localhost:4321/api/pokemon/${id}.json`, {
          method: "DELETE",
        });
        this.pokemonList = this.pokemonList.filter(
          (pokemon) => pokemon.id !== id
        );
        this.count--;
        if (this.page > this.pageCount) {
          this.page--;
        }
      } catch (error) {
        console.error("Error deleting Pokemon:", error);
      }
    },
    prevPage() {
      this.page = Math.max(1, this.page - 1);
      this.fetchData();
    },
    nextPage() {
      this.page = Math.min(this.pageCount, this.page + 1);
      this.fetchData();
    },
  },
};
</script>
