import type { Move } from "./Move";

export interface LegalMoves {
    [key: string]: {
        [key: string]: Move;
    };
}
