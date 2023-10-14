<script lang="ts">
    import Navbar from './components/Navbar.vue'
    import Background from './components/Background.vue'

    export default {
        components: { Navbar, Background },
    }
</script>

<template>
    <div>
        <header class="navbar">
            <Navbar />
        </header>

        <router-view />
    </div>
</template>

<style scoped>
    .navbar {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>
