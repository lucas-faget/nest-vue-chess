import { Socket } from 'socket.io';
//import type { SerialisedMove } from '../../../../chess/moves/SerialisedMove';

export class Room
{
    maxPlayers: number;
    players: Socket[] = [];

    constructor(maxPlayers: number = 2)
    {
        this.maxPlayers = maxPlayers;
    }

    isFull(): boolean
    {
        return this.players.length === this.maxPlayers
    }

    addPlayer(player: Socket): void
    {
        this.players.push(player);
    }

    startGame(): void
    {
        console.log("Game started");
        const playerIndexes = Array.from({ length: this.players.length }, (_, index) => index);

        for (let i = playerIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playerIndexes[i], playerIndexes[j]] = [playerIndexes[j], playerIndexes[i]];
        }

        this.players.forEach((player, index) => {
            player.emit('assignPlayer', playerIndexes[index]);
        });
    }

    sendMove(client: Socket, move: any): void
    {
        for (const player of this.players) {
            if (player !== client) {
                player.emit('move', move);
            }
        }
    }
}
