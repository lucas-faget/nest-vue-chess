<script lang="ts">
	import { ChessVariant } from '../../../chess/enums/ChessVariant'
	import type { Move } from '../../../chess/moves/Move';
	import type { Player } from '../../../chess/players/Player'
	import { ChessOnline } from '../../../chess/ChessOnline'
	import { SquareColor } from '../enums/SquareColor';

	import Background from '../components/Background.vue'
	import Chessboard from '../components/Chessboard.vue'
	import PlayerBar from '../components/PlayerBar.vue'
	import Actions from '../components/Actions.vue'
	import Options from '../components/Options.vue'

	export default {
		components: { Chessboard, Actions, PlayerBar, Options, Background },
		props: {
			variant: {
				type: String as () => ChessVariant,
				default: ChessVariant.Standard
			}
		},
		data() {
			return {
				chess: new ChessOnline(this.variant),
				lightSquareColor: SquareColor.Brown,
				darkSquareColor: SquareColor.Brown,
			}
		},
		computed: {
			bottomRightPlayer(): Player|null {
				switch (this.chess.variant) {
					case ChessVariant.FourPlayer:
						return this.chess.players[this.chess.playerIndexInFront];
					default:
						return null;
				}
			},
			bottomLeftPlayer(): Player|null {
				switch (this.chess.variant) {
					case ChessVariant.FourPlayer:
						return this.chess.players[(this.chess.playerIndexInFront + 1) % this.chess.players.length];
					default:
						return this.chess.players[this.chess.playerIndexInFront];
				}
			},
			topLeftPlayer(): Player|null {
				switch (this.chess.variant) {
					case ChessVariant.FourPlayer:
						return this.chess.players[(this.chess.playerIndexInFront + 2) % this.chess.players.length];
					default:
						return this.chess.players[(this.chess.playerIndexInFront + 1) % this.chess.players.length];
				}
			},
			topRightPlayer(): Player|null {
				switch (this.chess.variant) {
					case ChessVariant.FourPlayer:
						return this.chess.players[(this.chess.playerIndexInFront + 3) % this.chess.players.length];
					default:
						return null;
				}
			},
			currentPlayer(): Player | null {
				return this.chess.isCurrentMoveTheLast() ? this.chess.controller.player : null;
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
			variant(newVariant, oldVariant) {
				this.chess = new ChessOnline(newVariant);
			}
		}
	}
</script>

<template>
	<div class="chess">
		<div>
			<div>
				<PlayerBar 
					:leftPlayer="topLeftPlayer"
					:rightPlayer="topRightPlayer"
					:currentPlayer="currentPlayer"
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
				<PlayerBar 
					:leftPlayer="bottomLeftPlayer"
					:rightPlayer="bottomRightPlayer"
					:currentPlayer="currentPlayer"
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
