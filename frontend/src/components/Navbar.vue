<script lang="ts">
    import { routesPlayLocally } from '../router/routes/routesPlayLocally'
    import { routesPrivateGame } from '../router/routes/routesPrivateGame'
    import { routesLearn } from '../router/routes/routesLearn'
    import MobileNavToggle from './MobileNavToggle.vue';
    import Dropdown from './Dropdown.vue';
    import DropdownItems from './DropdownItems.vue';
    import DropdownItem from './DropdownItem.vue';

    export default {
        components: { MobileNavToggle, Dropdown, DropdownItems, DropdownItem },
        data() {
            return {
                menuPlayLocallyItems: routesPlayLocally.map((route) => ({
                    text: route.text,
                    path: route.path
                })),
                menuPrivateGameItems: routesPrivateGame.map((route) => ({
                    text: route.text,
                    path: route.path
                })),
                menuLearnItems: routesLearn.map((route) => ({
                    text: route.text,
                    path: route.path
                })),
                currentRoute: this.$route.path,
                isMobileNavOpen: false
            }
        },
        mounted() {
            this.$router.beforeEach((to, from, next) => {
                this.currentRoute = to.path;
                next();
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.currentRoute = to.path;
            next();
        },
        methods: {
            toggleMobileNav() {
                this.isMobileNavOpen = !this.isMobileNavOpen;
            }
        },
    }
</script>

<template>
    <nav class="nav">
        <div class="logo">
            <router-link to="/">
                <img src="/assets/icon/chess.svg" alt="Logo" />
            </router-link>
        </div>

        <MobileNavToggle :isMobileNavOpen="isMobileNavOpen" @click="toggleMobileNav" />

        <div class="nav-menu" :aria-expanded="isMobileNavOpen">
            <ul class="nav-ul">
                <li class="nav-li">
                    <router-link to="/">
                        <span class="nav-item">
                            home
                        </span>
                    </router-link>
                </li>

                <li class="nav-li">
                    <Dropdown>
                        <!-- Dropdown Toggle Slot -->
                        <template #dropdown-toggle>
                            <span class="nav-item">Play locally</span>
                        </template>

                        <!-- Dropdown Content Slot -->
                        <template #dropdown-content>
                            <DropdownItems>
                                <!-- Dropdown Items Slot -->
                                <template #dropdown-items>
                                    <template v-for="(item, index) in menuPlayLocallyItems" :key="index">
                                        <DropdownItem>
                                            <!-- Dropdown Item Slot -->
                                            <template #dropdown-item>
                                                <router-link :to="item.path">
                                                    {{ item.text }}
                                                </router-link>
                                            </template>
                                        </DropdownItem>
                                    </template>
                                </template>
                            </DropdownItems>
                        </template>
                    </Dropdown>
                </li>

                <li class="nav-li">
                    <Dropdown>
                        <!-- Dropdown Toggle Slot -->
                        <template #dropdown-toggle>
                            <span class="nav-item">Play a friend</span>
                        </template>

                        <!-- Dropdown Content Slot -->
                        <template #dropdown-content>
                            <DropdownItems>
                                <!-- Dropdown Items Slot -->
                                <template #dropdown-items>
                                    <template v-for="(item, index) in menuPrivateGameItems" :key="index">
                                        <DropdownItem>
                                            <!-- Dropdown Item Slot -->
                                            <template #dropdown-item>
                                                <router-link :to="item.path">
                                                    {{ item.text }}
                                                </router-link>
                                            </template>
                                        </DropdownItem>
                                    </template>
                                </template>
                            </DropdownItems>
                        </template>
                    </Dropdown>
                </li>

                <li class="nav-li">
                    <Dropdown>
                        <!-- Dropdown Toggle Slot -->
                        <template #dropdown-toggle>
                            <span class="nav-item">Learn</span>
                        </template>

                        <!-- Dropdown Content Slot -->
                        <template #dropdown-content>
                            <DropdownItems>
                                <!-- Dropdown Items Slot -->
                                <template #dropdown-items>
                                    <template v-for="(item, index) in menuLearnItems" :key="index">
                                        <DropdownItem>
                                            <!-- Dropdown Item Slot -->
                                            <template #dropdown-item>
                                                <router-link :to="item.path">
                                                    {{ item.text }}
                                                </router-link>
                                            </template>
                                        </DropdownItem>
                                    </template>
                                </template>
                            </DropdownItems>
                        </template>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .nav
    {
        position: absolute;
        display: flex;
        align-items: center;
        height: var(--navbar-height);
        width: 100vw;
    }

    .logo
    {
        position: relative;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline: 10px;
    }

    .logo img
    {
        width: 40px;
        aspect-ratio: 10px;
    }

    .mobile-nav-toggle
    {
        z-index: 1000;
        margin-right: 30px;
    }

    .nav-menu
    {
        height: 100%;
        display: flex;
    }

    .nav-ul
    {
        display: flex;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .nav-item
    {
        color: var(--color-light);
        display: flex;
        align-items: center;
        text-transform: capitalize;
    }

    .nav-item:hover
    {
        color: var(--color-gray);
        cursor: pointer;
    }

    @media (min-width: 601px)
    {
        .nav
        {
            gap: 40px;
        }

        .nav-ul
        {
            gap: 40px;
        }

        .nav-li
        {
            height: 100%;
            display: flex;
            align-items: center;
        }

        .nav-item {
            height: var(--navbar-height);
        }
    }

    @media (max-width: 600px)
    {
        nav
        {
            justify-content: space-between;
        }
        
        .nav-menu
        {
            background-color: hsla(0, 0%, 15%, 0.5);
            backdrop-filter: blur(20px);
            position: fixed;
            top: -100%;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            transform: translateY(0%);
        }

        .nav-menu[aria-expanded="true"]
        {
            transform: translateY(100%);
        }

        .nav-ul
        {
            position: relative;
            left: 100px;
            flex-direction: column;
            justify-content: center;
        }

        .nav-item
        {
            font-size: 40px;
        }
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
