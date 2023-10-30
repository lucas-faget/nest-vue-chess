import type { Move } from "../moves/Move"
import type { CastlingRights } from "./CastlingRights"

export interface GameState {
    move: Move|null;
    castlingRights: CastlingRights;
    enPassantTargetSquare: string;
    halfmoveNumber: number;
}
