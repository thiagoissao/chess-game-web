import { log2, minimax } from './game-logic'

const scores = [3, 5, 2, 9, 12, 5, 23, 23]
const n = scores.length
const h = log2(n)

test('Minimax function must be 12', () => {
  expect(
    minimax({
      depth: 0,
      h,
      isMax: true,
      nodeIndex: 0,
      scores,
    })
  ).toBe(12)
})
