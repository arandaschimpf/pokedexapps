async function obtenerListaPokemones() {
    const resp = await fetch("http://localhost:4321/api/pokemon.json");
    const data = await resp.json();
    console.log(data);
    data.listpk.forEach((p) => {
      agregar(p);
    });
  }
  
  function agregar(pokemon) {
    const cosa = document.createElement("li");
    //definir las propiedades
    cosa.id = `li${pokemon.id}`;
    cosa.classList ="flex items-center justify-between border-b border-gray-300 p-2";
  
    const fila = `<span class="text-lg text-red-600 font-bold w-1/3">${pokemon.id}</span>`
    + `<span class="text-lg text-red-600 font-bold w-1/3 text-center">${pokemon.name}</span>` +
     `<formulario class="w-1/3 text-right">` + `<button type="submit" class="font-bold hover:font-extrabold" 
     id="${pokemon.id}">X</button></formulario>`; 
    cosa.innerHTML = fila;
    document.getElementById('lista').appendChild(cosa);
  }
  
  obtenerListaPokemones(); 

  document.addEventListener('DOMContentLoaded', () => {  
    const formulario = document.getElementById('form123');
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = parseInt(document.querySelector('input[name="id"]').value);
      const name = document.querySelector('input[name="name"]').value;
      const newPk = { id, name };
      try { 
        const existingPk = document.getElementById(`li${id}`);
        if (existingPk) {
          window.alert('Ya existe'); 
          formulario.reset(); 
          return;
        }   
      try {
        const respo = await fetch('http://localhost:4321/api/pokemon.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPk)
        });
        if (respo.ok) {
          agregar(newPk);
          formulario.reset(); 
        } else {
          console.error('error', respo.statusText);
        }
      } catch (error) {
        console.error('error', error);
      }
    } catch (error) {
      console.error('error', error);
    }
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista');
    lista.addEventListener('click', async (event) => {
      event.preventDefault();
      if (event.target.tagName === 'BUTTON') { 
        const pkId = event.target.id;
        try {
          const respo = await fetch(`http://localhost:4321/api/pokemon/${pkId}.json`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (respo.ok) {
            const Cosa = document.getElementById(`li${pkId}`);
            Cosa.remove();
          } else {
            console.error('no se puedo eliminar:', respo.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });