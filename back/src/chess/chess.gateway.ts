import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChessGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    players: Socket[] = [];

    afterInit(server: Server) {
        console.log('Socket.IO is ready');
    }

    handleConnection(client: Socket) {
        console.log("Player connected: " + client.id);
        this.players.push(client);

        if (this.players.length === 2) {
            this.players[0].emit('assignPlayer', 0);
            this.players[1].emit('assignPlayer', 1);
            this.server.emit('startGame');
        }
    }

    handleDisconnect(client: Socket) {
        console.log("Player disconnected: " + client.id);
        this.players = this.players.filter((player) => player !== client);
    }

    @SubscribeMessage('move')
    handleMove(client: Socket, move: any) {
        console.log(`Move from client: ${move.fromSquareName} -> ${move.toSquareName}`);
        for (const socket of this.players) {
            if (socket !== client) {
                socket.emit('move', move);
            }
        }
    }
}
