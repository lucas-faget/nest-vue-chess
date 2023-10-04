<template>
    <div class="dropdown-item">
        <slot name="dropdown-item"></slot>
    </div>
</template>

<style scoped>
    .dropdown-item {
        color: var(--color-gray);
        padding: 5px 10px;
        border-radius: 8px;
        cursor: pointer;
        white-space: nowrap;
    }

    .dropdown-item:hover {
        background-color: var(--color-dark-gray);
        color: var(--color-light);
    }
</style>
