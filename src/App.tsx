import React, { useCallback, useEffect, useState } from 'react'
import { ChessInstance } from 'chess.js'
import Chessboard from 'chessboardjsx'
import './app.css'
import { getBestMove, getRandomMove } from './chess/game-logic'

const Chess = require('chess.js')

const App = () => {
  const [chess] = useState<ChessInstance>(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  )

  const [fen, setFen] = useState(chess.fen())

  const [isWhiteTurn, setIsWhiteTurn] = useState<boolean | undefined>(undefined)

  const handleMove = useCallback(async () => {
    if (chess.game_over()) {
      alert('O Jogo terminou!')
      return
    }

    if (isWhiteTurn) {
      const timeout = setTimeout(() => {
        console.log('best Move')
        const newMove = getBestMove(chess) //Mudar para getRandomMove para usar o algoritmo aleatório
        chess.move(newMove)
        setFen(chess.fen())
        setIsWhiteTurn(false)
      }, 500)
      return timeout
    } else {
      const timeout = setTimeout(() => {
        console.log('random move')
        const newMove = getRandomMove(chess) //Mudar para getRandomMove para usar o algoritmo aleatório
        chess.move(newMove)
        setFen(chess.fen())
        setIsWhiteTurn(true)
      }, 500)
      return timeout
    }
  }, [chess, isWhiteTurn])

  const reset = () => {
    chess.reset()
    setFen(chess.fen())
    setIsWhiteTurn(undefined)
  }

  useEffect(() => {
    const playNextTurn = async () => {
      return await handleMove()
    }

    // se for undefined então o jogo não começou
    if (isWhiteTurn !== undefined) {
      playNextTurn()
    }
  }, [handleMove, isWhiteTurn])

  console.log(isWhiteTurn)
  return (
    <div className='flex-center'>
      <h1>Jogo de Xadrez</h1>
      <h3 className='subtitle'>Utilizando Inteligência Artificial</h3>
      {isWhiteTurn === undefined && (
        <button className='button' onClick={() => setIsWhiteTurn(true)}>
          Começar
        </button>
      )}
      {isWhiteTurn !== undefined && (
        <button className='button-reset' onClick={reset}>
          Reiniciar
        </button>
      )}
      <Chessboard width={600} position={fen} />
    </div>
  )
}

export default App
