import type { PieceName } from "../enums/PieceName";
import type { PlayerColor } from "../enums/PlayerColor";

export interface JsonObject {
    files: string[];
    ranks: string[];
    pieces: {
        [key: string]: {
            name: PieceName;
            color: PlayerColor;
        };
    };
    voidSquares?: string[];
}
