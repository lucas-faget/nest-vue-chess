import { Pawn } from "../pieces/Pawn";
import { Queen } from "../pieces/Queen";
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
