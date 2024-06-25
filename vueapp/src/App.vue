<template>
  <div class="w-full mx-auto flex flex-col bg-gray-100 p-6 rounded-xl shadow-lg">
    <h1 class="text-6xl text-blue-500 font-black text-center mb-6">Pokedex</h1>
    <form @submit.prevent="addPokemon" class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-3xl text-blue-600 font-semibold mb-4">Agregar nuevo Pokémon</h2>
      <input v-model="formData.id" type="number" name="id" placeholder="ID" class="my-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
      <input v-model="formData.name" type="text" name="name" placeholder="Nombre" class="my-2 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
      <button type="submit" class="w-full p-3 bg-blue-600 text-white rounded-md mt-4 font-bold uppercase duration-200 hover:bg-blue-700">Agregar</button>
    </form>
    <ul class="mt-6 border-4 border-blue-600 bg-white rounded-xl shadow-md">
      <li v-for="pokemon in list" :key="pokemon.id" class="flex items-center justify-between border-b border-gray-200 p-4">
        <span class="text-xl text-blue-600 font-bold w-1/3">{{ pokemon.id }}</span>
        <span class="text-xl text-blue-600 font-bold w-1/3 text-center">{{ pokemon.name }}</span>
        <div class="w-1/3 text-right">
          <button @click="deletePokemon(pokemon.id)" class="font-bold text-blue-600 hover:text-red-700">X</button>
        </div>
      </li>
    </ul>
    <div class="flex justify-center gap-4 mt-6">
      <button @click="prevPage" :disabled="page === 1" class="p-3 bg-blue-600 text-white rounded-md font-bold uppercase duration-200 disabled:opacity-50 hover:bg-blue-700">Prev</button>
      <span class="flex items-center px-4 text-xl">{{ page }}</span>
      <button @click="nextPage" :disabled="page === pageCount" class="p-3 bg-blue-600 text-white rounded-md font-bold uppercase duration-200 disabled:opacity-50 hover:bg-blue-700">Next</button>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      BASE_URL: 'http://localhost:4321/api',
      list: [],
      formData: {
        id: '',
        name: ''
      },
      page: 1,
      count: 0,
      pageCount: 0,
      error: ''
    };
  },
  methods: {
    async fetchPokemonList(page) {
      try {
        const response = await fetch(`${this.BASE_URL}/pokemon.json?page=${page}`);
        const data = await response.json();
        this.list = data.list;
        this.count = data.count;
        this.pageCount = Math.ceil(this.count / 5);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data';
      }
    },
    async addPokemon() {
      const newPokemon = {
        id: parseInt(this.formData.id),
        name: this.formData.name
      };

      const response = await fetch(`${this.BASE_URL}/pokemon.json`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPokemon)
      });
      console.log(response);

      if (this.page === this.pageCount && this.list.length < 5) {
        this.list.push(newPokemon);
      }
      this.count++;

      this.formData = { id: '', name: '' };
    },

    async deletePokemon(id) {
      try {
        await fetch(`${this.BASE_URL}/pokemon/${id}.json`, {
          method: 'DELETE'
        });

        this.list = this.list.filter(pokemon => pokemon.id !== id);
        this.count--;

        if (this.page >= this.pageCount) {
          this.page--;
        }
      } catch (error) {
        console.error('Error deleting pokemon:', error);
        this.error = 'Error deleting pokemon';
      }
    },
    prevPage() {
      this.page = Math.max(1, this.page - 1);
      this.fetchPokemonList(this.page);
    },
    nextPage() {
      this.page = Math.min(this.pageCount, this.page + 1);
      this.fetchPokemonList(this.page);
    }
  },
  mounted() {
    this.fetchPokemonList(this.page);
  }
};
</script>

<style scoped>
/* Estilos Tailwind CSS */
</style>


