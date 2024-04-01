fetch('http://localhost:4321/api/pokemon.json', {method: 'GET'}).then( response => response.json()).then(data =>{
    for (let pokemon of data.pokemonList){
        addPokeLine(pokemon)
    }
})

const addPokeLine = (pokemon) => {
    const pokeLine = document.createElement("li")
    pokeLine.classList = "flex items-center justify-between border-b border-gray-300 p-2"
    pokeLine.innerHTML = `<span class="text-lg text-red-600 font-bold w-1/3">${pokemon.id}</span>
    <span class="text-lg text-red-600 font-bold w-1/3 text-center">${pokemon.name}</span>`

    const formDelete = document.createElement("form")
    formDelete.classList = "w-1/3 text-right"
    formDelete.innerHTML ='<button type="submit" class="font-bold hover:font-extrabold">X</button>'

        formDelete.addEventListener("submit", (event) =>{
            event.preventDefault();
            fetch(`http://localhost:4321/api/pokemon/${pokemon.id}.json`, {method: 'DELETE'})
            document.getElementById("pokeContainer").removeChild(pokeLine)
            
        })
        pokeLine.appendChild(formDelete)

        document.getElementById("pokeContainer").appendChild(pokeLine)
}

document.getElementById("pokeAdding").addEventListener("submit", async (event) => {
    event.preventDefault();

    // crear un nuevo objeto FormData que representa el formulario
    const formData = new FormData(event.target);

    // obtener los valores de los campos del formulario
    const id = formData.get('id');
    const name = formData.get('name');

    // crear el objeto Pokemon
    const newPokemon = { id: parseInt(id), name: name };

    // agregar el nuevo pokemon
    addPokeLine(newPokemon);

    try {
        // enviar el objeto Pokemon al servidor
        const response = await fetch('http://localhost:4321/api/pokemon.json', {
            method: 'POST',
            body: JSON.stringify(newPokemon)
        });

        // manejo de errores
        if (!response.ok) {
            throw new Error('Error al agregar pokemon');
        }

        const responseData = await response.json()

    } catch (error) {
        console.error('Error al agregar pokemon:', error);
    }
});