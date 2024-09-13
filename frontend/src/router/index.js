import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/article',
			name: 'CreateArticle',
			component: ArticlesView,
		},
        {
			path: '/article/:id',
			name: 'CreateArticle',
			component: ArticlesView,
		}
	]
})

export default router
