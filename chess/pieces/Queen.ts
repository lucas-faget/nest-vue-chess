import type { Position } from "../coordinates/Position";
import type { PlayerColor } from "../enums/PlayerColor";
import { PieceName } from "../enums/PieceName";
import { MobilePiece } from "./MobilePiece";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";

export class Queen extends MobilePiece
{
    static Directions: Position[] = [
        ...Bishop.Directions, ...Rook.Directions
    ];

    constructor(color: PlayerColor) {
        super(color);
        this.directions = Queen.Directions;
    }

    getName(): PieceName
    {
        return PieceName.Queen;
    }
}
