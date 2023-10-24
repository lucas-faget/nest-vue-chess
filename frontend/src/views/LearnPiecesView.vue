<script lang="ts">
    import { PieceName } from '../chess/types/PieceName';
    import { mapGetters } from 'vuex';

	export default {
        data() {
            return {
                articles: [
                    {
                        title: "Pawn",
                        text: "The pawn is the most numerous and weakest piece in the game of chess. Unlike other pieces, the pawn can only move forwards. A pawn may move by vertically advancing to a vacant square ahead. The first time a pawn moves, it has the additional option of vertically advancing two squares, provided that both squares are vacant. A pawn captures by moving diagonally forward one square to the left or right.",
                        piece: PieceName.Pawn
                    },
                    {
                        title: "Knight",
                        text: "The knight moves two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of a L), jumping over other pieces. Knights capture in the same way, replacing the enemy piece on the square and removing it from the board.",
                        piece: PieceName.Knight
                    },
                    {
                        title: "Bishop",
                        text: "The bishop moves and captures along diagonals. It cannot jump over other pieces. A bishop captures by occupying the square on which an enemy piece stands. As a consequence of its diagonal movement, each bishop always remains on one square color. Due to this, it is common to refer to a bishop as a light-squared or dark-squared bishop.",
                        piece: PieceName.Bishop
                    },
                    {
                        title: "Rook",
                        text: "The rook moves horizontally or vertically, through any number of unoccupied squares. The rook cannot jump over pieces. The rook may capture an enemy piece by moving to the square on which the enemy piece stands, removing it from play.",
                        piece: PieceName.Rook
                    },
                    {
                        title: "Queen",
                        text: "The queen is the most powerful piece in the game of chess. The queen can be moved any number of unoccupied squares in a straight line vertically, horizontally, or diagonally, thus combining the moves of the rook and bishop.",
                        piece: PieceName.Queen
                    },
                    {
                        title: "King",
                        text: "The king is the most important piece in the game of chess. A king can move one square horizontally, vertically, and diagonally. If a player's king is threatened with capture, it is said to be in check, and the player must remove the threat of capture on their next move. If this cannot be done, the king is said to be in checkmate, resulting in a loss for that player. A player cannot make any move that places their own king in check.",
                        piece: PieceName.King
                    }
                ]
            };
        },
        computed: {
            ...mapGetters(['getPieceImageSrc']),
        },
    }
</script>

<template>
	<div class="learn">
		<article v-for="(article, index) in articles" :key="index">
            <div class="section">
                <div class="text">
                    <div class="title">{{ article.title }}</div>
                    <div class="description">{{ article.text }}</div>
                    <!-- <div style="display: flex;">  
                        <CustomButton 
                            text="Button" 
                            :leftIcon="index % 2 === 0 ? '' : 'chevron-left.svg'"
                            :rightIcon="index % 2 === 0 ? 'chevron-right.svg' : ''"
                    </div> -->
                </div>
            </div>
            <div class="section">
                <img class="piece" :src="getPieceImageSrc('white', article.piece)" alt="Piece" />
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

    .piece {
        width: max(20vw, 150px);
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
