import type { Position } from "../coordinates/Position";
import { PieceName } from "../types/PieceName";
import type { PlayerColor } from "../types/PlayerColor"
import type { CastlingRights } from "../types/CastlingRights";

export class Player
{
    color: PlayerColor;
    name: string;
    direction: Position;
    castlingRights: CastlingRights;
    capturedPieces: Map<PieceName, number>;
    advantage: number;

    constructor(color: PlayerColor, name: string, direction: Position) {
        this.color = color;
        this.name = name;
        this.direction = direction;
        this.castlingRights = {
            kingside: false,
            queenside: false
        };
        this.capturedPieces = new Map<PieceName, number>([
            [PieceName.Queen, 0],
            [PieceName.Rook, 0],
            [PieceName.Bishop, 0],
            [PieceName.Knight, 0],
            [PieceName.Pawn, 0]
        ]);
        this.advantage = 0;
    }

    addCapturedPiece(pieceName: PieceName) {
        this.capturedPieces.set(pieceName, (this.capturedPieces.get(pieceName) ?? 0) + 1);
    }
    
    removeCapturedPiece(pieceName: PieceName) {
        this.capturedPieces.set(pieceName, (this.capturedPieces.get(pieceName) ?? 0) - 1);
    }
}
