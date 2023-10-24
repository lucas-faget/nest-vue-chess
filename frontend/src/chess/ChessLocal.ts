import type { ChessVariant } from "./types/ChessVariant";
import type { Move } from "./moves/Move";
import type { Player } from "./players/Player";
import { Chess } from "./Chess";

export class ChessLocal extends Chess
{
    constructor(variant: ChessVariant, customJson?: any, players?: Player[]) {
        super(variant, customJson, players);
        this.controller.calculateMoves(this);
    }

    canPlay(): boolean
    {
        return this.isCurrentMoveTheLast();
    }

    saveMove(move: Move): void
    {
        move.carryoutMove();
        this.savedMoves.push(move);
        this.currentMoveIndex = this.savedMoves.length;
        this.updateCapturedPieces(move, false);
        this.updateAdvantage(move);
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
                this.updateAdvantage(lastMove);
                this.updateCurrentPlayer();
                this.controller.calculateMoves(this);
            }
        }
    }

    resetChessboard(): void
    {
        while (this.savedMoves.length > 0) {
            this.deleteLastMove();
        }
    }
}
