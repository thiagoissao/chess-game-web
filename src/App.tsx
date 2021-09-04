import React, { useState } from 'react'
import { ChessInstance, ShortMove } from 'chess.js'
import Chessboard from 'chessboardjsx'
import './app.css'

const Chess = require('chess.js')

const App = () => {
  const [chess] = useState<ChessInstance>(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  )

  const [fen, setFen] = useState(chess.fen())

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves()

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)]
          chess.move(computerMove)
          setFen(chess.fen())
        }
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
