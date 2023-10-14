import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from './types/Room';
import { MoveData } from './types/MoveData';

@WebSocketGateway({ cors: true })
export class ChessGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    rooms: Map<string, Room> = new Map();

    afterInit(server: Server) {
        console.log('Socket.IO is ready');
    }

    handleConnection(client: Socket) {
        console.log("Player connected: " + client.id);
    }

    handleDisconnect(client: Socket) {
        console.log("Player disconnected: " + client.id);
    }

    @SubscribeMessage('join')
    handleJoin(client: Socket, roomId: string) {
        let room: Room|null = this.rooms.has(roomId) ? this.rooms.get(roomId) : null;

        if (room) {
            if (!room.isFull()) {
                room.addPlayer(client);
                if (room.isFull()) {
                    room.startGame();
                }
            }
        } else {
            room = new Room(2);
            room.addPlayer(client);
            this.rooms.set(roomId, room);
        }
    }

    @SubscribeMessage('move')
    handleMove(client: Socket, data: MoveData) {
        const roomId = data.roomId;
        const serialisedMove = data.move;
        console.log(`Move from client: ${serialisedMove.fromSquareName} -> ${serialisedMove.toSquareName}`);

        let room: Room|null = this.rooms.has(roomId) ? this.rooms.get(roomId) : null;
        if (room) {
            room.sendMove(client, serialisedMove);
        }
    }
}
