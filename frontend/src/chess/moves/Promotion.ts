import { Pawn } from "../pieces/Pawn";
import { Queen } from "../pieces/Queen";
import { MoveType } from "../types/MoveType";
import { Capture } from "./Capture";

export class Promotion extends Capture
{
    carryoutMove(): void
    {
        this.toSquare.piece = new Queen(this.fromSquare.piece!.color);
        this.fromSquare.piece = null;
    }

    undoMove(): void
    {
        this.fromSquare.piece = new Pawn(this.toSquare.piece!.color);
        this.toSquare.piece = this.capturedPiece;
    }

    getMoveType(): MoveType
    {
        return MoveType.Promotion;
    }
}
