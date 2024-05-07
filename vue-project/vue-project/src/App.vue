<template>
  <div class="container mx-auto flex flex-col">
    <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <form @submit.prevent="addPokemon">
      <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo Pokémon</h2>
      <input v-model="newPokemon.id" type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <input v-model="newPokemon.name" type="text" name="name" placeholder="Name" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
    </form>

    <ul class="mt-4 border-4 border-red-700">
      <li class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
        <span class="text-lg text-white font-extrabold w-1/3">ID</span>
        <span class="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
        <span class="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
      </li>
      <li v-for="pokemon in pokemonList" :key="pokemon.id" class="flex items-center justify-between border-b border-gray-300 p-2">
        <span class="text-lg text-red-600 font-bold w-1/3">{{ pokemon.id }}</span>
        <span class="text-lg text-red-600 font-bold w-1/3 text-center">{{ pokemon.name }}</span>
        <button @click="deletePokemon(pokemon.id)" class="w-1/3 text-right font-bold hover:font-extrabold">X</button>
      </li>
    </ul>

    <div class="flex justify-center gap-2 mt-4">
      <button @click="prevPage" :disabled="page === 1" class="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span class="flex items-center">{{ page }}</span>
      <button @click="nextPage" :disabled="page === pageCount" class="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const pokemonList = ref([]);
const newPokemon = ref({ id: null, name: '' });
const page = ref(1);
const count = ref(0);

const pageCount = computed(() => Math.ceil(count.value / 5));

async function fetchData() {
  try {
    const response = await fetch(`http://localhost:4321/api/pokemon.json?page=${page.value}`);
    const data = await response.json();
    pokemonList.value = data.list;
    count.value = data.count;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function addPokemon() {
  try {
    await fetch('http://localhost:4321/api/pokemon.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPokemon.value),
    });
    newPokemon.value = { id: null, name: '' };
    fetchData();
  } catch (error) {
    console.error('Error adding Pokémon:', error);
  }
}

async function deletePokemon(id) {
  try {
    await fetch(`http://localhost:4321/api/pokemon/${id}.json`, { method: 'DELETE' });
    pokemonList.value = pokemonList.value.filter(pokemon => pokemon.id !== id);
    count.value--;
  } catch (error) {
    console.error('Error deleting Pokémon:', error);
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
    fetchData();
  }
}

function nextPage() {
  if (page.value < pageCount.value) {
    page.value++;
    fetchData();
  }
}

onMounted(fetchData);
</script>
