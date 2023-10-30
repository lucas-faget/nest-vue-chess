import { PieceName } from "../types/PieceName";
import type { Player } from "./Player";
import { Knight } from "../pieces/Knight";
import { Bishop } from "../pieces/Bishop";
import { Rook } from "../pieces/Rook";
import { Queen } from "../pieces/Queen";
import type { Square } from "../squares/Square";
import type { LegalMoves } from "../types/LegalMoves";
import type { Move } from "../moves/Move";
import type { Chessboard } from "../chessboards/Chessboard";
import { Chess } from "../games/Chess";

export class PlayerController
{
    player: Player;
    kingSquare: Square|null = null;
    legalMoves: LegalMoves = {};
    enPassantTargetSquare: string = Chess.NoneEnPassantTargetSquare;

    constructor(player: Player) {
        this.player = player;
    }

    setPlayer(player: Player)
    {
        this.player = player;
    }

    getKingSquare(): Square|null
    {
        return this.kingSquare;
    }

    setKingSquare(kingSquare: Square|null): void
    {
        this.kingSquare = kingSquare;
    }

    isLegalSquare(squareName: string): boolean
    {
        for (const fromSquareName in this.legalMoves) {
            if (squareName in this.legalMoves[fromSquareName]) {
                return true;
            }
        }

        return false;
    }

    isLegalMove(fromSquareName: string, toSquareName: string): boolean
    {
        return fromSquareName in this.legalMoves && toSquareName in this.legalMoves[fromSquareName];
    }

    getLegalMove(fromSquareName: string, toSquareName: string): Move|null
    {
        return this.legalMoves[fromSquareName][toSquareName] ?? null;
    }

    calculateMoves(chess: Chess)
    {
        if (this.player) {
            this.setLegalMoves(chess);
        }
    }

    setLegalMoves(chess: Chess): void
    {
        this.setKingSquare(chess.chessboard.searchKingSquare(this.player.color));
        this.resetLegalMoves();
        for (const square of chess.chessboard.squares.values()) {
            if (square.isOccupiedByAlly(this.player.color)) {
                let moves: Move[] = square.getPiece()!.getMoves(square, chess.chessboard, this);
                if (moves) {
                    for (const move of moves) {
                        if (!this.legalMoves[move.fromSquare.name]) {
                            this.legalMoves[move.fromSquare.name] = {};
                        }
                        this.legalMoves[move.fromSquare.name][move.toSquare.name] = move;
                    }
                }
            }
        }
    }

    resetLegalMoves(): void
    {
        this.legalMoves = {};
    }

    isCheckedIfMoving(move: Move, chessboard: Chessboard): boolean
    {
        let isChecked: boolean = false;

        move.carryoutMove();
        if (this.kingSquare === move.fromSquare) {
            this.kingSquare = move.toSquare;
        }
        isChecked = this.isChecked(chessboard);
        move.undoMove();
        if (this.kingSquare === move.toSquare) {
            this.kingSquare = move.fromSquare;
        }

        return isChecked;
    }

    isChecked(chessboard: Chessboard): boolean
    {
        if (this.kingSquare) {
            return this.isCheckedByMobilePiece(chessboard)
                || this.isCheckedByKnight(chessboard)
                || this.isCheckedByPawn(chessboard)
        }

        return false;
    }

    isCheckedByMobilePiece(chessboard: Chessboard): boolean
    {
        let square: Square|null = null;

        // test if checked by queen, rook or bishop
        for (const direction of Queen.Directions) {
            square = chessboard.getSquareByDirection(this.kingSquare!, direction);
            while (square) {
                if (!square.isEmpty()) {
                    if (square.isOccupiedByOpponent(this.player.color)) {
                        if (Rook.Directions.includes(direction)) {
                            if (square.isOccupiedByPieceName(PieceName.Queen) || square.isOccupiedByPieceName(PieceName.Rook)) {
                                return true;
                            }
                        } else {
                            if (square.isOccupiedByPieceName(PieceName.Queen) || square.isOccupiedByPieceName(PieceName.Bishop)) {
                                return true;
                            }
                        }
                    }
                    break;
                }
                square = chessboard.getSquareByDirection(square, direction);
            }
        }

        return false;
    }

    isCheckedByKnight(chessboard: Chessboard): boolean
    {
        let square: Square|null = null;

        for (const direction of Knight.Directions) {
            square = chessboard.getSquareByDirection(this.kingSquare!, direction);
            if (square && square.isOccupiedByPieceName(PieceName.Knight) && square.isOccupiedByOpponent(this.player.color)) {
                return true;
            }
        }

        return false;
    }

    isCheckedByPawn(chessboard: Chessboard): boolean
    {
        let square: Square|null = null;

        for (const direction of Bishop.Directions) {
            if (direction.x === this.player.direction.x || direction.y === this.player.direction.y) {
                square = chessboard.getSquareByDirection(this.kingSquare!, direction);
                if (square && square.isOccupiedByPieceName(PieceName.Pawn) && square.isOccupiedByOpponent(this.player.color)) {
                    return true;
                }
            }
        }

        return false;
    }
}
