fetch("http://localhost:4321/api/pokemon.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for (pokemon of data.pokemonList) {
      createPokemon(pokemon);
    }
  });

function createPokemon(pokemon) {
  const li = document.createElement("li");
  li.id = `li${pokemon.id}`;
  li.classList =
    "flex items-center justify-between border-b border-[#484032] p-2 bg-[#ffe5b2]";
  const liContent =
    `<span class="text-lg text-[#484032] font-bold w-1/3 pl-2">${pokemon.id}</span>` +
    `<span class="text-lg text-[#484032] font-bold w-1/3 text-center">${pokemon.name}</span>` +
    `<form class="w-1/3 text-right">` +
    `<button type="submit" class="font-bold text-[#484032] hover:font-extrabold pr-2" id="${pokemon.id}">X</button></form>`;

  li.innerHTML = liContent;
  document.getElementById("list-container").appendChild(li);
}

document.getElementById("add-pokemon").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (document.getElementById(`li${formData.get("id")}`)) {
    document.querySelector("input[name = 'id']").value = "";
  } else {
    createPokemon({ id: formData.get("id"), name: formData.get("name") });
    fetch("http://localhost:4321/api/pokemon.json", {
      method: "POST",
      body: JSON.stringify({
        id: parseInt(formData.get("id")),
        name: formData.get("name"),
      }),
    });
    document.querySelector("input[name = 'id']").value = "";
    document.querySelector("input[name = 'name']").value = "";
  }
});

document.getElementById("list-container").addEventListener("submit", (e) => {
  e.preventDefault();
  const pokemonId = e.target.querySelector("button").id;
  document.getElementById(`li${pokemonId}`).remove();
  fetch(`http://localhost:4321/api/pokemon/${pokemonId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});
