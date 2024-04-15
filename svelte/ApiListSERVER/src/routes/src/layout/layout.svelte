<!-- Layout.svelte -->
<script>
    /**
	 * @type {String}
	 */
     export let title;
  </script>
  
  <div class="container mx-auto">
    <header>
      <h1 class="text-4xl font-bold text-center mb-4">{title}</h1>
    </header>
  
    <main>
      <slot></slot>
    </main>
  
    <footer>
      <p class="text-center text-gray-500">Kevin Stivala - Tarea Svelte.</p>
    </footer>
  </div>
  
  <style>
    /* estilos CSS*/
  </style>
  