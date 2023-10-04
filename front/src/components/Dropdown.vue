<script lang="ts">
    export default {
        data() {
            return {
                isDropdownOpen: false
            }
        },
        mounted() {
            document.addEventListener('click', this.handleDocumentClick);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.handleDocumentClick);
        },
        methods: {
            handleDocumentClick(event: Event) {
                this.isDropdownOpen = false;
            },
            handleDropdownToogleClick(event: Event) {
                event.stopPropagation();
                this.toggleDropdown();
            },
            toggleDropdown() {
                this.isDropdownOpen = !this.isDropdownOpen;
            },
        }
    }
</script>

<template>
    <div class="position-relative">
        <div @click="handleDropdownToogleClick">
            <slot name="dropdown-toggle"></slot>
        </div>
        <div class="position-absolute" v-if="isDropdownOpen">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>


<style scoped>
    .dropdown-menu {
        background-color: var(--color-dark);
        padding: 4px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
    }

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

    .position-relative {
        position: relative;
    }

    .position-absolute {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
    }
</style>
