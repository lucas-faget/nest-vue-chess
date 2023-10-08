import type { Position } from "../coordinates/Position";
import { Direction } from "../coordinates/Direction";
import type { PlayerColor } from "../enums/PlayerColor";
import { PieceName } from "../enums/PieceName";
import { MobilePiece } from "./MobilePiece";

export class Bishop extends MobilePiece
{
    static Directions: Position[] = [
        Direction.UpLeft, Direction.UpRight, Direction.DownRight, Direction.DownLeft,
    ];

    constructor(color: PlayerColor) {
        super(color);
        this.directions = Bishop.Directions;
    }

    getName(): PieceName
    {
        return PieceName.Bishop;
    }
}
