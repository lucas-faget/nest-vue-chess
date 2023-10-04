<script lang="ts">
    import type { Square } from '@/chess/Square';
    import { SquareColor } from '@/enums/SquareColor';

    export default {
        props: {
			square: {
                type: Object as () => (Square|null),
                default: null
            },
            lightSquareColor: {
                type: String as () => SquareColor,
                default: SquareColor.Gray
            },
            darkSquareColor: {
                type: String as () => SquareColor,
                default: SquareColor.Gray
            },
            isLegal: {
                type: Boolean,
                default: false
            },
            isFogged: {
                type: Boolean,
                default: false
            }
		},
        computed: {
            bgColor(): string {
                return this.square?.isDark() ? 'square-dark-' + this.darkSquareColor : 'square-light-' + this.lightSquareColor;
            },
            color(): string|undefined {
                return this.square?.getPiece()?.color ?? undefined;
            },
            bgPiece() {
                return this.square && !this.square.isEmpty() ? {
                    backgroundImage: this.color ? `url(/assets/piece/${this.color}/${this.square.getPiece()?.getName()}.svg)` : 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                } : '';
            }
        }
    }
</script>

<template>
    <div v-if="square && isFogged" class="fogged"></div>
	<div v-else-if="square" :style="bgPiece" :class="[bgColor, { 'legal': isLegal }]"></div>
    <div v-else class="void"></div>
</template>

<style scoped>
    .void {
        background-color: var(--color-white);
    }

    .fogged {
        background: #000;
    }

    .legal {
        opacity: 0.7;
    }
</style>
