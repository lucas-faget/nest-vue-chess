<script lang="ts">
    export default {
        props: {
            text: String,
            leftIcon: {
                type: String,
                default: ''
            },
            rightIcon: {
                type: String,
                default: ''
            },
        }
    }
</script>

<template>
    <div class="button">
        <div v-if="leftIcon" class="icon">
            <img :src="'/assets/icon/' + leftIcon" :alt="leftIcon" />
        </div>

        <span>{{ text }}</span>

        <div v-if="rightIcon" class="icon">
            <img :src="'/assets/icon/' + rightIcon" :alt="rightIcon" />
        </div>
    </div>
</template>

<style scoped>
    .button {
        color: #000;
        background-color: var(--color-light);
        padding: 10px 30px;
        border-radius: 20px;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .button:hover {
        background-color: var(--color-light-gray);
    }

    .icon {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon > img {
        width: 100%;
        height: 100%;
    }
</style>
