import { PlayerColor } from "../types/PlayerColor";
import { PieceName } from "../types/PieceName";
import type { Square } from "../Square";
import type { Move } from "../moves/Move";
import type { PlayerController } from "../players/PlayerController";
import type { Chessboard } from "../Chessboard";

export abstract class Piece
{
    static valueByPieceName: Map<PieceName, number> = new Map([
        [PieceName.Pawn,   1],
        [PieceName.Knight, 3],
        [PieceName.Bishop, 3],
        [PieceName.Rook,   5],
        [PieceName.Queen,  9],
        [PieceName.King,   0]
    ])

    color: PlayerColor;
    moveCount: number = 0;

    constructor(color: PlayerColor) {
        this.color = color;
    }

    abstract getName(): PieceName;

    abstract getMoves(square: Square, chessboard: Chessboard, controller: PlayerController, lastMove: Move|null): Move[];

    hasNeverMoved(): boolean
    {
        return this.moveCount === 0;
    }

    hasMovedOnce(): boolean
    {
        return this.moveCount === 1;
    }

    toString(): string
    {
        return this.color === PlayerColor.White ? this.getName().toUpperCase() : this.getName();
    }
}
