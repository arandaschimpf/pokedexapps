// conectar con el servidor
fetch("http://localhost:4321/api/pokemon.json")
.then(response => response.json())
.then(data => {
    console.log(data)

    for( let i in data.pokemonList){
        addPokeLine(data.pokemonList[i])
        console.log(data.pokemonList[i])
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


document.getElementById("formpok").addEventListener("submit", async (event) => {
    console.log("hola")

    //agarrar los datos del form
    const formData = new FormData(event.target)
    const id = Number(formData.get("id"))
    const name = formData.get("name")
    //crear un objeto pokemon para poder pasar a 
    const pokemon = { id: id, name: name }
    // agregar el nuevo pokemon
    addPokeLine(pokemon)
    //Cambios en el server
    fetch("http://localhost:4321/api/pokemon.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, name}),
    })
    .catch (error);{
    console.error('No se pudo agregar pokemon al servidor:', error)
    }
});
