import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChessGateway {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket): void {
        // Handle connection event
    }

    handleDisconnect(client: Socket): void {
        // Handle disconnection event
    }

    @SubscribeMessage('move')
    handleMoveEvent(client: Socket, move: string): void {
        this.server.emit('move', move);
    }
}
