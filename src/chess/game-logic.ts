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
  if (depth === 0) return evaluateBoard(game.board())
  const moves = game.moves()

  if (isMaxPlayer) {
    let bestMove = Number.NEGATIVE_INFINITY
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i])
      const minimaxResult = minimax(depth - 1, game, alpha, beta, !isMaxPlayer)
      bestMove = Math.max(bestMove, minimaxResult)
      game.undo()

      alpha = Math.max(alpha, bestMove)
      if (alpha >= beta) {
        return bestMove
      }
    }
    return bestMove
  }

  let bestMove = Number.POSITIVE_INFINITY
  for (let i = 0; i < moves.length; i++) {
    game.move(moves[i])
    const minimaxResult = minimax(depth - 1, game, alpha, beta, !isMaxPlayer)
    bestMove = Math.min(bestMove, minimaxResult)
    game.undo()
    beta = Math.min(beta, bestMove)
    if (alpha >= beta) {
      return bestMove
    }
  }

  return bestMove
}

export const getRandomMove = (game: ChessInstance): string => {
  let possibleMoves = game.moves()

  return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
}

export const getBestMove = (game: ChessInstance): string => {
  const best = game.moves().reduce(
    (prev, move) => {
      game.move(move)
      const value = minimax(
        TREE_DEPTH - 1,
        game,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        false
      )
      game.undo()
      if (value >= prev.bestMove) {
        return {
          bestMove: value,
          bestMoveFound: move,
        }
      }
      return prev
    },
    {
      bestMove: Number.NEGATIVE_INFINITY,
      bestMoveFound: '',
    }
  )

  return best.bestMoveFound
}
