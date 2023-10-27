import type { Coordinates } from "../coordinates/Position";
import type { PlayerColor } from "../types/PlayerColor";
import { PieceName } from "../types/PieceName";
import type { Square } from "../squares/Square";

export abstract class Chessboard
{
    ranks: string[];
    files: string[];
    reversedRanks: string[];
    reversedFiles: string[];
    squares: Map<string, Square> = new Map();

    abstract kingSquareNameByPlayer: Object;

    constructor(ranks: string[], files: string[])
    {
        this.ranks = ranks;
        this.files = files;
        this.reversedRanks = [...this.ranks].reverse();
        this.reversedFiles = [...this.files].reverse();
    }

    getSquareByName(squareName: string): Square|null
    {
        return this.squares.get(squareName) ?? null;
    }

    getSquareByPosition(position: Coordinates): Square|null
    {
        if (position.x < 0 || position.y < 0 || position.x >= this.ranks.length || position.y >= this.files.length) {
            return null;
        }

        return this.squares.get(this.files[position.y] + this.ranks[position.x])!;
    }

    getSquareByDirection(square: Square, direction: Coordinates, step: number = 1): Square|null
    {
        return this.getSquareByPosition({
            x: square.position.x + step * direction.x,
            y: square.position.y + step * direction.y,
        });
    }

    searchKingSquare(color: PlayerColor): Square|null
    {
        for (const square of this.squares.values()) {
            if (square.isOccupiedByPieceName(PieceName.King) && square.isOccupiedByAlly(color)) {
                return square;
            }
        }

        return null;
    }

    getPositionString(): string
    {
        let position: string = '';
        for (const [row, rank] of this.ranks.entries()) {
            let emptySquareCount: number = 0;
            for (const [col, file] of this.files.entries()) {
                let square: Square|null = this.getSquareByName(file + rank);
                if (square?.isEmpty()) {
                    emptySquareCount++;
                } else {
                    position += emptySquareCount > 0 ? emptySquareCount.toString() : '';
                    emptySquareCount = 0;
                    position += square?.getPiece() ?? '';
                }
            }
            position += emptySquareCount > 0 ? emptySquareCount.toString() : '';
            position += row !== this.ranks.length - 1 ? '/' : '';
        }

        return position;
    }
}
