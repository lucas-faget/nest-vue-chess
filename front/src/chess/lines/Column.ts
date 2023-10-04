import type { PieceName } from "../enums/PieceName";
import { Line } from "./Line";

export class Column extends Line
{
    pieceName: PieceName;

    constructor(index: number, name: string, pieceName: PieceName) {
        super(index, name);
        this.pieceName = pieceName;
    }
}
