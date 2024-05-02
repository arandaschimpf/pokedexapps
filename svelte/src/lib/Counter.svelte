<script lang="ts">
  import { onMount } from 'svelte';

  let count = 0;

  const increment = () => {
    count += 1;
  };

  const reset = () => {
    count = 0;
  };

  onMount(() => {
    console.log('Componente montado');
  });
</script>

<button on:click={increment}>
  Incrementar
</button>

<button on:click={reset}>
  Resetear
</button>

<p>El contador es: {count}</p>
