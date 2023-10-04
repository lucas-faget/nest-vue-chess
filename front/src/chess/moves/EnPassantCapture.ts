import type { Piece } from "../pieces/Piece";
import type { Square } from "../Square";
import { Capture } from "./Capture";

export class EnPassantCapture extends Capture
{
    capturedPieceSquare: Square;

    constructor(fromSquare: Square, toSquare: Square, capturedPiece: Piece, capturedPieceSquare: Square) {
        super(fromSquare, toSquare, capturedPiece);
        this.capturedPieceSquare = capturedPieceSquare;
    }

    carryoutMove(): void
    {
        super.carryoutMove();
        this.capturedPieceSquare.piece = null;
    }

    undoMove(): void
    {
        this.fromSquare.piece = this.toSquare.piece;
        this.fromSquare.piece!.moveCount--;
        this.toSquare.piece = null;
        this.capturedPieceSquare.piece = this.capturedPiece;
    }
}
