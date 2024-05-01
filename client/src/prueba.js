document.addEventListener('DOMContentLoaded', async function() {
  await ListarPok();
  document.getElementById('pokemonForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    await agregarPok(); 
  });

  document.getElementById('pokemonList').addEventListener('click', async function(event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const pokemonId = target.parentElement.parentElement.querySelector('.id').textContent;
      console.log('ID del Pokémon:', pokemonId);
      console.log('si');
      await eliminarPok(pokemonId);
    }
  });
});

async function ListarPok() {
  try {
    const dir = await fetch("http://localhost:4321/api/pokemon.json");
    const data = await dir.json();
    console.log(data);
    const pokemonListElement = document.getElementById('pokemonList');
    pokemonListElement.innerHTML = '';

    data.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.className = "flex items-center justify-between border-b border-gray-300 p-2";

      const idSpan = document.createElement('span');
      idSpan.className = "text-lg text-red-600 font-bold w-1/3 id";
      idSpan.textContent = pokemon.id;

      const nameSpan = document.createElement('span');
      nameSpan.className = "text-lg text-red-600 font-bold w-1/3 text-center";
      nameSpan.textContent = pokemon.name;

      const form = document.createElement('form');
      form.action = `/api/pokemon/${pokemon.id}`;
      form.method = "post";
      form.className = "w-1/3 text-right";

      const button = document.createElement('button');
      button.type = "button";
      button.className = "font-bold hover:font-extrabold";
      button.textContent = "X";

      // Agrega los elementos al DOM
      form.appendChild(button);
      listItem.appendChild(idSpan);
      listItem.appendChild(nameSpan);
      listItem.appendChild(form);
      pokemonListElement.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error al listar los Pokémon:', error);
  }
}

async function agregarPok() {
  try {
    // Obtiene los datos del formulario
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const dir = await fetch("http://localhost:4321/api/pokemon.json");
    const data = await dir.json();
    const pokemonExistsi = data.some(pokemon => pokemon.id === id);
    const pokemonExistsn = data.some(pokemon => pokemon.name === name);

    // Resetea el color del borde de los campos
    document.getElementById('name').style.borderColor = '';
    document.getElementById('id').style.borderColor = '';

    if (pokemonExistsi) {
      alert("id existente")
      return;
    }
    if (pokemonExistsn) {
      alert("pokemon existente")
      return;
    }

    // Verifica si los campos están vacíos y establece el color del borde en rojo si es necesario
    if (!name.trim()) {
      document.getElementById('name').style.borderColor = 'red';
    }
    if (!id.trim()) {
      document.getElementById('id').style.borderColor = 'red';
    }

    // Si ambos campos están completos, procede con el envío del formulario
    if (name && id) {
      const nuevoPokemon = {
        id: id,

        name: name,
      };

      // Envía una solicitud POST al servidor para agregar el nuevo Pokémon
      await fetch('http://localhost:4321/api/pokemon.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPokemon),
      });

      // Actualiza la lista de Pokémon después de agregar uno nuevo
      await ListarPok();
      console.log(data);

    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
  }
}

async function eliminarPok(pokemonId) {
  console.log('si');
  console.log(pokemonId);
  const dir = await fetch("http://localhost:4321/api/pokemon.json");
  const data = await dir.json();
  console.log(data)

  try {
    console.log('si');

    const response = await fetch(`http://localhost:4321/api/pokemon/${pokemonId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Verifica si la solicitud fue exitosa
    console.log('si');

    if (response.ok) {
      // Actualiza la lista de Pokémon después de eliminar uno
      await ListarPok();
    } else {
      // Si la solicitud no fue exitosa, muestra un mensaje de error
      console.error('Error al eliminar el Pokémon:', response.statusText);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
  }
}
