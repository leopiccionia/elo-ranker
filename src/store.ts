import { defineStore } from 'pinia'
import { ref, toValue, watch } from 'vue'

import type { Rank, Setup } from './types'
import { INITIAL_ELO } from './utils/elo'

export const useStore = defineStore('elo', () => {
  const rank = ref<Rank | null>(null)
  const setup = ref<Setup | null>(null)

  const image = (player: string) => new URL(setup.value!.players[player]!, setup.value!.baseurl).toString()

  watch(setup, (newSetup) => {
    if (newSetup) {
      const maybeRank = JSON.parse(localStorage.getItem(`elo:${newSetup.id}`) ?? 'null')
      if (maybeRank) {
        rank.value = maybeRank as Rank
      } else {
        rank.value = {
          players: Object.fromEntries(Object.keys(newSetup.players).map((player) => [player, INITIAL_ELO])),
        }
      }
    } else {
      rank.value = null
    }
  })

  watch(rank, (newRank) => {
    if (newRank && setup.value) {
      localStorage.setItem(`elo:${setup.value.id}`, JSON.stringify(toValue(rank)))
    }
  }, { deep: true })

  return { image, rank, setup }
})
