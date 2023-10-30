import type { Piece } from "../pieces/Piece";
import type { Square } from "../squares/Square";
import { MoveType } from "../types/MoveType";
import { Move } from "./Move";

export class Capture extends Move
{
    constructor(fromSquare: Square, toSquare: Square, capturedPiece: Piece|null) {
        super(fromSquare, toSquare);
        this.capturedPiece = capturedPiece;
    }

    undoMove(): void
    {
        this.fromSquare.piece = this.toSquare.piece;
        this.toSquare.piece = this.capturedPiece;
    }

    getMoveType(): MoveType
    {
        return MoveType.Capture;
    }
}
