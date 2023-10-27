import { Chessboard } from "./Chessboard";

export class FourPlayerChessboard extends Chessboard
{
    static Ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
    static Files = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"];

    constructor()
    {
        super(FourPlayerChessboard.Ranks, FourPlayerChessboard.Files);

        // Fill the chessboard
    }
}

