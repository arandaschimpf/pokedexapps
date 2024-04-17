async function ShowDataNames(){
    document.getElementById("dataList").innerHTML = '';
    const response = await fetch('http://localhost:4321/api/data.json', {method: 'GET'})
    const json = await response.json()
    json.list.forEach(item => {
        addData(item, true)
    });
    console.log(json.list);
}

function addData(item, iteration){
    const listItem = document.createElement('li')

    listItem.classList = "flex items-center justify-between border-b border-gray-300 p-2"
    listItem.innerHTML = `<span class="text-lg text-blue-600 font-bold w-1/3">${item.id}</span>
    <span class="text-lg text-blue-600 font-bold w-1/3 text-center">${item.name}</span>`

    const formDelete = document.createElement("form")
    formDelete.classList = "w-1/3 text-right"
    formDelete.innerHTML ='<button type="submit" class="font-bold hover:font-extrabold">X</button>'

        formDelete.addEventListener("submit", (event) =>{
            event.preventDefault();
            fetch(`http://localhost:4321/api/data/${item.id}.json`, {method: 'DELETE'})
            document.getElementById("dataList").removeChild(listItem)

        })
        listItem.appendChild(formDelete)
        document.getElementById("dataList").appendChild(listItem)
        
        if(!iteration){
            ShowDataNames()
        }
}

document.getElementById("dataAdd")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const id = parseInt(formData.get('id'));
    const name = formData.get('name');

    const newPais = { id: id, name: name };

    try {
        const response = await fetch('http://localhost:4321/api/data.json', {
            method: 'POST',
            body: JSON.stringify(newPais)
        });

        if (!response.ok) {
            throw new Error('Error al agregar pais');
        }

        const responseData = await response.json()
        addData(newPais,false);
    } catch (error) {
        console.error('Error al agregar pais:', error);

    }
});