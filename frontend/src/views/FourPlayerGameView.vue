<script lang="ts">
	import { ChessVariant } from '../chess/enums/ChessVariant'
	import type { Player } from '../chess/players/Player'
	import { ChessLocal } from '../chess/ChessLocal'
	import { SquareColor } from '../enums/SquareColor';

	import Background from '../components/Background.vue'
	import Chessboard from '../components/Chessboard.vue'
	import PlayerCard from '../components/PlayerCard.vue'
	import Actions from '../components/Actions.vue'
	import Options from '../components/Options.vue'

	export default {
		components: { Chessboard, Actions, PlayerCard, Options, Background },
		props: {
			variant: {
				type: String as () => ChessVariant,
				default: ChessVariant.Standard
			}
		},
		data() {
			return {
				chess: new ChessLocal(this.variant),
				lightSquareColor: SquareColor.Brown,
				darkSquareColor: SquareColor.Brown,
			}
		},
		computed: {
			bottomPlayer(): Player {
				return this.chess.players[this.chess.playerIndexInFront];
			},
			leftPlayer(): Player {
				return this.chess.players[(this.chess.playerIndexInFront + 1) % this.chess.players.length];
			},
            topPlayer(): Player {
				return this.chess.players[(this.chess.playerIndexInFront + 2) % this.chess.players.length];
			},
			rightPlayer(): Player {
				return this.chess.players[(this.chess.playerIndexInFront + 3) % this.chess.players.length];
			}
		},
		methods: {
            isPlayerMoving(player: Player): boolean {
                return this.chess.isCurrentMoveTheLast() && this.chess.controller.player === player;
            },
			setLightSquareColor(squareColor: SquareColor) {
				this.lightSquareColor = squareColor;
			},
			setDarkSquareColor(squareColor: SquareColor) {
				this.darkSquareColor = squareColor;
			}
		},
		watch: {
			variant(newVariant: ChessVariant, oldVariant: ChessVariant) {
				this.chess = new ChessLocal(newVariant);
			}
		}
	}
</script>

<template>
	<div class="chess">
		<div>
			<div class="chessboard">
				<Chessboard
					:chess="chess"
					:lightSquareColor="lightSquareColor"
					:darkSquareColor="darkSquareColor"
				/>
				<!-- <div class="chessboard-corner bottom-right">
					<PlayerCard
						:player="bottomPlayer"
						:isPlayerMoving="isPlayerMoving(bottomPlayer)"
					/>
				</div>
				<div class="chessboard-corner bottom-left">
					<PlayerCard
						:player="leftPlayer"
						:isPlayerMoving="isPlayerMoving(leftPlayer)"
					/>
				</div>
				<div class="chessboard-corner top-left">
					<PlayerCard
						:player="topPlayer"
						:isPlayerMoving="isPlayerMoving(topPlayer)"
					/>
				</div>
				<div class="chessboard-corner top-right">
					<PlayerCard
						:player="rightPlayer"
						:isPlayerMoving="isPlayerMoving(rightPlayer)"
					/>
				</div> -->
			</div>
			<Actions :chess="chess" />
			<Options
				:lightSquareColor="lightSquareColor"
				:darkSquareColor="darkSquareColor"
				@change-light-square-color="setLightSquareColor"
				@change-dark-square-color="setDarkSquareColor"
				style="border-radius: 0 0 10px 10px;"
			/>
		</div>
	</div>
</template>

<style scoped>
	.chess {
		padding-block: 30px;
		display: flex;
		justify-content: center;
	}

	.chess > div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.chess > div > div {
		width: min(95vw, 520px);
	}

	.chessboard {
		position: relative;
        aspect-ratio: 1/1;
	}

	.chessboard-corner {
		position: absolute;
		aspect-ratio: 1/1;
	}

	.bottom-right {
		bottom: 0;
		right: 0;
	}

	.bottom-left {
		bottom: 0;
		left: 0;
	}

	.top-left {
		top: 0;
		left: 0;
	}

	.top-right {
		top: 0;
		right: 0;
	}
</style>
