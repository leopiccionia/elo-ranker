<script setup lang="ts">
  import { useFileDialog } from '@vueuse/core'
  import { useRouter } from 'vue-router'
  import { parse } from 'toml'

  import Header from './Header.vue'
  import { useStore } from '../store'

  const { onChange, open } = useFileDialog({ accept: '.toml', multiple: false })
  const router = useRouter()
  const store = useStore()

  onChange(async (files) => {
    if (files) {
      const file = files.item(0)!
      store.setup = parse(await file.text())
      router.replace({ name: 'match' })
    }
  })
</script>

<template>
  <Header title="Boas vindas"/>
  <main>
    <p>Selecione um arquivo para começar, ou
      <a download href="https://raw.githubusercontent.com/leopiccionia/elo-ranker/demos/estados-br.toml" target="_blank">baixe o arquivo de demonstração</a>.
    </p>
    <button type="button" @click="open()">Escolha um arquivo</button>
  </main>
</template>

<style scoped>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  button {
    background-color: #DDD;
    border: 2px dashed #555;
    border-radius: 0.5rem;
    color: #555;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 2rem;
    transition: border-color 0.25s;
    width: 100%;
  }

  a {
    color: #26D;
    text-decoration: none;
  }
</style>
