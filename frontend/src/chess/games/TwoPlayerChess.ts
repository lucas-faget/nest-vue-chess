import type { ChessVariant } from "../types/ChessVariant";
import type { FenRecord } from "../types/FenRecord";
import { PlayerColor } from "../types/PlayerColor";
import type { Player } from "../players/Player";
import { Blacks, Whites } from "../players/Players";
import type { Chessboard } from "../chessboards/Chessboard";
import { TwoPlayerChessboard } from "../chessboards/TwoPlayerChessboard";
import { Chess } from "./Chess";

export class TwoPlayerChess extends Chess
{
    static FenString: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -";
    static Players: Player[] = [Whites, Blacks];

    static WhiteKingsideCastling: string = 'K';
    static WhiteQueensideCastling: string = 'Q';
    static BlackKingsideCastling: string = 'k';
    static BlackQueensideCastling: string = 'q';

    constructor(variant: ChessVariant, fenString: string = TwoPlayerChess.FenString)
    {
        const fenRecord: FenRecord = TwoPlayerChess.getFenRecordFromString(fenString);
        const chessboard: Chessboard = new TwoPlayerChessboard(fenRecord.position);
        const players = TwoPlayerChess.Players;
        const currentPlayerIndex: number = fenRecord.sideToMove === 'w' ? 0 : 1;

        super(variant, chessboard, players, currentPlayerIndex);
        this.setCastlingRights(fenRecord.castlingRights);
    }

    static getFenRecordFromString(fenString: string): FenRecord
    {
        const fenData: string[] = fenString.split(' ');
        return {
            position: fenData[0],
            sideToMove: fenData[1],
            castlingRights: fenData[2],
            enPassantTarget: fenData[3]
        }
    }

    setCastlingRights(castlingRightsString: string): void
    {
        this.players[0].castlingRights = {
            kingside: castlingRightsString.includes(TwoPlayerChess.WhiteKingsideCastling),
            queenside: castlingRightsString.includes(TwoPlayerChess.WhiteQueensideCastling)
        };

        this.players[1].castlingRights = {
            kingside: castlingRightsString.includes(TwoPlayerChess.BlackKingsideCastling),
            queenside: castlingRightsString.includes(TwoPlayerChess.BlackQueensideCastling)
        };
    }
}
