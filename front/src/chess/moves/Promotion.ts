import { PieceName } from "../enums/PieceName";
import { Pawn } from "../pieces/Pawn";
import type { Piece } from "../pieces/Piece";
import { Queen } from "../pieces/Queen";
import type { Square } from "../Square";
import { Capture } from "./Capture";

export class Promotion extends Capture
{
    carryoutMove(): void
    {
        this.toSquare.piece = new Queen(this.fromSquare.piece!.color);
        this.toSquare.piece!.moveCount = this.fromSquare.piece!.moveCount + 1;
        this.fromSquare.piece = null;
    }

    undoMove(): void
    {
        this.fromSquare.piece = new Pawn(this.toSquare.piece!.color);
        this.fromSquare.piece!.moveCount = this.fromSquare.piece!.moveCount - 1;
        this.toSquare.piece = this.capturedPiece;
    }
}
