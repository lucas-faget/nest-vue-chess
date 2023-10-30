<script lang="ts">
    import { PlayerColor } from '../chess/types/PlayerColor';
    import type { Player } from '../chess/players/Player';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            player: {
                type: Object as () => Player,
                required: true
            },
            isPlayerMoving: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            allCapturedPieces(): string[][]|null {
                let allCapturedPieces: string[][] = [];

                for (const [pieceName, count] of this.player.capturedPieces.entries()) {
                    if (count > 0) {
                        allCapturedPieces.push(Array<string>(count as number).fill(pieceName as string));
                    }
                }

                return allCapturedPieces;
            },
            ...mapGetters(['getPieceImageSrc', 'fullLetterColor'])
        },
        methods: {
            contrastColor(color: PlayerColor): PlayerColor {
                switch (color) {
                    case PlayerColor.White:
                    case PlayerColor.Silver:
                        return PlayerColor.Black;
                    default:
                        return PlayerColor.White;
                }
            }
        }
    }
</script>

<template>
	<div class="player-card">
        <div class="left">
            <div :class="['left', 'sphere-and-name', {'blink': isPlayerMoving}]">
                <div :class="['sphere', 'player-color-' + fullLetterColor(player.color)]"></div>
                <div>
                    <span v-if="player.name">{{ player.name }}</span>
                    <span v-else>{{ player.color }}</span>
                </div>
            </div>
            <div v-if="allCapturedPieces && allCapturedPieces.length > 0" :class="['captured-pieces', 'player-color-' + player.color]">
                <div v-for="(capturedPiecesGroup, index) in allCapturedPieces" :key="index" class="captured-piece-group">
                    <img v-for="(pieceName, index2) in capturedPiecesGroup" :key="index2" class="piece-image" :src="getPieceImageSrc(contrastColor(player.color), pieceName)" alt="piece" />
                </div>
            </div>
        </div>
	</div>
</template>

<style scoped>
    .player-card {
        color: var(--color-light);
        background-color: var(--color-dark-gray);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-block: 10px;
        padding-inline: 1vw;
        font-size: 20px;
    }

    .left {
        display: flex;
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
