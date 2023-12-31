import { Side } from "../types/Sides";
import type { Coordinates } from "../coordinates/Position";
import { PieceName } from "../types/PieceName";
import { Piece } from "./Piece";
import { Queen } from "./Queen";
import type { Square } from "../squares/Square";
import { Move } from "../moves/Move";
import { Capture } from "../moves/Capture";
import { Castling } from "../moves/Castling";
import type { Chessboard } from "../chessboards/Chessboard";
import type { PlayerController } from "../players/PlayerController";

export class King extends Piece
{
    static Directions: Coordinates[] = Queen.Directions;

    static KingsideCastlingStep: number = 3;
    static QueensideCastlingStep: number = 4;

    getName(): PieceName
    {
        return PieceName.King;
    }

    getMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = null;

        for (const direction of King.Directions) {
            if (toSquare = chessboard.getSquareByDirection(fromSquare, direction)) {
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

        if (controller.player.castlingRights.kingside || controller.player.castlingRights.queenside)
        {
            const sides: Side[] = [];
            if (controller.player.castlingRights.kingside) {
                sides.push(Side.Kingside);
            }
            if (controller.player.castlingRights.queenside) {
                sides.push(Side.Queenside);
            }
            for (const side of sides)
            {
                const castlingDirection: Coordinates = side === Side.Kingside ?
                    controller.player.kingsideCastlingDirection() :
                    controller.player.queensideCastlingDirection();
                const castlingStep: number = side === Side.Kingside ?
                    King.KingsideCastlingStep :
                    King.QueensideCastlingStep;

                if (castlingDirection) {
                    toSquare = fromSquare;
                    rookSquare = chessboard.getSquareByDirection(fromSquare, castlingDirection, castlingStep);
    
                    if (rookSquare && rookSquare.isOccupiedByPieceName(PieceName.Rook))
                    {
                        if ((toSquare = chessboard.getSquareByDirection(toSquare, castlingDirection)) && toSquare.isEmpty()) {
                            let move: Move = new Move(fromSquare, toSquare);
                            if (!controller.isCheckedIfMoving(move, chessboard)) {
                                if ((toSquare = chessboard.getSquareByDirection(toSquare, castlingDirection)) && toSquare.isEmpty()) {
                                    move = new Castling(fromSquare, toSquare, 
                                        new Move(rookSquare, chessboard.getSquareByDirection(fromSquare, castlingDirection)!)
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
        }

        return moves;
    }
}
