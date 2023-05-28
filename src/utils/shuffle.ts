function randomElement<T> (list: T[]): T {
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

export function randomPair<T> (list: T[]): [T, T] {
  let a, b: T
  do {
    a = randomElement(list)
    b = randomElement(list)
  } while (a === b)
  return [a, b]
}
