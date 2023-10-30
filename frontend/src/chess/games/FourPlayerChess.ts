import type { ChessVariant } from "../types/ChessVariant";
import type { Player } from "../players/Player";
import { Blacks, Golds, Silvers, Whites } from "../players/Players";
import type { Chessboard } from "../chessboards/Chessboard";
import { FourPlayerChessboard } from "../chessboards/FourPlayerChessboard";
import { PlayerController } from "../players/PlayerController";
import { Chess } from "./Chess";
import type { GameState } from "../types/GameState";

export class FourPlayerChess extends Chess
{
    constructor(variant: ChessVariant)
    {
        const players: Player[] = [Whites, Silvers, Blacks, Golds];
        const controller: PlayerController = new PlayerController(
            players[0]
        );
        const chessboard: Chessboard = new FourPlayerChessboard();
        const gameState: GameState = {
            move: null,
            castlingRights: controller.player.castlingRights,
            enPassantTargetSquare: Chess.NoneEnPassantTargetSquare,
            halfmoveNumber: 0
        };

        super(variant, players, controller, chessboard, gameState);
    }
}
