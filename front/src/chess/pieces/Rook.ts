import type { Position } from "../coordinates/Position";
import { Direction } from "../coordinates/Direction";
import type { PlayerColor } from "../enums/PlayerColor";
import { PieceName } from "../enums/PieceName";
import { MobilePiece } from "./MobilePiece";

export class Rook extends MobilePiece
{
    static Directions: Position[] = [
        Direction.Up, Direction.Right, Direction.Down, Direction.Left,
    ];

    constructor(color: PlayerColor) {
        super(color);
        this.directions = Rook.Directions;
    }

    getName(): PieceName
    {
        return PieceName.Rook;
    }
}
