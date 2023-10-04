<script lang="ts">
    import Square from '@/components/Square.vue'
    import type { Chess } from '@/chess/Chess';
    import { SquareColor } from '@/enums/SquareColor';
    import { ChessVariant } from '@/enums/ChessVariant';

    export default {
        components: { Square },
        props: {
			chess: {
                type: Object as () => Chess,
                required: true,
            },
            lightSquareColor: {
                type: String as () => SquareColor,
                default: SquareColor.Gray
            },
            darkSquareColor: {
                type: String as () => SquareColor,
                default: SquareColor.Gray
            }
		},
        data() {
            return {
                fromSquareName: ""
            }
        },
        computed: {
            rows(): string[] {
                switch (this.chess.playerIndexInFront) {
                    case 1:
                        return this.chess.variant === ChessVariant.FourPlayer ? this.chess.chessboard.reversedFiles : this.chess.chessboard.ranks;
                    case 2:
                        return this.chess.chessboard.ranks;
                    case 3:
                        return this.chess.chessboard.files;
                    case 0:
                    default:
                        return this.chess.chessboard.reversedRanks;
                }
            },
            columns(): string[] {
                switch (this.chess.playerIndexInFront) {
                    case 1:
                        return this.chess.variant === ChessVariant.FourPlayer ? this.chess.chessboard.reversedRanks : this.chess.chessboard.reversedFiles;
                    case 2:
                        return this.chess.chessboard.reversedFiles;
                    case 3:
                        return this.chess.chessboard.ranks;
                    case 0:
                    default:
                        return this.chess.chessboard.files;
                }
            },
            isPerpendicular(): boolean {
                return this.chess.variant === ChessVariant.FourPlayer && this.chess.playerIndexInFront === 1 || this.chess.playerIndexInFront === 3;
            },
            gridStyle() {
                return {
                    'gridTemplateColumns': `repeat(${this.chess.chessboard.files.length}, ${100 / this.chess.chessboard.files.length}%)`,
                    'gridTemplateRows': `repeat(${this.chess.chessboard.files.length}, ${100 / this.chess.chessboard.files.length}%)`
                }
            }
        },
        methods: {
            getSquareName(column: string, row: string): string {
                return this.isPerpendicular ? row + column : column + row;
            },
            clickSquare(squareName: string): void
            {
                if (this.chess.canPlay()) {
                    if (this.chess.controller.isLegalMove(this.fromSquareName, squareName)) {
                        let move = this.chess.controller.getLegalMove(this.fromSquareName, squareName);
                        if (move) {
                            this.chess.saveMove(move);
                        }
                        this.fromSquareName = "";
                    } else {
                        this.fromSquareName = this.fromSquareName !== squareName ? squareName : "";
                    }
                }
            },
            isLegal(squareName: string): boolean
            {
                return this.chess.canPlay() && this.chess.controller.isLegalMove(this.fromSquareName, squareName);
            },
            isFogged(squareName: string): boolean
            {
                return this.chess.isFoggedSquare(squareName);
            }
        }
    }
</script>

<template>
	<div class="chessboard" :style="gridStyle">
		<template v-for="row in rows" :key="row">
            <template v-for="column in columns" :key="column">
                <Square :square="chess.chessboard.getSquareByName(getSquareName(column, row))"
                        :lightSquareColor="lightSquareColor"
                        :darkSquareColor="darkSquareColor"
                        :isLegal="isLegal(getSquareName(column, row))"
                        :isFogged="isFogged(getSquareName(column, row))"
                        @click="clickSquare(getSquareName(column, row))"
                />
            </template>
        </template>
	</div>
</template>

<style scoped>
    .chessboard {
        background: #000;
        display: grid;
    }
</style>
