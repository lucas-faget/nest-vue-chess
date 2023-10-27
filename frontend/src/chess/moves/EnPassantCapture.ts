import type { Piece } from "../pieces/Piece";
import type { Player } from "../players/Player";
import type { Square } from "../squares/Square";
import { Capture } from "./Capture";

export class EnPassantCapture extends Capture
{
    capturedPieceSquare: Square;

    constructor(fromSquare: Square, toSquare: Square, capturedPiece: Piece, capturedPieceSquare: Square) {
        super(fromSquare, toSquare, capturedPiece);
        this.capturedPieceSquare = capturedPieceSquare;
    }

    carryoutMove(player: Player): void
    {
        super.carryoutMove(player);
        this.capturedPieceSquare.piece = null;
    }

    undoMove(player: Player): void
    {
        this.fromSquare.piece = this.toSquare.piece;
        this.toSquare.piece = null;
        this.capturedPieceSquare.piece = this.capturedPiece;
    }
}
