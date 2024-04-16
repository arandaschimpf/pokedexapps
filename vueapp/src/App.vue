<template>
  <div class="container mx-auto flex flex-col">
    <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <form @submit.prevent="addPokemon">
      <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
      <input v-model="formData.id" type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <input v-model="formData.name" type="text" name="name" placeholder="Name" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
    </form>
    <ul class="mt-4 border-4 border-red-700">
      <li v-for="pokemon in list" :key="pokemon.id" class="flex items-center justify-between border-b border-gray-300 p-2">
        <span class="text-lg text-red-600 font-bold w-1/3">{{ pokemon.id }}</span>
        <span class="text-lg text-red-600 font-bold w-1/3 text-center">{{ pokemon.name }}</span>
        <div class="w-1/3 text-right">
          <button @click="deletePokemon(pokemon.id)" class="font-bold hover:font-extrabold">X</button>
        </div>
      </li>
    </ul>
    <div class="flex justify-center gap-2">
      <button @click="prevPage" :disabled="page === 1" class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span class="flex items-center self-stretch">{{ page }}</span>
      <button @click="nextPage" :disabled="page === pageCount" class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
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


