<script lang="ts">
    export default {
        props: ['text', 'fontSize', 'paddingBlock', 'borderWidth', 'isBorderVisible'],
        data() {
            return {
                paddingInline: this.paddingBlock * 2,
            }
        },
        computed: {
            sizeStyle() {
                return {
                    'fontSize': this.fontSize + 'px',
                    'paddingBlock': this.paddingBlock + 'px',
                    'paddingInline': this.paddingInline + 'px',
                    'borderRadius': this.paddingInline + 'px',
                    'borderWidth': this.borderWidth + 'px',
                    'borderColor': this.isBorderVisible ? 'var(--color-light)' : 'hsla(0,0%,0%,0)'
                }
            }
        }
    }
</script>

<template>
    <div class="button" :style="sizeStyle">
        {{ text }}
    </div>
</template>

<style scoped>
    .button
    {
        color: var(--color-light);
        background-color: hsla(0,0%,0%,0);
        text-align: center;
        border-style: solid;
        box-sizing: border-box;
        animation: from-light-to-dark 300ms ease-in-out;
    }
    
    .button:hover
    {
        color: var(--color-dark);
        background-color: var(--color-light);
        animation: from-dark-to-light 300ms ease-in-out;
        cursor: pointer;
    }

    @keyframes from-dark-to-light
    {
        0% {
            background-color: var(--color-dark);
        }
        100% {
            background-color: var(--color-light);
        }
    }

    @keyframes from-light-to-dark
    {
        0% {
            background-color: var(--color-light);
        }
        100% {
            background-color: var(--color-dark);
        }
    }
</style>
