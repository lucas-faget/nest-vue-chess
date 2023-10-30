import type { Coordinates } from "../coordinates/Position";
import { ChessVariant } from "../types/ChessVariant";
import { PieceName } from "../types/PieceName";
import { King } from "../pieces/King";
import type { Square } from "../squares/Square";
import { MoveType } from "../types/MoveType";
import type { Move } from "../moves/Move";
import type { CastlingRights } from "../types/CastlingRights";
import type { GameState } from "../types/GameState";
import type { Player } from "../players/Player";
import type { Chessboard } from "../chessboards/Chessboard";
import type { PlayerController } from "../players/PlayerController";

export abstract class Chess
{
    variant: ChessVariant;
    players: Player[];
    controller: PlayerController;
    chessboard: Chessboard;
    gameStateByTurn: GameState[];
    activeTurnNumber: number;
    fullmoveNumber: number = 1;
    playerIndexInFront: number = 0;

    static NoneEnPassantTargetSquare = '-';

    constructor(variant: ChessVariant, players: Player[], controller: PlayerController, chessboard: Chessboard, gameState: GameState)
    {
        this.variant = variant;
        this.players = players;
        this.controller = controller;
        this.chessboard = chessboard;
        this.gameStateByTurn = [gameState];
        this.activeTurnNumber = this.gameStateByTurn.length;
        this.updateController();
    }

    isActiveTurnTheLast(): boolean
    {
        return this.activeTurnNumber === this.gameStateByTurn.length;
    }

    canPlay(): boolean
    {
        return this.isActiveTurnTheLast();
    }

    setPreviousPlayer(): void
    {
        this.controller.setPlayer(this.players[(this.players.indexOf(this.controller.player) - 1 + this.players.length) % this.players.length]);
    }

    setNextPlayer(): void
    {
        this.controller.setPlayer(this.players[(this.players.indexOf(this.controller.player) + 1) % this.players.length]);
    }

    incrementFullmoveNumber(): void
    {
        if (this.players.indexOf(this.controller.player) === this.players.length - 1) {
            this.fullmoveNumber++;
        }
    }

    decrementFullmoveNumber(): void
    {
        if (this.players.indexOf(this.controller.player) === 0) {
            this.fullmoveNumber--;
        }
    }

    addPlayerCapturedPiece(move: Move): void
    {
        if (move.capturedPiece) {
            this.controller.player.addCapturedPiece(move.capturedPiece.getName());
        }
    }

    removePlayerCapturedPiece(move: Move): void
    {
        if (move.capturedPiece) {
            this.controller.player.removeCapturedPiece(move.capturedPiece.getName());
        }
    }

    getEnPassantTargetSquare(move: Move): string
    {
        if (move.isDoubleStepPawnAdvance(this.chessboard, this.controller.player.direction)) {
            return move.toSquare.name;
        } else {
            return Chess.NoneEnPassantTargetSquare;
        }
    }

    getHalfmoveNumber(move: Move): number
    {
        if (move.getMoveType() === MoveType.Capture || move.fromSquare.getPiece()?.getName() === PieceName.Pawn) {
            return 0
        } else {
            return this.gameStateByTurn[this.gameStateByTurn.length - 1]?.halfmoveNumber + 1 ?? 0;
        }
    }

    setCastlingRights(move: Move): void
    {
        const castlingRights: CastlingRights = this.controller.player.castlingRights;

        if (castlingRights.kingside || castlingRights.queenside) {
            if (this.controller.player.castlingRights.kingside) {
                if (move.fromSquare.getPiece()?.getName() === PieceName.King) {
                    castlingRights.kingside = false;
                } else {
                    if (move.fromSquare.getPiece()?.getName() === PieceName.Rook) {
                        if (this.controller.kingSquare) {
                            let kingsideRook: Square|null = this.chessboard.getSquareByDirection(this.controller.kingSquare, this.controller.player.queensideCastlingDirection(), King.KingsideCastlingStep);
                            if (move.fromSquare.name === kingsideRook?.name) {
                                castlingRights.kingside = false;
                            }
                        }
                    }
                }
            }
            if (castlingRights.queenside) {
                if (move.fromSquare.getPiece()?.getName() === PieceName.King) {
                    castlingRights.queenside = false;
                } else {
                    if (move.fromSquare.getPiece()?.getName() === PieceName.Rook) {
                        if (this.controller.kingSquare) {
                            let queensideRook: Square|null = this.chessboard.getSquareByDirection(this.controller.kingSquare, this.controller.player.kingsideCastlingDirection(), King.QueensideCastlingStep);
                            if (move.fromSquare.name === queensideRook?.name) {
                                castlingRights.queenside = false;
                            }
                        }
                    }
                }
            }
        }
    }

    addGameState(move: Move): void
    {
        this.gameStateByTurn.push({
            move: move,
            castlingRights: {
                kingside: this.controller.player.castlingRights.kingside,
                queenside: this.controller.player.castlingRights.queenside,
            },
            enPassantTargetSquare: this.getEnPassantTargetSquare(move),
            halfmoveNumber: this.getHalfmoveNumber(move)
        });

        this.activeTurnNumber = this.gameStateByTurn.length;
    }

    removeGameState(): GameState
    {
        const gameState: GameState = this.gameStateByTurn.pop()!;
        this.activeTurnNumber = this.gameStateByTurn.length;
        return gameState;
    }

    updateController(): void
    {
        this.controller.enPassantTargetSquare = this.gameStateByTurn[this.activeTurnNumber - 1].enPassantTargetSquare;
        this.controller.calculateMoves(this);
    }

    saveMove(move: Move): void
    {
        this.addGameState(move);
        this.setCastlingRights(move);
        this.addPlayerCapturedPiece(move);
        move.carryoutMove();
        this.incrementFullmoveNumber();
        this.setNextPlayer();
        this.updateController();
    }

    deleteLastMove(): void
    {
        if (this.isActiveTurnTheLast()) {
            if (this.gameStateByTurn.length > 1)
            {
                let lastGameState: GameState = this.removeGameState();
                if (lastGameState.move) lastGameState.move.undoMove();
                this.decrementFullmoveNumber();
                this.setPreviousPlayer();
                this.controller.player.castlingRights = lastGameState.castlingRights;
                if (lastGameState.move) this.removePlayerCapturedPiece(lastGameState.move);
                this.updateController();
            }
        }
    }

    showFirstMove(): void
    {
        while (this.activeTurnNumber > 1) {
            this.activeTurnNumber--;
            this.gameStateByTurn[this.activeTurnNumber].move!.undoMove();
        }
    }

    showPreviousMove(): void
    {
        if (this.activeTurnNumber > 1) {
            this.activeTurnNumber--;
            this.gameStateByTurn[this.activeTurnNumber].move!.undoMove();
        }
    }

    showNextMove(): void
    {
        if (this.activeTurnNumber < this.gameStateByTurn.length) {
            this.gameStateByTurn[this.activeTurnNumber].move!.carryoutMove();
            this.activeTurnNumber++;
        }
    }

    showLastMove(): void
    {
        while (this.activeTurnNumber < this.gameStateByTurn.length) {
            this.gameStateByTurn[this.activeTurnNumber].move!.carryoutMove();
            this.activeTurnNumber++;
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
