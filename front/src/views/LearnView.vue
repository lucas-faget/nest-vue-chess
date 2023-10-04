<script lang="ts">
    import Chessboard from '@/components/Chessboard.vue'
    import CustomButton from '@/components/CustomButton.vue';
    import { SquareColor } from '@/enums/SquareColor';
    import { ChessLocal } from '@/chess/ChessLocal';
    import PawnJson from "@/json/pawn.json";
    import KnightJson from "@/json/knight.json";
    import BishopJson from "@/json/bishop.json";
    import RookJson from "@/json/rook.json";
    import QueenJson from "@/json/queen.json";
    import KingJson from "@/json/king.json";
    import { Whites } from '@/chess/players/Players';
    import { ChessVariant } from '@/enums/ChessVariant';

	export default {
        components: { Chessboard, CustomButton },
        data() {
            return {
                articles: [
                    {
                        title: "Pawn",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, PawnJson, [Whites]),
                        squareColor: SquareColor.Brown
                    },
                    {
                        title: "Knight",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, KnightJson, [Whites]),
                        squareColor: SquareColor.Gray
                    },
                    {
                        title: "Bishop",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, BishopJson, [Whites]),
                        squareColor: SquareColor.Blue
                    },
                    {
                        title: "Rook",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, RookJson, [Whites]),
                        squareColor: SquareColor.Green
                    },
                    {
                        title: "Queen",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, QueenJson, [Whites]),
                        squareColor: SquareColor.Red
                    },
                    {
                        title: "King",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
                        chess: new ChessLocal(ChessVariant.Custom, KingJson, [Whites]),
                        squareColor: SquareColor.Brown
                    }
                ]
            };
        },
        methods: {
            resetChessboard(index: number) {
                const article = this.articles[index];
                article.chess.resetChessboard();
            }
        }
}
</script>

<template>
	<div class="learn">
		<article v-for="(article, index) in articles" :key="index">
            <div class="section">
                <div class="text">
                    <div class="title">{{ article.title }}</div>
                    <div class="description">{{ article.text }}</div>
                    <div style="display: flex;">  
                        <CustomButton 
                            text="Reset chessboard" 
                            :leftIcon="index % 2 === 0 ? '' : 'chevron-left.svg'"
                            :rightIcon="index % 2 === 0 ? 'chevron-right.svg' : ''"
                            @click="resetChessboard(index)" />
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="chessboard">
                    <Chessboard :chess="article.chess" :squareColor="article.squareColor" />
                </div>
            </div>
        </article>
	</div>
</template>

<style scoped>
    .learn {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

	article {
        width: 85vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 60px;
    }

    @media screen and (min-width: 1000px) {
        article:nth-child(2n+1) {
			flex-direction: row;
		}

		article:nth-child(2n) {
			flex-direction: row-reverse;
		}
    }

    @media screen and (max-width: 999px) {
        .learn {
            margin-block: 60px;
            gap: 60px;
        }

        article {
            flex-direction: column;
        }
    }

    .flex-row {
        flex-direction: row;
    }

    .flex-row-reverse {
        flex-direction: row-reverse;
    }

    .section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .chessboard {
        width: min(100%, 520px);
        aspect-ratio: 1 / 1;
    }

    .title {
        font-size: 50px;
    }

    .description {
        color: var(--color-gray);
        font-size: 18px;
    }
</style>
