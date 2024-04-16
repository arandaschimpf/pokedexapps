<script setup lang="ts">
import { ref } from 'vue';

//Creacion del objeto pokemnos
interface Pokemon {
  id: number;
  name: string;
}
const newPokemon = ref<Pokemon>({
  id: 0,
  name: ''
});
//Lista que va a contener a los pokemones, inicialmente esta vacia
const list = ref<Pokemon[]>([]);
//Pagina en la que se posiciona
const page = ref(1);
//Contador de pokemones que va a aumentar a medidad que se agregan
const count = ref(0);
//Contador de paginas que puede haber de acuerdo al numero de pokemones 
const pageCount = ref(Math.ceil(count.value / 5));
//La URL para el json
const BASE_URL = 'http://localhost:4321/api';

//Funcion que se va a llevar a cabo al tocar el boton agregar
const addPokemon = async (event: Event) => {
  //Se cancela el evento predeterminado del formulario
  event.preventDefault();
  //Variable que va a contener el formulario
  const form = event.currentTarget as HTMLFormElement
  //Variable que va a tener el contenido del formulario
  const data = new FormData(form)
  //Variable que va a tener una instancia del objeto pokemon 
  const newPokemon: Pokemon = {
    //Se le asigna el id obtenido del valor asociado con la clave 'id' en el formulario 
    id: parseInt(data.get('id') as string),
    //Se le asigna el nombre obtenido del valor asociado con la clave 'name' en el formulario 
    name: data.get('name') as string
  }
  //Se hace la solicitud para guardar al json
  await fetch(`${BASE_URL}/pokemon.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //Se pasae la instacia de Pokemon convirtiendolo en una cadena json
    body: JSON.stringify(newPokemon)
  })
  //Limpiamos el formulario 
  form.reset();
  //Agregamos a nuestra lista la instancia de Pokemon
  list.value.push(newPokemon)
};

//Funcion que se va a llevar a cabo al tocar el boton X
const deletePokemon = async (id: number) => {
  //Se solicita al json para poder borrar, proporcionandole el id que se desea borrar
  await fetch(`${BASE_URL}/pokemon/${id}.json`, {
    method: 'DELETE'
  });
  //Elimina de nuestra lista el Pokemon
  list.value = list.value.filter(pokemon => pokemon.id !== id);
};

//Funcion que se va a llevar a cabo al tocar el boton Prev
const prevPage = () => {
  //Constatamos que la pagina actual es mayor a 1 
  if (page.value > 1) {
    //Le restamos uno 
    page.value--;
  }
};

//Funcion que se va a llevar a cabo al tocar el boton Next
const nextPage = () => {
  //Constatamos que la pagina actual es menor que el numero de paginas existentes
  if (page.value < pageCount.value) {
    //Sumamos uno
    page.value++;
  }
};
</script>

<template>
  <main class="container mx-auto flex flex-col">
    <!-- Titulo encabezado -->
    <h1 class="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
    <!-- Creacion del formulario y determina la funcion a tomar al momento de completarlo -->
    <form @submit.prevent="addPokemon">    
      <h2 class="text-2xl text-red-700 font-bold">Agregar nuevo Pokémon</h2>
      <!-- Creacion del primer input que va a contener el id y vincula su valor (numerico) con el del objeto Pokemon  -->
      <input v-model="newPokemon.id" type="number" name="id" placeholder="ID" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <!-- Creacion del segundo input que va a contener el nombre y vincula su valor (cadena) con el del objeto Pokemon -->
      <input v-model="newPokemon.name" type="text" name="name" placeholder="Nombre" class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <!-- Boton de agregar, asignado como boton de envio de formulario -->
      <button type="submit" class="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
    </form>
    <!-- Definicion de la lista de agregados -->
    <ul class="mt-4 border-4 border-red-700">
      <!-- Encabezado de columnas -->
      <li class="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
				<span class="text-lg text-white font-extrabold w-1/3">ID</span>
				<span class="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
				<span class="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
			</li>
      <!-- Iteracion de los pokemones en la lista, por cada uno crea un elemento de la lista de agregados -->
      <li v-for="pokemon in list" :key="pokemon.id" class="flex items-center justify-between border-b border-gray-300 p-2">
        <!-- Texto que va a tomar el valor del id del pokemon -->
        <span class="text-lg text-red-600 font-bold w-1/3">{{ pokemon.id }}</span>
        <!-- Texto que va a tomar el valor del nombre del pokemon -->
        <span class="text-lg text-red-600 font-bold w-1/3">{{ pokemon.name }}</span>
        <div class="w-1/3 text-right">
          <!-- Boton de eliminar que tendra la llamada a la funcion pasandole como parametro el id -->
          <button @click="deletePokemon(pokemon.id)" class="font-bold hover:font-extrabold">X</button>	
        </div>
      </li>
    </ul>
    <div class="flex justify-center gap-2">
      <button @click="prevPage" :disabled="page === 1" class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Anterior</button>
      <span class="flex items-center self-stretch">{{ page }}</span>
      <button @click="nextPage" :disabled="page === pageCount" class="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Siguiente</button>
</div>

  </main>
</template>