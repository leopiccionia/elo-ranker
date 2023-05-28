<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import Header from './Header.vue'
  import { useStore } from '../store'

  const store = useStore()
</script>

<template>
  <Header :title="store.setup!.label" showMenu/>
  <main>
    <slot/>
  </main>
  <footer>
    <p>
      "{{ store.setup!.label }}" por {{ store.setup!.author }}.
      <RouterLink :to="{ name: 'facade' }">Trocar</RouterLink>
    </p>
  </footer>
</template>

<style scoped>
  footer p {
    margin: 0;
    text-align: center;
  }

  footer a {
    color: #26D;
    text-decoration: none;
  }
</style>
