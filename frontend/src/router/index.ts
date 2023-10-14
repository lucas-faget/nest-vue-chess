import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import HomeView from '../views/HomeView.vue'
import PlayOnlineView from '../views/PlayOnlineView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		...routes,
		{
			path: '/:roomId([A-Za-z0-9]{8})',
			name: 'online',
			component: PlayOnlineView,
			props: (route) => ({
				roomId: route.params.roomId,
			}),
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: ErrorView,
			props: {
				code: '404',
				message: 'Not Found'
			}
		}
	]
});

export default router
