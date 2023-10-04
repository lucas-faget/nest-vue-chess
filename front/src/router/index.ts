import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import { routes } from './routes'

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
