import type { Piece } from "../pieces/Piece";
import type { Square } from "../Square";
import type { SerialisedMove } from "./SerialisedMove";

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
        this.toSquare.piece!.moveCount++;
        this.fromSquare.piece = null;
    }

    undoMove(): void
    {
        this.fromSquare.piece = this.toSquare.piece;
        this.fromSquare.piece!.moveCount--;
        this.toSquare.piece = null;
    }

    serialiseMove(): SerialisedMove
    {
        return {
            fromSquareName: this.fromSquare.name,
            toSquareName: this.toSquare.name
        }
    }
}
