import { Line } from "./Line";
import type { PlayerColor } from "../enums/PlayerColor";

export class Row extends Line
{
    isPawnRow: boolean;
    isPieceRow: boolean;
    color: PlayerColor|null;

    constructor(index: number, name: string, isPawnRow: boolean, isPieceRow: boolean, color: PlayerColor|null = null) {
        super(index, name);
        this.isPawnRow = isPawnRow;
        this.isPieceRow = isPieceRow;
        this.color = color;
    }
}
