<script lang="ts">
    export default { 
        props: ['isMobileNavOpen']
    }
</script>

<template>
    <div class="mobile-nav-toggle" :aria-expanded="isMobileNavOpen">
        <div></div>
    </div>
</template>

<style scoped>
    .mobile-nav-toggle
    {
        display: none;
        width: 30px;
        aspect-ratio: 1/1;
        cursor: pointer;
    }

    .mobile-nav-toggle:before, .mobile-nav-toggle:after, .mobile-nav-toggle > div
    {
        content: '';
        background-color: #fff;
        display: block;
        height: 3px;
        margin: 8px 0;
        border-radius: 5px;
        transition: all .2s ease-in-out;
    }

    .mobile-nav-toggle[aria-expanded="true"]:before
    {
        transform: translateY(11px) rotate(135deg);
    }
    
    .mobile-nav-toggle[aria-expanded="true"]:after
    {
        transform: translateY(-11px) rotate(-135deg);
    }
    
    .mobile-nav-toggle[aria-expanded="true"] > div
    {
        transform: scale(0);
    }

    @media (max-width: 600px)
    {
        .mobile-nav-toggle
        {
            display: block;
        }
    }
</style>
