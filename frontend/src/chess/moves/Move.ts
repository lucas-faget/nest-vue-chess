import type { Piece } from "../pieces/Piece";
import type { Player } from "../players/Player";
import type { Square } from "../squares/Square";
import type { CastlingRights } from "../types/CastlingRights";
import type { SerialisedMove } from "./SerialisedMove";

export class Move
{
    fromSquare: Square;
    toSquare: Square;
    capturedPiece: Piece|null;
    isKingsideCastlingDisabled?: boolean;
    isQueensideCastlingDisabled?: boolean;

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
}
