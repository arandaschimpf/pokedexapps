// Fetch the list of Pokémon from the API
fetch("http://localhost:4321/api/pokemon.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.pokemonList.forEach((pokemon) => {
      createPokemon(pokemon);
    });
  })
  .catch((error) => {
    console.error('Error fetching Pokémon:', error);
  });

// Function to create a new Pokémon element and add it to the list
function createPokemon(pokemon) {
  const li = document.createElement("li");
  li.id = `li${pokemon.id}`;
  li.classList =
    "flex items-center justify-between border-b border-[#B91C1C] p-2 bg-white";
  const liContent =
    `<span class="text-lg text-[#B91C1C] font-bold w-1/3 pl-2">${pokemon.id}</span>` +
    `<span class="text-lg text-[#B91C1C] font-bold w-1/3 text-center">${pokemon.name}</span>` +
    `<form class="w-1/3 text-right">` +
    `<button type="submit" class="font-bold text-[#B91C1C] hover:font-extrabold pr-2" id="${pokemon.id}">X</button></form>`;

  li.innerHTML = liContent;
  document.getElementById("list-container").appendChild(li);
}

// Event listener for adding a new Pokémon
document.getElementById("add-pokemon").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get("id");
  const name = formData.get("name");
  
  if (!id || !name) {
    console.error('Please provide both ID and Name for the Pokémon.');
    return;
  }
  
  if (document.getElementById(`li${id}`)) {
    console.error('A Pokémon with this ID already exists.');
    return;
  }
  
  createPokemon({ id, name });
  
  // Add the new Pokémon to the API
  fetch("http://localhost:4321/api/pokemon.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: parseInt(id), name }),
  })
  .catch((error) => {
    console.error('Error adding Pokémon:', error);
  });
  
  // Clear the input fields
  e.target.reset();
});

// Event listener for removing a Pokémon
document.getElementById("list-container").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.tagName === 'FORM') {
    const pokemonId = e.target.querySelector("button").id;
    document.getElementById(`li${pokemonId}`).remove();
    
    // Remove the Pokémon from the API
    fetch(`http://localhost:4321/api/pokemon/${pokemonId}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error('Error deleting Pokémon:', error);
    });
  }
});
