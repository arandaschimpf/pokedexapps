import { Component, createEffect, createSignal } from 'solid-js';
import logo from './logo.svg';
import styles from './App.module.css';

type Pokemon = {
  id: number;
  name: string;
};

const BASE_URL = 'http://localhost:4321/api';

const App: Component = () => {
  const [list, setList] = createSignal<Pokemon[]>([]);
  const [page, setPage] = createSignal(1);
  const [count, setCount] = createSignal(0);
  const pageCount = Math.ceil(count() / 5);

  createEffect(() => {
    let cancelled = false;
    fetch(`${BASE_URL}/pokemon.json?page=${page()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setList(data.list);
          setCount(data.count);
        }
      });

    return () => {
      cancelled = true;
    };
  });

  async function addPokemon(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const pokemon: Pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    };

    await fetch(`${BASE_URL}/pokemon.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    });

    form.reset();
    if (page() === pageCount && list().length < 5) {
      setList(current => [...current, pokemon]);
    }
    setCount(current => current + 1);
  }

  async function deletePokemon(id: number) {
    await fetch(`${BASE_URL}/pokemon/${id}.json`, {
      method: 'DELETE'
    });

    setList(current => current.filter(pokemon => pokemon.id !== id));
    setCount(current => current - 1);

    if (page() >= pageCount) {
      setPage(page() - 1);
    }
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <h1 class={styles.title}>Pokedex</h1>
        <form onSubmit={addPokemon} class={styles.form}>
          <h2>Agregar nuevo pokemon</h2>
          <input type="number" name="id" placeholder="ID" class={styles.input} />
          <input type="text" name="name" placeholder="Nombre" class={styles.input} />
          <button type="submit" class={styles.button}>Agregar</button>
        </form>
        <ul class={styles.list}>
          <li class={styles.listItem}>
            <span class={styles.listItemID}>ID</span>
            <span class={styles.listItemName}>Nombre</span>
            <span class={styles.listItemDelete}></span>
          </li>
          {list().map(pokemon => (
            <li class={styles.listItem}>
              <span class={styles.listItemID}>{pokemon.id}</span>
              <span class={styles.listItemName}>{pokemon.name}</span>
              <button onClick={() => deletePokemon(pokemon.id)} class={styles.listItemDelete}>X</button>
            </li>
          ))}
        </ul>
        <div class={styles.pagination}>
          <button onClick={() => setPage(Math.max(1, page() - 1))} disabled={page() === 1} class={styles.pageButton}>Anterior</button>
          <span class={styles.pageNumber}>{page()}</span>
          <button onClick={() => setPage(Math.min(pageCount, page() + 1))} disabled={page() === pageCount} class={styles.pageButton}>Siguiente</button>
        </div>
      </header>
    </div>
  );
};

export default App;
