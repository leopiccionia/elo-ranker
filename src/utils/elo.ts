export const INITIAL_ELO = 400

function expectedScores (Ra: number, Rb: number): [number, number] {
  const Qa = 10 ** (Ra / INITIAL_ELO)
  const Qb = 10 ** (Rb / INITIAL_ELO)
  const S = (Qa + Qb)
  return [Qa / S, Qb / S]
}

export function adjustRatings (Ra: number, Rb: number, S: number): [number, number] {
  const [Ea, Eb] = expectedScores(Ra, Rb)
  const Na = Math.max(Ra + (Ra > 2000 ? 16 : 32) * (S - Ea), INITIAL_ELO / 2)
  const Nb = Math.max(Rb + (Rb > 2000 ? 16 : 32) * ((1 - S) - Eb), INITIAL_ELO / 2)
  return [Na, Nb]
}
