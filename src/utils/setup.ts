import { parse } from 'ini'

import { INITIAL_ELO } from './elo'
import type { Rank, Setup } from '../types'

export function createRank (setup: Setup): Rank {
  return {
    count: 0,
    players: Object.fromEntries(
      Object.keys(setup.players).map((player) => [player, INITIAL_ELO])
    ),
  }
}

export async function parseSetup (blob: Body | Blob): Promise<Setup> {
  return parse(await blob.text()) as Setup
}
