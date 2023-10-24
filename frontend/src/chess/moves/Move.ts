import type { Piece } from "../pieces/Piece";
import type { Square } from "../Square";
import type { CastlingRights } from "../types/CastlingRights";
import type { SerialisedMove } from "./SerialisedMove";

export class Move
{
    fromSquare: Square;
    toSquare: Square;
    capturedPiece: Piece|null;
    castlingRights?: CastlingRights = {
        kingside: false,
        queenside: false
    };

    constructor(fromSquare: Square, toSquare: Square, castlingRights?: CastlingRights)
    {
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
        this.capturedPiece = null;
        this.castlingRights = castlingRights;
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
