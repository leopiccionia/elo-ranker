import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { Rank, Setup } from './types'
import { createRank } from './utils/setup'

export const useStore = defineStore('elo', () => {
  const rank = ref<Rank | null>(null)
  const setup = ref<Setup | null>(null)

  const image = (player: string) => new URL(setup.value!.players[player]!, setup.value!.baseurl).toString()

  watch(setup, (newSetup) => {
    if (newSetup) {
      const maybeRank = JSON.parse(localStorage.getItem(`elo:${newSetup.id}`) ?? 'null')
      rank.value = maybeRank ? (maybeRank as Rank) : createRank(newSetup)
    } else {
      rank.value = null
    }
  })

  watch(rank, (newRank) => {
    if (newRank && setup.value) {
      localStorage.setItem(`elo:${setup.value.id}`, JSON.stringify(newRank))
    }
  }, { deep: true })

  return { image, rank, setup }
})
