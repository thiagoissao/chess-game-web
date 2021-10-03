import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { Chess, ChessInstance } from "chess.js";
import Chessboard from "chessboardjsx";
import { getBestMove, getRandomMove } from './game-logic'

class RandomVsMinMax extends React.Component {
    static propTypes = { children: PropTypes.func };
    game!: ChessInstance;
    state = { game:this.game, fen: this.game.fen(), isWhiteTurn: true };

    constructor() {
        super(PropTypes.func);
        this.game = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    }
    componentDidMount() {
        setTimeout(() => this.handleMove, 10000)
    }

    componentWillUnmount() {
        window.clearTimeout(this.timer());
    }

    timer = () => window.setTimeout(this.handleMove, 10000)

    handleMove = () => {
        let possibleMoves = this.game.moves();

        if (this.game.game_over() === true || this.game.in_draw() === true || possibleMoves.length === 0)
            return;

        if (this.state.isWhiteTurn) {
            let randomIndex = Math.floor(Math.random() * possibleMoves.length);
            this.game.move(possibleMoves[randomIndex]);

            this.setState({ fen: this.game.fen(), isWhiteTurn: !this.state.isWhiteTurn });

            this.timer();
        }
        else {
            setTimeout(() => {
                const newMove = getBestMove(this.game) //Mudar para getRandomMove para usar o algoritmo aleatório
                this.game.move(newMove)
                this.setState({ fen: this.game.fen(), isWhiteTurn: !this.state.isWhiteTurn });
                this.timer();
            }, 300)
        }
    };


    render() {
        return { fen: this.state.fen };
    }
}

export default function RandomVsMinMaxGame() {
    return (
        <div>
            <RandomVsMinMax>
                {({ position }: any) => (
                    <Chessboard
                        width={600}
                        position={position}
                        boardStyle={{
                            borderRadius: "5px",
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                          }}
                    />
                )}
            </RandomVsMinMax>
        </div>
    )
}