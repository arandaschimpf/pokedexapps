//Paúl Acuña 35793
async function importData() {
  const resp = await fetch("http://localhost:4321/api/pokemon.json"); 
  const data = await resp.json();
  console.log(data);
        data.pokeList.forEach((p) => {
            console.log("entraa");
            MostrarData(p);
          });
}



const MostrarData = (data) => {
    const formulario = document.querySelector('ul');
    console.log(data)
    let body= `<li id="pokemon-${data.id}" class="flex items-center justify-between border-b border-gray-300 p-2">
                <span class="text-lg text-red-600 font-bold w-1/3">${data.id}</span>
                <span class="text-lg text-red-600 font-bold w-1/3 text-center">${data.name}</span>
                <form class="w-1/3 text-right">
                <button type="button" class="delete-button font-bold hover:font-extrabold" data-id="${data.id}">X</button>	
                </form>
                </li>`
    
    formulario?.insertAdjacentHTML("beforeend", body);
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async(e) => {
          e.preventDefault();
          console.log("se dio cliiiiick");
          const pokemonId = e.target.getAttribute('data-id');
          eliminarPokemon(pokemonId);
      })
    });

  }
importData();

// deleteee

async function eliminarPokemon(pokemonId) {
  console.log("entraaaa al eliminar");
  const url = `http://localhost:4321/api/pokemon/${pokemonId}.json`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el Pokémon');
    }

    const data = await response.json();
    console.log('Pokémon eliminado:', data);
    // Aquí puedes actualizar la interfaz de usuario o realizar otras acciones si es necesario
  } catch(error) {
    console.error('Error:', error);
  }
}


//---- AGREGAR
document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('formAction');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = parseInt(document.querySelector('input[name="id"]').value);
      const name = document.querySelector('input[name="name"]').value;
      const newPk = { id, name };
      try { 
        const existingPk = document.getElementById(`pokemon-${id}`);
        if (existingPk) {
          window.alert('¡Ya existe un Pokemon con este ID lal!'); 
          form.reset(); 
          return;
        }   
      try {
        const response = await fetch('http://localhost:4321/api/pokemon.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPk)
        });
        if (response.ok) {
          MostrarData(newPk); 
          form.reset(); 
        } else {
          console.error('AHHHHHH', response.statusText);
        }
      } catch (error) {
        console.error('el ah de afuera', error);
      }
    } catch (error) {
      console.error('Error del id rep:', error);
    }
    });
  });
  
  
  
