import type { Coordinates } from "../coordinates/Position";
import { ChessVariant } from "../types/ChessVariant";
import { PieceName } from "../types/PieceName";
import type { Move } from "../moves/Move";
import type { Player } from "../players/Player";
import type { Chessboard } from "../chessboards/Chessboard";
import { PlayerController } from "../players/PlayerController";
import { King } from "../pieces/King";
import type { Square } from "../squares/Square";

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

    updateCapturedPieces(move: Move, isUndoing: boolean = false): void
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

    updateCastlingRights(move: Move, isUndoing: boolean = false): void
    {
        if (isUndoing) {
            if (move.isKingsideCastlingDisabled) this.controller.player.castlingRights.kingside = true;
            if (move.isQueensideCastlingDisabled) this.controller.player.castlingRights.queenside = true;
        } else {
            if (this.controller.player.castlingRights.kingside || this.controller.player.castlingRights.queenside) {
                if (this.controller.player.castlingRights.kingside) {
                    if (move.fromSquare.getPiece()?.getName() === PieceName.King) {
                        this.controller.player.castlingRights.kingside = false;
                        move.isKingsideCastlingDisabled = true;
                    } else {
                        if (move.fromSquare.getPiece()?.getName() === PieceName.Rook) {
                            if (this.controller.kingSquare) {
                                let kingsideRook: Square|null = this.chessboard.getSquareByDirection(this.controller.kingSquare, King.kingsideCastlingDirection(this.controller.player), King.KingsideCastlingStep);
                                if (move.fromSquare.name === kingsideRook?.name) {
                                    this.controller.player.castlingRights.kingside = false;
                                    move.isKingsideCastlingDisabled = true;
                                }
                            }
                        }
                    }
                }
                if (this.controller.player.castlingRights.queenside) {
                    if (move.fromSquare.getPiece()?.getName() === PieceName.King) {
                        this.controller.player.castlingRights.queenside = false;
                        move.isQueensideCastlingDisabled = true;
                    } else {
                        if (move.fromSquare.getPiece()?.getName() === PieceName.Rook) {
                            if (this.controller.kingSquare) {
                                let queensideRook: Square|null = this.chessboard.getSquareByDirection(this.controller.kingSquare, King.queensideCastlingDirection(this.controller.player), King.QueensideCastlingStep);
                                if (move.fromSquare.name === queensideRook?.name) {
                                    this.controller.player.castlingRights.queenside = false;
                                    move.isQueensideCastlingDisabled = true;
                                }
                            }
                        }
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
        this.updateCastlingRights(move);
        move.carryoutMove();
        this.savedMoves.push(move);
        this.currentMoveIndex = this.savedMoves.length;
        this.updateCapturedPieces(move);
        this.updateCurrentPlayer();
        this.controller.calculateMoves(this);
    }

    deleteLastMove(): void
    {
        if (this.isCurrentMoveTheLast()) {
            if (this.savedMoves.length > 0)
            {
                let lastMove: Move = this.savedMoves.pop()!;
                lastMove.undoMove();
                this.currentMoveIndex = this.savedMoves.length;
                this.updateCapturedPieces(lastMove, true);
                this.updateCurrentPlayer();
                this.updateCastlingRights(lastMove, true);
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
