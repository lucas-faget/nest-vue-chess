import { PlayerColor } from "../types/PlayerColor";
import { PieceName } from "../types/PieceName";
import { Square } from "../squares/Square";
import { Chessboard } from "./Chessboard";

const isInteger = (char: string) => !isNaN(parseInt(char));
const isUpperCase = (char: string) => char === char.toUpperCase();
const isPieceName = (char: string) => Object.values(PieceName).includes(char.toLowerCase() as PieceName);

export class TwoPlayerChessboard extends Chessboard
{
    static Ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
    static Files = ["a", "b", "c", "d", "e", "f", "g", "h"];

    kingSquareNameByPlayer: Object = {
        [PlayerColor.White]: "e1",
        [PlayerColor.Black]: "e8"
    };

    constructor(fenPosition: string)
    {
        super(TwoPlayerChessboard.Ranks, TwoPlayerChessboard.Files);

        // Fill the chessboard
        const fenRows: string[] = fenPosition.split('/');
        for (let [rowIndex, row] of fenRows.entries()) {
            rowIndex = this.ranks.length - 1 - rowIndex;
            let colIndex: number = 0;
            for (const char of row) {
                if (isInteger(char)) {
                    for (let index = 0; index < parseInt(char); index++) {
                        let square: Square = new Square(
                            this.files[colIndex] + this.ranks[rowIndex],
                            { x: rowIndex, y: colIndex }
                        );
                        this.squares.set(square.name, square);
                        colIndex++;
                    }
                } else {
                    let square: Square = new Square(
                        this.files[colIndex] + this.ranks[rowIndex],
                        { x: rowIndex, y: colIndex }
                    );
                    if (isPieceName(char)) {
                        square.setPiece(char.toLowerCase() as PieceName, isUpperCase(char) ? PlayerColor.White : PlayerColor.Black)
                        this.squares.set(square.name, square);
                        colIndex++;
                    }
                }
            }
        }
    }
}
