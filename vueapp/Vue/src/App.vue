  <template>
  <div class="container mx-auto flex flex-col">
    <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <form @submit.prevent="addPokemon" class="my-4">
      <div v-if="error" class="bg-red-400/70 p-4 rounded my-2 text-white text-xl">
        Error: {{ error }}
      </div>
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
    <div class="flex justify-center gap-2 mt-4">
      <button @click="prevPage" :disabled="page === 1" class="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
      <span class="flex items-center self-stretch">{{ page }}</span>
      <button @click="nextPage" :disabled="page === pageCount" class="p-2 bg-red-600 text-white rounded-lg font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
    </div>
  </div>
</template>
<!--  -->
<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';

const BASE_URL = 'http://localhost:4321/api';

const list = ref([]);
const page = ref(1);
const count = ref(0);
const pageCount = computed(() => Math.ceil(count.value / 5));
const error = ref('');
const formData = reactive({ id: '', name: '' });

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon.json?page=${page.value}`);
    const data = await response.json();
    list.value = data.list;
    count.value = data.count;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addPokemon = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(formData.id),
        name: formData.name
      })
    });

    const json = await response.json();

    if (json.error) {
      error.value = json.error;
      return;
    }

    formData.id = '';
    formData.name = '';

    if (page.value === pageCount.value && list.value.length < 5) {
      list.value.push({ id: parseInt(formData.id), name: formData.name });
    }
    error.value = ''
    count.value += 1;
  } catch (error) {
    console.error('Error adding Pokemon:', error);
  }
};

const deletePokemon = async (id) => {
  try {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    });

    list.value = list.value.filter(pokemon => pokemon.id !== id);
    count.value -= 1;

    if (page.value >= pageCount.value) {
      page.value -= 1;
    }
  } catch (error) {
    console.error('Error deleting Pokemon:', error);
  }
};

const prevPage = () => {
  page.value = Math.max(1, page.value - 1);
};

const nextPage = () => {
  page.value = Math.min(pageCount.value, page.value + 1);
};
watch(page, fetchData, { immediate: true })
</script>

<style scoped>
</style>
