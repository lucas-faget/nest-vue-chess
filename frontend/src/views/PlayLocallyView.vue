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
			topPlayer(): Player {
				return this.chess.players[(this.chess.playerIndexInFront + 1) % this.chess.players.length];
			},
			isBottomPlayerMoving(): boolean {
				return this.chess.isCurrentMoveTheLast() && this.chess.controller.player === this.bottomPlayer;
			},
			isTopPlayerMoving(): boolean {
				return this.chess.isCurrentMoveTheLast() && this.chess.controller.player === this.topPlayer;
			}
		},
		methods: {
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
			<div>
				<PlayerCard
					:player="topPlayer"
					:isPlayerMoving="isTopPlayerMoving"
					style="border-radius: 10px 10px 0 0;"
				/>
			</div>
			<div class="chessboard">
				<Chessboard
					:chess="chess"
					:lightSquareColor="lightSquareColor"
					:darkSquareColor="darkSquareColor"
				/>
			</div>
			<div>
				<PlayerCard
					:player="bottomPlayer"
					:isPlayerMoving="isBottomPlayerMoving"
				/>
			</div>
			<div>
				<Actions :chess="chess" />
			</div>
			<div>
				<Options
					:lightSquareColor="lightSquareColor"
					:darkSquareColor="darkSquareColor"
					@change-light-square-color="setLightSquareColor"
					@change-dark-square-color="setDarkSquareColor"
					style="border-radius: 0 0 10px 10px;"
				/>
			</div>
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
        aspect-ratio: 1 / 1;
	}
</style>
