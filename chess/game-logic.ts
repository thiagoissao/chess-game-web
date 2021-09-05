/*
PSEUDOCODIGO

função DECISÃO-MINIMAX(estado) retorna uma ação
  returnar arg max a que pertença Ações(s) de VALOR-MIN(RESULTADO(estado, a))

função VALOR-MAX(estado) retorna um valor de utilidade
  se TESTE TERMINAL (estado) então reotornar UTILIDADE(estado)
  v = +infinity
  para cada a em AÇÕES(estado) faça
    v = MAX(v, VALOR-MIN(RESULTADOS(s, a)))
  retornar v

função VALOR-MIN(estado) retorna um valor de utilidade
  se TESTE-TERMINAL (estado) então retornar UTILIDADE(estado)
  v = -infinity
  para cada a em AÇÕES(estado) faça
    v = MIN(v, VALOR-MAX(RESULTADOS(s, a)))
  retorna v

*/

type MinimaxParams = {
  depth: number
  nodeIndex: number
  isMax: boolean
  scores: number[]
  h: number
}
type MinimaxProps = (params: MinimaxParams) => number

export const log2 = (n: number) => (n === 1 ? 0 : 1 + log2(n / 2))

export const minimax: MinimaxProps = ({
  depth,
  nodeIndex,
  isMax,
  scores,
  h,
}) => {
  if (depth === h) return scores[nodeIndex]

  const props: MinimaxParams = {
    depth: depth + 1,
    nodeIndex: nodeIndex * 2,
    isMax: false,
    scores,
    h,
  }

  if (isMax)
    return Math.max(
      minimax(props),
      minimax({ ...props, nodeIndex: nodeIndex * 2 + 1 })
    )

  return Math.min(
    minimax({
      ...props,
      isMax: true,
    }),
    minimax({
      ...props,
      isMax: true,
      nodeIndex: nodeIndex + 1,
    })
  )
}
