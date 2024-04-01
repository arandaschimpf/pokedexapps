// Función para mostrar los nombres de los Pokémon
function showPokemonNames() {
    // Realiza una solicitud GET al servidor Astro para obtener la lista de Pokémon
    fetch('http://localhost:4321/')
      .then(response => {
        // Verifica si la respuesta es exitosa (código de estado 200)
        if (response.ok) {
          // Si la respuesta es exitosa, devuelve los datos como JSON
          return response.json();
        } else {
          // Si la respuesta no es exitosa, lanza un error
          throw new Error('No se pudo obtener la lista de Pokémon');
        }
      })
      .then(data => {
        // Limpia la lista de Pokémon existente
        document.getElementById('pokemon-list').innerHTML = '';
        
        // Itera sobre la lista de Pokémon y agrega cada nombre a la lista en la página HTML
        data.forEach(pokemon => {
          const listItem = document.createElement('li');
          listItem.textContent = pokemon.name;
          document.getElementById('pokemon-list').appendChild(listItem);
        });
      })
      .catch(error => {
        // Muestra un mensaje de error en la lista de Pokémon
        console.error('Error al obtener la lista de Pokémon:', error);
        document.getElementById('pokemon-list').innerHTML = '<li>Error al obtener la lista de Pokémon</li>';
      });
  }
  
  