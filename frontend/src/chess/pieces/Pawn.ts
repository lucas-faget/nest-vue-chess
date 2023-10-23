import type { Position } from "../coordinates/Position";
import { Direction } from "../coordinates/Direction";
import { PieceName } from "../enums/PieceName";
import type { PlayerColor } from "../enums/PlayerColor";
import { Piece } from "./Piece";
import type { Square } from "../Square";
import { Move } from "../moves/Move";
import { Capture } from "../moves/Capture";
import { Promotion } from "../moves/Promotion";
import { EnPassantCapture } from "../moves/EnPassantCapture";
import type { Chessboard } from "../Chessboard";
import type { PlayerController } from "../players/PlayerController";
import { Chess } from "../Chess";

export class Pawn extends Piece
{
    constructor(color: PlayerColor) {
        super(color);
    }

    getName(): PieceName
    {
        return PieceName.Pawn;
    }

    getMoves(fromSquare: Square, chessboard: Chessboard, controller: PlayerController, lastMove: Move|null): Move[]
    {
        let moves: Move[] = [];
        let toSquare: Square|null = fromSquare;

        toSquare = chessboard.getNextSquare(toSquare, controller.player.direction);
        if (toSquare && toSquare.isEmpty()) {
            let move: Move;
            if (chessboard.getNextSquare(toSquare, controller.player.direction)) {
                move = new Move(fromSquare, toSquare);
            } else {
                move = new Promotion(fromSquare, toSquare, null);
            }
            if (!controller.isCheckedIfMoving(move, chessboard)) {
                moves.push(move);
            }
            if (this.hasNeverMoved()) {
                toSquare = chessboard.getNextSquare(toSquare, controller.player.direction);
                if (toSquare && toSquare.isEmpty()) {
                    let move: Move = new Move(fromSquare, toSquare);
                    if (!controller.isCheckedIfMoving(move, chessboard)) {
                        moves.push(move);
                    }
                }
            }
        }

        for (const direction of Pawn.getCaptureDirections(controller.player.direction)) {
            toSquare = chessboard.getNextSquare(fromSquare, direction);
            if (toSquare && toSquare.isOccupiedByOpponent(this.color) && !toSquare.isOccupiedByPieceName(PieceName.King)) {
                let move: Move;
                if (chessboard.getNextSquare(toSquare, controller.player.direction)) {
                    move = new Capture(fromSquare, toSquare, toSquare.getPiece());
                } else {
                    move = new Promotion(fromSquare, toSquare, toSquare.getPiece());
                }
                if (!controller.isCheckedIfMoving(move, chessboard)) {
                    moves.push(move);
                }
            }
        }

        return [
            ...moves,
            ...this.getEnPassantCapture(fromSquare, chessboard, controller, lastMove)
        ];
    }

    getEnPassantCapture(fromSquare: Square, chessboard: Chessboard, controller: PlayerController, lastMove: Move|null): Move[]
    {
        let moves: Move[] = [];
        let captureSquare: Square|null = null;
        let toSquare: Square|null = null; 

        for (const direction of [Direction.Left, Direction.Right]) {
            captureSquare = chessboard.getNextSquare(fromSquare, direction);
            if (captureSquare &&
                captureSquare === lastMove?.toSquare &&
                chessboard.getNextSquare(captureSquare, controller.player.direction, 2) === lastMove.fromSquare &&
                captureSquare.getPiece()!.hasMovedOnce() &&
                captureSquare.isOccupiedByPieceName(PieceName.Pawn) &&
                captureSquare.isOccupiedByOpponent(this.color))
            {
                toSquare = chessboard.getNextSquare(captureSquare, controller.player.direction);
                if (toSquare && toSquare.isEmpty()) {
                    let move: Move = new EnPassantCapture(fromSquare, toSquare, captureSquare.getPiece()!, captureSquare);
                    if (!controller.isCheckedIfMoving(move, chessboard)) {
                        moves.push(move);
                    }
                }
            }
        }

        return moves;
    }

    static getCaptureDirections(direction: Position): Position[]
    {
        if (Chess.areEqualCoordinates(direction, Direction.Up)) {
            return [Direction.UpLeft, Direction.UpRight];
        } else if (Chess.areEqualCoordinates(direction, Direction.Down)) {
            return [Direction.DownLeft, Direction.DownRight];
        } else if (Chess.areEqualCoordinates(direction, Direction.Right)) {
            return [Direction.UpRight, Direction.DownRight];
        } else if (Chess.areEqualCoordinates(direction, Direction.Left)) {
            return [Direction.UpLeft, Direction.DownLeft];
        } else {
            return [];
        }
    }
}
