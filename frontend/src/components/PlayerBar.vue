<script lang="ts">
    import { PlayerColor } from '../chess/enums/PlayerColor';
    import type { PieceName } from '../chess/enums/PieceName';
    import type { Player } from '../chess/players/Player';

    export default {
        props: {
            leftPlayer: {
                type: Object as () => Player|null,
                required: false
            },
            rightPlayer: {
                type: Object as () => Player|null,
                required: false
            },
            currentPlayer: {
                type: Object as () => Player|null,
                required: true
            }
        },
        computed: {
            allCapturedPieces(): string[][]|null {
                if (this.leftPlayer === null || this.rightPlayer === null) {
                    let allCapturedPieces: string[][] = [];

                    let capturedPieces: Map<PieceName, number> = this.leftPlayer ? this.leftPlayer.capturedPieces : this.rightPlayer ? this.rightPlayer.capturedPieces : new Map();

                    for (const [pieceName, count] of capturedPieces.entries()) {
                        if (count > 0) {
                            allCapturedPieces.push(Array<string>(count as number).fill(pieceName as string));
                        }
                    }

                    return allCapturedPieces;

                } else {
                    return null;
                }
            }
        },
        methods: {
            pieceImageSrc(pieceName: string, color: PlayerColor): string {
                return `/assets/piece/${color}/${pieceName}.svg`;
            },
            contrastColor(color: PlayerColor): PlayerColor {
                switch (color) {
                    case PlayerColor.White:
                    case PlayerColor.Silver:
                        return PlayerColor.Black;
                    default:
                        return PlayerColor.White;
                }
            },
            isBlinking(player: Player): boolean {
                return this.currentPlayer !== null && this.currentPlayer === player;
            }
        }
    }
</script>

<template>
	<div class="player-bar">
        <div v-if="leftPlayer" class="left">
            <div :class="['left', 'sphere-and-name', {'blink': isBlinking(leftPlayer)}]">
                <div :class="['sphere', 'player-color-' +  leftPlayer.color]"></div>
                <div v-if="leftPlayer.name || leftPlayer.color">
                    <span v-if="leftPlayer.name">{{ leftPlayer.name }}</span>
                    <span v-else>{{ leftPlayer.color }}</span>
                </div>
            </div>
            <div v-if="allCapturedPieces && allCapturedPieces.length > 0" :class="['captured-pieces', 'player-color-' + leftPlayer.color]">
                <div v-for="(capturedPiecesGroup, index) in allCapturedPieces" :key="index" class="captured-piece-group">
                    <img v-for="(pieceName, index2) in capturedPiecesGroup" :key="index2" class="piece-image" :src="pieceImageSrc(pieceName, contrastColor(leftPlayer.color))" alt="piece" />
                </div>
            </div>
        </div>
        <div v-if="rightPlayer" class="right">
            <div :class="['right', 'sphere-and-name', {'blink': isBlinking(rightPlayer)}]">
                <div :class="['sphere', 'player-color-' +  rightPlayer.color]"></div>
                <div v-if="rightPlayer.name || rightPlayer.color">
                    <span v-if="rightPlayer.name">{{ rightPlayer.name }}</span>
                    <span v-else>{{ rightPlayer.color }}</span>
                </div>
            </div>
            <div v-if="allCapturedPieces && allCapturedPieces.length > 0" :class="['captured-pieces', 'player-color-' + rightPlayer.color]">
                <div v-for="(capturedPiecesGroup, index) in allCapturedPieces" :key="index" class="captured-piece-group">
                    <img v-for="(pieceName, index2) in capturedPiecesGroup" :key="index2" class="piece-image" :src="pieceImageSrc(pieceName, contrastColor(rightPlayer.color))" alt="piece" />
                </div>
            </div>
        </div>
	</div>
</template>

<style scoped>
    .player-bar {
        color: var(--color-light);
        background-color: var(--color-dark-gray);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding-inline: 30px;
        font-size: 20px;
    }

    .left {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .right {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 10px;
    }

    .sphere-and-name {
        padding: 5px 10px;
        border-radius: 10px;
    }

    .sphere {
        width: 25px;
        aspect-ratio: 1/1;
        border-radius: 100%;
    }

    .captured-pieces {
        padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .captured-piece-group {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
    }

    .piece-image {
        width: 25px;
        height: 25px;
        margin-right: -12px;
    }
</style>
