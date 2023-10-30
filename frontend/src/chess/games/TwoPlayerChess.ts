import type { ChessVariant } from "../types/ChessVariant";
import type { FenRecord } from "../types/FenRecord";
import type { Player } from "../players/Player";
import { Blacks, Whites } from "../players/Players";
import type { Chessboard } from "../chessboards/Chessboard";
import { TwoPlayerChessboard } from "../chessboards/TwoPlayerChessboard";
import { PlayerController } from "../players/PlayerController";
import { Chess } from "./Chess";
import type { GameState } from "../types/GameState";

export class TwoPlayerChess extends Chess
{
    static WhiteColor = 'w';
    static BlackColor = 'b';

    static WhiteKingsideCastling: string = 'K';
    static WhiteQueensideCastling: string = 'Q';
    static BlackKingsideCastling: string = 'k';
    static BlackQueensideCastling: string = 'q';

    static FenString: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    constructor(variant: ChessVariant, fenString: string = TwoPlayerChess.FenString)
    {
        const fenRecord: FenRecord = TwoPlayerChess.getFenRecordFromString(fenString);

        const players: Player[] = [Whites, Blacks];
        const controller: PlayerController = new PlayerController(
            fenRecord.activeColor === TwoPlayerChess.WhiteColor ? players[0] : players[1]
        );
        const chessboard: Chessboard = new TwoPlayerChessboard(fenRecord.position);
        const gameState: GameState = {
            move: null,
            castlingRights: {
                kingside: controller.player.castlingRights.kingside,
                queenside: controller.player.castlingRights.queenside,
            },
            enPassantTargetSquare: fenRecord.enPassantTarget,
            halfmoveNumber: parseInt(fenRecord.halfmoveClock)
        };

        super(variant, players, controller, chessboard, gameState);
        this.setCastlingRightsFromFen(fenRecord.castlingRights);
    }

    static getFenRecordFromString(fenString: string): FenRecord
    {
        const fenData: string[] = fenString.split(' ');
        return {
            position: fenData[0],
            activeColor: fenData[1],
            castlingRights: fenData[2],
            enPassantTarget: fenData[3],
            halfmoveClock: fenData[4],
            fullmoveNumber: fenData[5]
        }
    }

    setCastlingRightsFromFen(castlingRightsString: string): void
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
