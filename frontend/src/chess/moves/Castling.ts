import type { Square } from "../squares/Square";
import { MoveType } from "../types/MoveType";
import { Move } from "./Move";

export class Castling extends Move
{
    rookMove: Move;

    constructor(fromSquare: Square, toSquare: Square, rookMove: Move) {
        super(fromSquare, toSquare);
        this.rookMove = rookMove;
    }

    carryoutMove(): void
    {
        super.carryoutMove();
        this.rookMove.carryoutMove();
    }

    undoMove(): void
    {
        super.undoMove();
        this.rookMove.undoMove();
    }

    getMoveType(): MoveType
    {
        return MoveType.Castling;
    }
}
