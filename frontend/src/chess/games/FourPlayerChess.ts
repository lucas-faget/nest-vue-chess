import type { ChessVariant } from "../types/ChessVariant";
import type { Player } from "../players/Player";
import { Blacks, Golds, Silvers, Whites } from "../players/Players";
import type { Chessboard } from "../chessboards/Chessboard";
import { FourPlayerChessboard } from "../chessboards/FourPlayerChessboard";
import { Chess } from "./Chess";

export class FourPlayerChess extends Chess
{
    static Players: Player[] = [Whites, Blacks, Silvers, Golds];

    // static WhiteKingsideCastling: string = 'K';
    // static WhiteQueensideCastling: string = 'Q';
    // static BlackKingsideCastling: string = 'k';
    // static BlackQueensideCastling: string = 'q';

    constructor(variant: ChessVariant)
    {
        const chessboard: Chessboard = new FourPlayerChessboard();
        const players = FourPlayerChess.Players;

        super(variant, chessboard, players, 0);
    }
}
