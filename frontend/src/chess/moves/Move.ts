import type { Chessboard } from "../chessboards/Chessboard";
import type { Coordinates } from "../coordinates/Position";
import type { Piece } from "../pieces/Piece";
import type { Square } from "../squares/Square";
import { MoveType } from "../types/MoveType";
import { PieceName } from "../types/PieceName";
import type { SerialisedMove } from "../types/SerialisedMove";

export class Move
{
    fromSquare: Square;
    toSquare: Square;
    capturedPiece: Piece|null;

    constructor(fromSquare: Square, toSquare: Square)
    {
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
        this.capturedPiece = null;
    }

    carryoutMove(): void
    {
        this.toSquare.piece = this.fromSquare.piece;
        this.fromSquare.piece = null;
    }

    undoMove(): void
    {
        this.fromSquare.piece = this.toSquare.piece;
        this.toSquare.piece = null;
    }

    serialiseMove(): SerialisedMove
    {
        return {
            fromSquareName: this.fromSquare.name,
            toSquareName: this.toSquare.name
        }
    }

    isDoubleStepPawnAdvance(chessboard: Chessboard, playerDirection: Coordinates): boolean
    {
        return this.fromSquare.getPiece()?.getName() === PieceName.Pawn
            && this.toSquare === chessboard.getSquareByDirection(this.fromSquare, playerDirection, 2);
    }

    getMoveType(): MoveType
    {
        return MoveType.Move;
    }
}
