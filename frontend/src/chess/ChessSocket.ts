import type { ChessVariant } from "./types/ChessVariant";
import type { Player } from "./players/Player";
import type { SerialisedMove } from "./moves/SerialisedMove";
import type { Move } from "./moves/Move";
import { Chess } from "./Chess";

import io from "socket.io-client";
import type { Socket } from "socket.io-client";

export class ChessSocket extends Chess
{
    roomId: string;
    socket: Socket;
    socketPlayer: Player|null;

    constructor(variant: ChessVariant, roomId: string, customJson?: any, players?: Player[]) {
        super(variant, customJson, players);
        this.controller.calculateMoves(this);

        this.roomId = roomId;
        this.socket = io('http://localhost:8000');
        this.socketPlayer = null;
    }

    connectSocketListeners(): void
    {
        this.socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
        });

        this.socket.on('startGame', () => {
            console.log('Game started !');
        });

        this.socket.on('assignPlayer', (index: number) => {
            this.setSocketPlayer(this.players[index]);
            this.playerIndexInFront = index;
        });

        this.socket.on('move', (serialisedMove: SerialisedMove) => {
            console.log(`Move from server: ${serialisedMove.fromSquareName} -> ${serialisedMove.toSquareName}`);
            let move: Move|null = this.controller.getLegalMove(serialisedMove.fromSquareName, serialisedMove.toSquareName);
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
        return this.controller.player === this.socketPlayer && this.isCurrentMoveTheLast();
    }

    saveMove(move: Move, emitToServer: boolean = true): void
    {
        if (emitToServer) {
            this.socket.emit('move', {
                roomId: this.roomId,
                move: move.serialiseMove()
            });
        }

        move.carryoutMove();
        this.savedMoves.push(move);
        this.currentMoveIndex = this.savedMoves.length;
        this.updateCapturedPieces(move, false);
        this.updateAdvantage(move);
        this.updateCurrentPlayer();
        this.controller.calculateMoves(this);
    }

    deleteLastMove(): void {}
}
