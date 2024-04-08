// conectar con el servidor
fetch('http://localhost:4321/api/pokemon.json', {method: 'GET'}).then( response => response.json()).then(data =>{
    for (let pokemon of data.pokemonList){
        // llamar a la funcion que genera los pokemones iniciales
        addPokeLine(pokemon)
        
    }
})

const addPokeLine = (pokemon) => {
    // pokeLine es cada componente li con su respectivo estilo e info
    const pokeLine = document.createElement("li")

    // dar estilo con tailwind
    pokeLine.classList = "flex items-center justify-between border-b border-gray-300 p-2"
    pokeLine.innerHTML = `<span class="text-lg text-red-600 font-bold w-1/3">${pokemon.id}</span>
    <span class="text-lg text-red-600 font-bold w-1/3 text-center">${pokemon.name}</span>`

    // como cada li tiene dentro la 'X' para eliminar, lo generamos con la misma lista
    const formDelete = document.createElement("form")
    formDelete.classList = "w-1/3 text-right"
    formDelete.innerHTML ='<button type="submit" class="font-bold hover:font-extrabold">X</button>'

        formDelete.addEventListener("submit", (event) =>{
            event.preventDefault();
            // conectar con el servidor, pasa el id para saber cual eliminar
            fetch(`http://localhost:4321/api/pokemon/${pokemon.id}.json`, {method: 'DELETE'})
            document.getElementById("pokeContainer").removeChild(pokeLine)

        })
        pokeLine.appendChild(formDelete)

        // añadir al pokeLine
        document.getElementById("pokeContainer").appendChild(pokeLine)
}

document.getElementById("pokeAdding").addEventListener("submit", async (event) => {
   // event.preventDefault();

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
        const response = await fetch('http://localhost:4321/server/api/pokemon.json', {
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