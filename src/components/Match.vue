<script setup lang="ts">
  import { useEventListener } from '@vueuse/core'
  import { ref } from 'vue'

  import Layout from './Layout.vue'
  import { useStore } from '../store'
  import { adjustRatings, INITIAL_ELO } from '../utils/elo'
  import { randomPair } from '../utils/shuffle'

  const store = useStore()

  const player1 = ref('')
  const player2 = ref('')

  const shuffle = () => {
    const [p1, p2] = randomPair(Object.keys(store.rank!.players))
    player1.value = p1
    player2.value = p2
  }

  const match = (score: number) => {
    const [newP1, newP2] = adjustRatings(store.rank!.players[player1.value] ?? INITIAL_ELO, store.rank!.players[player2.value] ?? INITIAL_ELO, score)
    store.rank!.players[player1.value] = newP1
    store.rank!.players[player2.value] = newP2
    shuffle()
  }

  shuffle()

  useEventListener(window, 'keydown', (event) => {
    const key = event.key.toLowerCase()
    if (key === 'a' || key === 'arrowleft') {
      match(1)
    } else if (key === 's' || key === 'arrowdown') {
      match(0.5)
    } else if (key === 'd' || key === 'arrowright') {
      match(0)
    } else if (key === 'w' || key === 'arrowup') {
      shuffle()
    }
  })
</script>

<template>
  <Layout>
    <p class="announcement">Selecione sua imagem favorita:</p>
    <div class="pairings">
      <button type="button" class="player" @click="match(1)">
        <img :src="store.image(player1)" :alt="player1">
        <p>{{ player1 }} <span class="key">A, ⯇</span></p>
      </button>
      <button type="button" class="player" @click="match(0)">
        <img :src="store.image(player2)" :alt="player2">
        <p>{{ player2 }} <span class="key">D, ⯈</span></p>
      </button>
    </div>
    <div class="buttons">
      <button type="button" @click="match(0.5)">Empate <span class="key">S, ⯆</span></button>
      <button type="button" @click="shuffle">Pular <span class="key">W, ⯅</span></button>
    </div>
  </Layout>
</template>

<style scoped>
  .announcement {
    text-align: center;
  }

  .pairings {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }

  button {
    background: transparent;
    border: none;
    border-radius: 0.5ch;
    color: inherit;
    cursor: pointer;
    font-size: 1rem;
  }

  button:focus, button:hover {
    background-color: #DDD;
  }

  .pairings button {
    padding: 1ch;
  }

  .player img {
    width: 100%;
  }

  .player p, .buttons button {
    align-items: center;
    display: flex;
    gap: 1ex;
  }

  .player p {
    justify-content: center;
    margin: 1ch 0 0;
    text-align: center;
  }

  .buttons {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .buttons button {
    margin: 1ch 0 0;
    padding: 1ch 2ch;
  }

  .key {
    align-items: center;
    background-color: #CCC;
    border-radius: 0.25rem;
    color: #555;
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: bold;
    justify-content: center;
    padding: 0.25rem;
  }
</style>
