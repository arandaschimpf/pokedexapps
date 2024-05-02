async function ListPks() {
  try {
    const resp = await fetch("http://localhost:4321/api/pokemon.json");
    const data = await resp.json();
    console.log(data);
    data.listaPks.forEach((p) => {
      addPk(p);
    });
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
  }
}

function addPk(pk) {
  const item = document.createElement("li");
  item.id = `li${pk.id}`;
  item.classList ="flex items-center justify-between border-b border-gray-300 p-2";
  item.dataset.name = pk.name;

  const row = `<span class="text-lg text-red-600 font-bold w-1/3">${pk.id}</span>` +
    `<span class="text-lg text-red-600 font-bold w-1/3 text-center">${pk.name}</span>` +
    `<form class="w-1/3 text-right">` +
    `<button type="submit" class="font-bold hover:font-extrabold" id="${pk.id}">X</button></form>`;
  item.innerHTML = row;
  document.getElementById('listaPks').appendChild(item);
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('listaPks');
  list.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
      const pkId = event.target.id;
      try {
        const response = await fetch(`http://localhost:4321/api/pokemon/${pkId}.json`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const Item = document.getElementById(`li${pkId}`);
          Item.remove();
        } else {
          console.error('No se pudo eliminar:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form123');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = parseInt(document.querySelector('input[name="id"]').value);
    const name = document.querySelector('input[name="name"]').value;
    const newPk = { id, name };
    try {
      const existingPk = document.getElementById(`li${id}`);
      if (existingPk) {
        window.alert('¡Ya existe un Pokemon con este ID!');
        form.reset();
        return;
      }
      const response = await fetch('http://localhost:4321/api/pokemon.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPk)
      });
      if (response.ok) {
        addPk(newPk);
        form.reset();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const idHeader = document.getElementById('idHeader');
  const nameHeader = document.getElementById('nameHeader');

  idHeader.addEventListener('click', () => {
    sortPksInList('id');
  });

  nameHeader.addEventListener('click', () => {
    sortPksInList('name');
  });

  function sortPksInList(sortBy) {
    const items = Array.from(document.getElementById('listaPks').children);
    const header = items.shift();
    items.sort((a, b) => {
      const idA = parseInt(a.id.replace('li', ''));
      const idB = parseInt(b.id.replace('li', ''));

      if (sortBy === 'id') {
        return idA - idB;
      } else if (sortBy === 'name') {
        const nameA = a.dataset.name;
        const nameB = b.dataset.name;
        return nameA.localeCompare(nameB);
      }
    });

    document.getElementById('listaPks').innerHTML = '';
    document.getElementById('listaPks').appendChild(header);
    items.forEach(item => document.getElementById('listaPks').appendChild(item));
  }
});
