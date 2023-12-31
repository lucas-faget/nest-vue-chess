import type { Coordinates } from "../coordinates/Position";
import { PieceName } from "../types/PieceName";
import { Piece } from "./Piece";
import type { Square } from "../squares/Square";
import { Move } from "../moves/Move";
import { Capture } from "../moves/Capture";
import type { Chessboard } from "../chessboards/Chessboard";
import type { PlayerController } from "../players/PlayerController";

export abstract class MobilePiece extends Piece
{
    directions: Coordinates[] = [];

    getMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = null;

        for (const direction of this.directions) {
            toSquare = fromSquare;
            while (toSquare = chessboard.getSquareByDirection(toSquare, direction)) {
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
                    break;
                }
            }
        }

        return moves;
    }
}
