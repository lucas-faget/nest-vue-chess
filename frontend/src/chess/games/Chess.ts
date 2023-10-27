import type { Coordinates } from "../coordinates/Position";
import { ChessVariant } from "../types/ChessVariant";
import type { Move } from "../moves/Move";
import type { Player } from "../players/Player";
import type { Chessboard } from "../chessboards/Chessboard";
import { PlayerController } from "../players/PlayerController";

export abstract class Chess
{
    variant: ChessVariant;
    players: Player[];
    controller: PlayerController;
    chessboard: Chessboard;
    savedMoves: Move[] = [];
    currentMoveIndex: number = 0;
    playerIndexInFront: number = 0;

    constructor(variant: ChessVariant, chessboard: Chessboard, players: Player[], currentPlayerIndex: number)
    {
        this.variant = variant;
        this.chessboard = chessboard;
        this.players = players;
        this.controller = new PlayerController(this.players[currentPlayerIndex]);
        this.controller.calculateMoves(this);
    }

    isCurrentMoveTheLast(): boolean
    {
        return this.currentMoveIndex === this.savedMoves.length;
    }

    canPlay(): boolean
    {
        return this.isCurrentMoveTheLast();
    }

    updateCurrentPlayer(): void
    {
        this.controller.setPlayer(this.players[this.savedMoves.length % this.players.length]);
    }

    updateCapturedPieces(move: Move, isUndoing: boolean): void
    {
        if (move.capturedPiece) {
            for (const player of this.players) {
                if (player === this.controller.player) {
                    if (isUndoing) {
                        player.removeCapturedPiece(move.capturedPiece.getName());
                    } else {
                        player.addCapturedPiece(move.capturedPiece.getName());
                    }
                }
            }
        }
    }

    getLastMove(): Move|null
    {
        return this.savedMoves[this.savedMoves.length - 1] ?? null;
    }

    saveMove(move: Move): void
    {
        move.carryoutMove(this.controller.player);
        this.savedMoves.push(move);
        this.currentMoveIndex = this.savedMoves.length;
        this.updateCapturedPieces(move, false);
        this.updateCurrentPlayer();
        this.controller.calculateMoves(this);
    }

    deleteLastMove(): void
    {
        if (this.isCurrentMoveTheLast()) {
            if (this.savedMoves.length > 0)
            {
                let lastMove: Move = this.savedMoves.pop()!;
                lastMove.undoMove(this.controller.player);
                this.currentMoveIndex = this.savedMoves.length;
                this.updateCapturedPieces(lastMove, true);
                this.updateCurrentPlayer();
                this.controller.calculateMoves(this);
            }
        }
    }

    showFirstMove(): void
    {
        while (this.currentMoveIndex > 0) {
            this.currentMoveIndex--;
            this.savedMoves[this.currentMoveIndex].undoMove();
        }
    }

    showPreviousMove(): void
    {
        if (this.currentMoveIndex > 0) {
            this.currentMoveIndex--;
            this.savedMoves[this.currentMoveIndex].undoMove();
        }
    }

    showNextMove(): void
    {
        if (this.currentMoveIndex < this.savedMoves.length) {
            this.savedMoves[this.currentMoveIndex].carryoutMove();
            this.currentMoveIndex++;
        }
    }

    goToLastMove(): void
    {
        while (this.currentMoveIndex < this.savedMoves.length) {
            this.savedMoves[this.currentMoveIndex].carryoutMove();
            this.currentMoveIndex++;
        }
    }

    spinChessboard(): void
    {
        this.playerIndexInFront = (this.playerIndexInFront + 1) % this.players.length;
    }

    isFoggedSquare(squareName: string): boolean
    {
        return this.variant === ChessVariant.FogOfWar
            && this.chessboard.getSquareByName(squareName)?.getPiece()?.color !== this.controller.player.color
            && !this.controller.isLegalSquare(squareName);
    }

    static isDarkSquare(y: number, x: number): boolean
    {
        return (y % 2 === 0) ? (x % 2 === 0) : (x % 2 !== 0);
    }

    static areEqualCoordinates(corrdinates1: Coordinates, coordinates2: Coordinates): boolean
    {
        return corrdinates1.x === coordinates2.x && coordinates2.y === coordinates2.y;
    }
}
