<script setup lang="ts">
  import { computed } from 'vue'

  import Layout from './Layout.vue'
  import { useStore } from '../store'

  const store = useStore()

  const sortedPlayers = computed(() => {
    const elos = store.rank!.players
    return Object.keys(store.rank!.players).sort((a, b) => Math.sign(elos[b] - elos[a]))
  })

  const numberFormatter = new Intl.NumberFormat('pt-br', { maximumFractionDigits: 2 })
</script>

<template>
  <Layout>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, i) of sortedPlayers" :key="player">
          <td>{{ i + 1 }}</td>
          <td>
            <img :src="store.image(player)" :alt="player">
          </td>
          <td>{{ player }}</td>
          <td>{{ numberFormatter.format(store.rank!.players[player]) }}</td>
        </tr>
      </tbody>
    </table>
  </Layout>
</template>

<style scoped>
  table {
    border-spacing: 0;
    width: 100%;
  }

  table img {
    max-width: 15rem;
    width: 100%;
  }

  th, td {
    border-bottom: 1px solid #DDD;
    padding: 1ch;
    text-align: center;
    vertical-align: middle;
  }

  tbody tr:nth-of-type(1) {
    background-color: rgba(211, 188, 95, 0.4);
  }

  tbody tr:nth-of-type(2) {
    background-color: #F5F5F5;
  }

  tbody tr:nth-of-type(3) {
    background-color: rgba(215, 162, 112, 0.4);
  }
</style>
