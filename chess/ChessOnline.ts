import type { ChessVariant } from "./enums/ChessVariant";
import type { Player } from "./players/Player";
import { MoveExport } from "./moves/MoveExport";
import type { Move } from "./moves/Move";
import type { JsonObject } from "./types/JsonObject";
import { Chess } from "./Chess";

import io from "socket.io-client";
import { Socket } from "socket.io-client";

export class ChessOnline extends Chess
{
    socket: Socket;
    socketPlayer: Player;

    constructor(variant: ChessVariant, customJson?: JsonObject, players?: Player[]) {
        super(variant, customJson, players);

        this.socket = io('http://localhost:8000');

        this.socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
        });

        this.socket.on('assignPlayer', (index: number) => {
            this.setSocketPlayer(this.players[index])
            console.log('I play ', this.socketPlayer.name);
        });

        this.socket.on('startGame', (color: string) => {
            console.log('Game started !');
            this.controller.calculateMoves(this);
        });

        this.socket.on('move', (moveExport: MoveExport) => {
            let move: Move|null = this.controller.getLegalMove(moveExport.fromSquareName, moveExport.toSquareName);
            if (move) {
                this.saveMove(move, false);
            }
        });
    }

    setSocketPlayer(socketPlayer: Player): void
    {
        this.socketPlayer = socketPlayer;
    }

    canPlay(): boolean
    {
        return this.isCurrentMoveTheLast() && this.controller.player === this.socketPlayer;
    }

    saveMove(move: Move, emitToServer: boolean = true): void
    {
        move.carryoutMove();
        this.savedMoves.push(move);
        this.currentMoveIndex = this.savedMoves.length;
        this.updateCapturedPieces(move, false);
        this.updateAdvantage(move);
        this.updateCurrentPlayer();
        this.controller.calculateMoves(this);

        if (emitToServer) {
            this.socket.emit('move', move.exportMove());
        }
    }

    deleteLastMove(): void {}
}
