import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticlePage from '../views/ArticlePage.vue'
import ArticleForm from '../views/ArticleForm.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/articles',
			name: 'ArticlesList',
			component: ArticlesView,
		},
        {
			path: '/article/:id',
			name: 'ArticlePage',
			component: ArticlePage,
		},
        {
			path: '/new-article',
			name: 'NewArticle',
			component: ArticleForm,
		}
	]
})

export default router
