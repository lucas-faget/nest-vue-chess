import type { Position } from "../coordinates/Position";
import { Direction } from "../coordinates/Direction";
import { PieceName } from "../types/PieceName";
import { Piece } from "./Piece";
import type { Square } from "../Square";
import { Capture } from "../moves/Capture";
import { Move } from "../moves/Move";
import type { Chessboard } from "../Chessboard";
import type { PlayerController } from "../players/PlayerController";

export class Knight extends Piece
{
    static Directions: Position[] = [
        Direction.UpUpLeft, Direction.UpUpRight, Direction.UpRightRight, Direction.DownRightRight, 
        Direction.DownDownRight, Direction.DownDownLeft, Direction.DownLeftLeft, Direction.UpLeftLeft
    ];

    getName(): PieceName
    {
        return PieceName.Knight;
    }

    getMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = null;

        for (const direction of Knight.Directions) {
            if (toSquare = chessboard.getNextSquare(fromSquare, direction)) {
                if (toSquare.isEmpty()) {
                    let move: Move = new Move(fromSquare, toSquare);
                    if (!controller.isCheckedIfMoving(move, chessboard)) {
                        moves.push(move);
                    }
                } else {
                    if (!toSquare.isOccupiedByAlly(this.color) && !toSquare.isOccupiedByPieceName(PieceName.King)) {
                        let move: Move = new Capture(fromSquare, toSquare, toSquare.getPiece());
                        if (!controller.isCheckedIfMoving(move, chessboard)) {
                            moves.push(move);
                        }
                    }
                }
            }
        }

        return moves;
    }
}
