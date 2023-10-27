import type { CastlingRights } from "../types/CastlingRights";
import type { Piece } from "../pieces/Piece";
import type { Square } from "../squares/Square";
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
}
