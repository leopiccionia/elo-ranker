<script setup lang="ts">
  import { useFileDialog } from '@vueuse/core'
  import { RouterLink, useRouter } from 'vue-router'

  import Header from './Header.vue'
  import { useStore } from '../store'
  import { parseSetup } from '../utils/setup'

  const { onChange, open } = useFileDialog({ accept: '.ini', multiple: false })
  const router = useRouter()
  const store = useStore()

  onChange(async (files) => {
    if (files) {
      store.setup = await parseSetup(files.item(0)!)
      router.replace({ name: 'match' })
    }
  })
</script>

<template>
  <Header title="Boas vindas"/>
  <main class="facade">
    <p>Selecione um arquivo para começar, ou <RouterLink :to="{ name: 'demo:estados-br' }">vá para uma demonstração</RouterLink>.</p>
    <button type="button" @click="open()">Escolha um arquivo</button>
  </main>
</template>

<style>
  .facade {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .facade button {
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
</style>
