<script lang="ts">
    export default {
        props: ['text', 'isVisible']
    }
</script>

<template>
    <span class="tooltip" :class="{'hidden': !isVisible }">{{ text }}</span>
</template>

<style scoped>
    .tooltip
    {
        color: #fff;
        background-color: #000;
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: 100;
        width: 90px;
        padding: 5px;
        margin-left: -50px;
        text-align: center;
        border-radius: 6px;
    }
    
    .tooltip::after
    {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #000 transparent;
    }

    .hidden
    {
        visibility: hidden;
    }
</style>
