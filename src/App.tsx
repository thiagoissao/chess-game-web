import React, { useEffect, useState } from 'react'
import { ChessInstance, ShortMove } from 'chess.js'
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

  const handleMove = async () => {
    if (chess.game_over()) {
      alert('O Jogo terminou!')
      return
    }

    if (isWhiteTurn) {
      setTimeout(() => {
        console.log('best Move')
        const newMove = getBestMove(chess) //Mudar para getRandomMove para usar o algoritmo aleatório
        chess.move(newMove)
        setFen(chess.fen())
        setIsWhiteTurn(false)
      }, 1000)
    } else {
      setTimeout(() => {
        console.log('random move')
        const newMove = getRandomMove(chess) //Mudar para getRandomMove para usar o algoritmo aleatório
        chess.move(newMove)
        setFen(chess.fen())
        setIsWhiteTurn(true)
      }, 1000)
    }
  }

  const playNextTurn = async () => {
    await handleMove()
  }

  useEffect(() => {
    if (isWhiteTurn !== undefined) {
      // se for undefined então o jogo não começou
      playNextTurn()
    }
  }, [isWhiteTurn])

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
      {isWhiteTurn !== undefined && <h4>O Jogo começou</h4>}
      <Chessboard width={600} position={fen} />
    </div>
  )
}

export default App
