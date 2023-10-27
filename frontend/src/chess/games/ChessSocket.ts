import { ChessVariant } from "../types/ChessVariant";
import type { Player } from "../players/Player";
import type { SerialisedMove } from "../moves/SerialisedMove";
import type { Move } from "../moves/Move";
import { TwoPlayerChess } from "./TwoPlayerChess";

import io from "socket.io-client";
import type { Socket } from "socket.io-client";

export class ChessSocket extends TwoPlayerChess
{
    roomId: string;
    socket: Socket;
    socketPlayer: Player|null;

    constructor(roomId: string)
    {
        super(ChessVariant.Standard, TwoPlayerChess.FenString);
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

        super.saveMove(move);
    }

    deleteLastMove(): void {}
}
