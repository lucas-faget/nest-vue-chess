import type { Move } from "./moves/Move";
import { Chessboard } from "./Chessboard";
import { PlayerController } from "./players/PlayerController";
import type { Player } from "./players/Player";
import { ChessVariant } from "@/enums/ChessVariant";
import { Blacks, Golds, Silvers, Whites } from "./players/Players";
import standardJson from "@/json/standard.json";
import fourPlayerJson from "@/json/four-player.json";
import { PieceName } from "./enums/PieceName";
import type { JsonObject } from "./types/JsonObject";
import type { Position } from "./coordinates/Position";

export abstract class Chess
{
    variant: ChessVariant;
    players: Player[];
    controller: PlayerController;
    chessboard: Chessboard;
    savedMoves: Move[] = [];
    currentMoveIndex: number = 0;
    playerIndexInFront: number = 0;

    constructor(variant: ChessVariant, customJson?: JsonObject, players?: Player[])
    {
        this.variant = variant;
        switch (variant) {
            case ChessVariant.FischerRandom:
                this.players = [Whites, Blacks];
                const fischerRandomJsonObject: JsonObject = JSON.parse(JSON.stringify(standardJson));
                Chess.shufflePieceRow(fischerRandomJsonObject, 0);
                this.chessboard = new Chessboard(fischerRandomJsonObject);
                break;
            case ChessVariant.FourPlayer:
                this.players = [Whites, Silvers, Blacks, Golds];
                const fourPlayerJsonObject: JsonObject = JSON.parse(JSON.stringify(fourPlayerJson));
                this.chessboard = new Chessboard(fourPlayerJsonObject);
                break;
            case ChessVariant.Custom:
                this.players = players ?? [Whites, Blacks];
                const customJsonObject: JsonObject = JSON.parse(JSON.stringify(customJson ?? standardJson));
                this.chessboard = new Chessboard(customJsonObject);
                break;
            default:
                this.players = [Whites, Blacks];
                const standardJsonObject: JsonObject = JSON.parse(JSON.stringify(standardJson));
                this.chessboard = new Chessboard(standardJsonObject);
                break;
        }

        this.controller = new PlayerController(this.players[0]);
    }

    abstract canPlay(): boolean;

    isCurrentMoveTheLast(): boolean
    {
        return this.currentMoveIndex === this.savedMoves.length;
    }

    updateCurrentPlayer(): void
    {
        this.controller.setPlayer(this.players[this.savedMoves.length % this.players.length]);
    }

    updateCapturedPieces(move: Move, isUndoing: boolean): void
    {
        if (move.capturedPiece) {
            for (const player of this.players) {
                if (player.color === move.capturedPiece.color) {
                    if (isUndoing) {
                        player.removeCapturedPiece(move.capturedPiece.getName());
                    } else {
                        player.addCapturedPiece(move.capturedPiece.getName());
                    }
                }
            }
        }
    }

    updateAdvantage(move: Move): void
    {
        
    }

    getLastMove(): Move|null
    {
        return this.savedMoves[this.savedMoves.length - 1] ?? null;
    }

    abstract saveMove(move: Move): void;

    abstract deleteLastMove(): void

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

    static getRandomElement<T>(array: T[]): T|undefined
    {
        if (array.length === 0) {
            return undefined;
        }
      
        return array.splice(Math.floor(
            Math.random() * array.length), 1
        )[0];
    }

    static isDarkSquare(y: number, x: number): boolean
    {
        return (y % 2 === 0) ? (x % 2 === 0) : (x % 2 !== 0);
    }

    static getPieceRow(json: JsonObject, rank: string): Record<string, PieceName>
    {
        const pieceRow: Record<string, PieceName> = {};
    
        for (const file of json.files) {
            if (json.pieces[file + rank].name) {
                pieceRow[file] = json.pieces[file + rank].name;
            }
        }
    
        return pieceRow;
    }
    
    static shufflePieceRow(jsonObject: JsonObject, rankIndex: number)
    {
        const rank = jsonObject.ranks[rankIndex];
        const reversedRank = [...jsonObject.ranks].reverse()[rankIndex];

        let pieceRow: Record<string, PieceName> = Chess.getPieceRow(jsonObject, rank);
        let shuffledPieceRow: Record<string, PieceName> = {};

        let files = jsonObject.files;

        const darkFiles = jsonObject.files.filter((_, fileIndex) => Chess.isDarkSquare(fileIndex, rankIndex));
        const lightFiles = jsonObject.files.filter((_, fileIndex) => !Chess.isDarkSquare(fileIndex, rankIndex));

        for (const [file, pieceName] of Object.entries(pieceRow)) {
            const isDark: boolean = Chess.isDarkSquare(jsonObject.files.indexOf(file), rankIndex);
            if (pieceName === PieceName.Bishop) {
                let shuffledFile: string|undefined = Chess.getRandomElement(isDark ? darkFiles : lightFiles);
                if (shuffledFile) {
                    files = files.filter((file) => file !== shuffledFile);
                    shuffledPieceRow[shuffledFile] = pieceName;
                }
            }
        }

        for (const [file, pieceName] of Object.entries(pieceRow)) {
            if (pieceName === PieceName.Knight || pieceName === PieceName.Queen) {
                let shuffledFile: string|undefined = Chess.getRandomElement(files);
                if (shuffledFile) {
                    shuffledPieceRow[shuffledFile] = pieceName;
                }
            }
        }

        for (const [file, pieceName] of Object.entries(pieceRow)) {
            if (pieceName === PieceName.Rook || pieceName === PieceName.King) {
                const firstFile = files.shift();
                if (firstFile) {
                    shuffledPieceRow[firstFile] = pieceName;
                }
            }
        }

        for (const [file, pieceName] of Object.entries(shuffledPieceRow)) {
            jsonObject.pieces[file + rank].name = pieceName;
            jsonObject.pieces[file + reversedRank].name = pieceName;
        }
    }

    static areEqualCoordinates(corrdinates1: Position, coordinates2: Position): boolean
    {
        return corrdinates1.x === coordinates2.x && coordinates2.y === coordinates2.y;
    }
}
