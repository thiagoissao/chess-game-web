import { ChessInstance, PieceType } from 'chess.js'
import { Board, PIECES_VALUES } from './game-logic.types'

const TREE_DEPTH = 3

const getPieceColorValue = (color: 'w' | 'b', value: number) =>
  color === 'w' ? value : -value

const getPieceValue = (piece: { type: PieceType; color: 'w' | 'b' } | null) => {
  if (piece === null) return 0

  switch (piece.type) {
    case 'b':
      return getPieceColorValue(piece.color, PIECES_VALUES.BISHOP)
    case 'p':
      return getPieceColorValue(piece.color, PIECES_VALUES.PAWN)
    case 'r':
      return getPieceColorValue(piece.color, PIECES_VALUES.ROOK)
    case 'n':
      return getPieceColorValue(piece.color, PIECES_VALUES.KNIGHT)
    case 'q':
      return getPieceColorValue(piece.color, PIECES_VALUES.QUEEN)
    default:
      return getPieceColorValue(piece.color, PIECES_VALUES.KING)
  }
}

const evaluateBoard = (board: Board) =>
  board.reduce(
    (prev, _, i) =>
      prev + board.reduce((a, _, j) => a + getPieceValue(board[i][j]), 0),
    0
  )

const minimax = (
  depth: number,
  game: ChessInstance,
  alpha: number,
  beta: number,
  isMaxPlayer: boolean
) => {
  if (depth === 0) return -evaluateBoard(game.board())
  const moves = game.moves()
  if (isMaxPlayer) {
    let bestMove = Number.NEGATIVE_INFINITY
    moves.forEach((move) => {
      game.move(move)
      bestMove = Math.max(
        bestMove,
        minimax(depth - 1, game, alpha, beta, !isMaxPlayer)
      )
      game.undo()

      alpha = Math.max(alpha, bestMove)
      if (alpha >= beta) {
        return bestMove
      }
    })
    return bestMove
  }

  let bestMove = Number.POSITIVE_INFINITY
  moves.forEach((move) => {
    game.move(move)
    bestMove = Math.min(
      bestMove,
      minimax(depth - 1, game, alpha, beta, !isMaxPlayer)
    )
    game.undo()
    beta = Math.min(beta, bestMove)
    if (alpha >= beta) {
      return bestMove
    }
  })
  return bestMove
}

export const getRandomMove = (game: ChessInstance): string => {
  if (game.game_over()) {
    alert('O Jogo terminou!')
    return ''
  }

  let possibleMoves = game.moves()

  return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
}

export const getBestMove = (game: ChessInstance): string => {
  if (game.game_over()) {
    alert('O Jogo terminou!')
    return ''
  }

  let newMoves = game.moves()
  let bestMove = Number.NEGATIVE_INFINITY
  let bestMoveFound: string = ''

  newMoves.forEach((move) => {
    game.move(move)
    const value = minimax(
      TREE_DEPTH - 1,
      game,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      false
    )
    game.undo()
    if (value >= bestMove) {
      bestMove = value
      bestMoveFound = move
    }
  })

  return bestMoveFound
}
