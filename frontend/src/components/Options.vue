<script lang="ts">
    import { SquareColor } from '../types/SquareColor';
    import Dropdown from './Dropdown.vue';
    import DropdownItems from './DropdownItems.vue';
    import DropdownItem from './DropdownItem.vue';

    export default {
    props: {
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
            squareColors: Object.values(SquareColor)
        };
    },
    methods: {
        changeLightColor(squareColor: SquareColor): void {
            this.$emit('change-light-square-color', squareColor);
        },
        changeDarkColor(squareColor: SquareColor): void {
            this.$emit('change-dark-square-color', squareColor);
        }
    },
    components: { DropdownItem, DropdownItems, Dropdown }
}
</script>

<template>
    <div class="options">
        <div class="title">
            Options
        </div>
        <div class="option">
            <div>Change square color :</div>
            <div class="color-squares">
                <!-- Light Square Color Dropdown -->
                <Dropdown>
                    <!-- Dropdown Toggle Slot -->
                    <template #dropdown-toggle>
                        <div :class="['color-square', 'square-light-' + lightSquareColor]"></div>
                    </template>

                    <!-- Dropdown Content Slot -->
                    <template #dropdown-content>
                        <DropdownItems>
                            <!-- Dropdown Items Slot -->
                            <template #dropdown-items>
                                <template v-for="(squareColor, index) in squareColors" :key="index">
                                    <DropdownItem>
                                        <!-- Dropdown Item Slot -->
                                        <template #dropdown-item>
                                            <div 
                                                :class="['color-square', 'square-light-' + squareColor]"
                                                @click="changeLightColor(squareColor)"
                                            ></div>
                                        </template>
                                    </DropdownItem>
                                </template>
                            </template>
                        </DropdownItems>
                    </template>
                </Dropdown>

                <!-- Dark Square Color Dropdown -->
                <Dropdown>
                    <!-- Dropdown Toggle Slot -->
                    <template #dropdown-toggle>
                        <div :class="['color-square', 'square-dark-' + darkSquareColor]"></div>
                    </template>

                    <!-- Dropdown Content Slot -->
                    <template #dropdown-content>
                        <DropdownItems>
                            <!-- Dropdown Items Slot -->
                            <template #dropdown-items>
                                <template v-for="(squareColor, index) in squareColors" :key="index">
                                    <DropdownItem>
                                        <!-- Dropdown Item Slot -->
                                        <template #dropdown-item>
                                            <div 
                                                :class="['color-square', 'square-dark-' + squareColor]"
                                                @click="changeDarkColor(squareColor)"
                                            ></div>
                                        </template>
                                    </DropdownItem>
                                </template>
                            </template>
                        </DropdownItems>
                    </template>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .options
    {
        color: var(--color-light);
        background-color: var(--color-dark-gray);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        padding-block: 20px;
    }

    .options > .title
    {
        font-size: 25px;
    }

    .options > .option
    {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .color-squares
    {
        display: flex;
        gap: 10px;
    }

    .color-square
    {
        width: 30px;
        aspect-ratio: 1/1;
        cursor: pointer;
    }
</style>
