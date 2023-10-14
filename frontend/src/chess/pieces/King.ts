import type { Position } from "../coordinates/Position";
import { Direction } from "../coordinates/Direction";
import { PieceName } from "../enums/PieceName";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import type { Square } from "../Square";
import { Move } from "../moves/Move";
import { Capture } from "../moves/Capture";
import { Castling } from "../moves/Castling";
import type { Chessboard } from "../Chessboard";
import type { PlayerController } from "../players/PlayerController";

export class King extends Piece
{
    static Directions: Position[] = Queen.Directions;

    static kingsideRookPosition = {
        direction: Direction.Right,
        gap: 3
    }
    static queensideRookPosition = {
        direction: Direction.Left,
        gap: 4
    }

    getName(): PieceName
    {
        return PieceName.King;
    }

    getMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = null;

        for (const direction of King.Directions) {
            if (toSquare = chessboard.getNextSquare(fromSquare, direction)) {
                if (!toSquare.isNextToOpponentKing(this.color, chessboard)) {
                    if (toSquare.isEmpty()) {
                        let move: Move = new Move(fromSquare, toSquare);
                        if (!controller.isCheckedIfMoving(move, chessboard)) {
                            moves.push(move);
                        }
                    } else {
                        if (toSquare.isOccupiedByOpponent(this.color) && !toSquare.isOccupiedByPieceName(PieceName.King)) {
                            let move: Move = new Capture(fromSquare, toSquare, toSquare.getPiece());
                            if (!controller.isCheckedIfMoving(move, chessboard)) {
                                moves.push(move);
                            }
                        }
                    }
                }
            }
        }

        return [
            ...moves,
            ...this.getCastlingMoves(fromSquare, chessboard, controller)
        ];
    }

    getCastlingMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = null;
        let rookSquare: Square|null = null;

        if (this.hasNeverMoved())
        {
            for (const rookPosition of [King.kingsideRookPosition, King.queensideRookPosition])
            {
                toSquare = fromSquare;
                rookSquare = chessboard.getNextSquare(fromSquare, rookPosition.direction, rookPosition.gap);

                if (rookSquare && rookSquare.isOccupiedByPieceName(PieceName.Rook) && rookSquare.getPiece()!.hasNeverMoved())
                {
                    if ((toSquare = chessboard.getNextSquare(toSquare, rookPosition.direction)) && toSquare.isEmpty()) {
                        let move: Move = new Move(fromSquare, toSquare);
                        if (!controller.isCheckedIfMoving(move, chessboard)) {
                            if ((toSquare = chessboard.getNextSquare(toSquare, rookPosition.direction)) && toSquare.isEmpty()) {
                                move = new Castling(fromSquare, toSquare, 
                                    new Move(rookSquare, chessboard.getNextSquare(fromSquare, rookPosition.direction)!)
                                );
                                if (!controller.isCheckedIfMoving(move, chessboard)) {
                                    moves.push(move);
                                }
                            }
                        }
                    }
                }
            }
        }

        return moves;
    }
}
