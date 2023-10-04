<template>
    <div class="dropdown-items">
        <slot name="dropdown-items"></slot>
    </div>
</template>

<style scoped>
    .dropdown-items {
        background-color: var(--color-dark);
        padding: 4px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
    }
</style>
