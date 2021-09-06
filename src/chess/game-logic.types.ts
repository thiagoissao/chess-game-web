import { PieceType } from 'chess.js'

export enum PIECES_VALUES {
  PAWN = 10, // PEÃO
  ROOK = 50, // TORRE
  BISHOP = 30, // BISPO
  KNIGHT = 30, //CAVALO
  QUEEN = 90, //RAINHA
  KING = 900, // REI
}

export type Board = Array<Array<{ type: PieceType; color: 'w' | 'b' } | null>>
