<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  const { showMenu, title } = defineProps({
    showMenu: { type: Boolean, default: false },
    title: { type: String, required: true },
  })
</script>

<template>
  <header>
    <div>
      <img src="/icon.svg" alt="Elo">
      <h1>{{ title }}</h1>
    </div>
    <nav v-if="showMenu">
      <ul>
        <li>
          <RouterLink :to="{ name: 'match' }">Duelo</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'ranking' }">Ranking</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
  header {
    align-items: center;
    display: flex;
    gap: 1ch;
    justify-content: space-between;
  }

  header > :nth-child(1) {
    align-items: center;
    display: flex;
    gap: 1ch;
    justify-content: space-between;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 1.25;
    margin: 0;
  }

  header img {
    height: 2rem;
  }

  header ul, header li {
    margin: 0;
    padding: 0;
  }

  header ul {
    display: flex;
  }

  header li {
    list-style: none;
  }

  nav a {
    align-items: center;
    border-radius: 0.5ch;
    color: inherit;
    display: flex;
    height: 100%;
    padding: 1ch;
    text-decoration: none;
  }

  nav a.router-link-exact-active {
    font-weight: bold;
  }

  nav a:hover {
    background-color: #DDD;
  }
</style>
