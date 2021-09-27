import React, { useState } from 'react'
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

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const newMove = getBestMove(chess) //Mudar para getRandomMove para usar o algoritmo aleatório
        chess.move(newMove)
        setFen(chess.fen())
      }, 300)
      setFen(chess.fen())
    }
  }

  return (
    <div className='flex-center'>
      <h1>Jogo de Xadrez</h1>
      <h3 className='subtitle'>Utilizando Inteligência Artificial</h3>
      <Chessboard
        width={600}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q',
          })
        }
      />
    </div>
  )
}

export default App
