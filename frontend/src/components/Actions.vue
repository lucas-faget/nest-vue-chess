<script lang="ts">
    import { ActionType } from '../types/ActionType';
    import Tooltip from './Tooltip.vue';

    export default {
        components: { Tooltip },
        props: ['chess'],
        data() {
            return {
                actionList: [
                    { index: 0, type: ActionType.Spin, tooltipText: "Spin chessboard", isHovered: false },
                    { index: 1, type: ActionType.First, tooltipText: "First move", isHovered: false },
                    { index: 2, type: ActionType.Previous, tooltipText: "Previous move", isHovered: false },
                    { index: 3, type: ActionType.Next, tooltipText: "Next move", isHovered: false },
                    { index: 4, type: ActionType.Last, tooltipText: "Last move", isHovered: false },
                    { index: 5, type: ActionType.Cancel, tooltipText: "Cancel move", isHovered: false }
                ]
            }
        },
        methods: {
            src(type: string, isHovered: boolean): string
            {
                return `/assets/icon/${isHovered ? 'black' : 'white'}/${type}.svg`;
            },
            performAction(type: ActionType): void
            {
                switch (type) {
                    case ActionType.Spin:
                        this.chess.spinChessboard();
                        break;
                    case ActionType.First:
                        this.chess.showFirstMove();
                        break;
                    case ActionType.Previous:
                        this.chess.showPreviousMove();
                        break;
                    case ActionType.Next:
                        this.chess.showNextMove();
                        break;
                    case ActionType.Last:
                        this.chess.showLastMove();
                        break;
                    case ActionType.Cancel:
                        this.chess.deleteLastMove();
                        break;
                }
            },
            isBlinking(actionType: ActionType, isHovered: boolean): boolean
            {
                return !isHovered && actionType === ActionType.Last && !this.chess.isActiveTurnTheLast();
            }
        }
    }
</script>

<template>
    <div class="buttons">
        <div v-for="action in actionList" :key="action.index" 
                    @mouseover="action.isHovered = true" 
                    @mouseout="action.isHovered = false" 
                    @click="performAction(action.type)" 
                    :class="['button', {'blink': isBlinking(action.type, action.isHovered)}]"
        >
            <img class="icon" v-bind:src="src(action.type, action.isHovered)" draggable="false" />
            <Tooltip :text="action.tooltipText" :isVisible="action.isHovered" />
        </div>
    </div>
</template>

<style scoped>
    .buttons
    {
        background-color: var(--color-dark);
        display: flex;
        justify-content: center;
    }

    .button
    {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(calc(100vw / 6), 65px);
        aspect-ratio: 1/1;
    }

    .button:hover
    {
        cursor: pointer;
        background: var(--color-gray);
    }

    .icon
    {
        width: 35px;
        aspect-ratio: 1/1;
    }
</style>
