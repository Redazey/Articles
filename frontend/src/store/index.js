// store.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
		// ARTICLES
		articles: [],
		currentArticle: null,

		// COMMENTS
		commentsFromPeriod: [],
		comments: [],    
		currentComment: null,
	},

	getters: {
		ARTICLES: state => {
			return state.articles;
		},
		CURRENT_ARTICLE: state => {
			return state.currentArticle;
		},
		COMMENTS: state => {
			return state.comments;
		},
		CURRENT_COMMENT: state => {
			return state.currentComment;
		},
		COMMENTS_FROM_PERIOD: state => {
			return state.commentsFromPeriod;
		},
	},

	mutations: {
		// ARTICLES
		SET_ARTICLES: (state, articles) => {
			state.articles = articles;
		},
		SET_CURRENT_ARTICLE: (state, article) => {
			state.currentArticle = article;
		},
		ADD_ARTICLE: (state, article) => {
			state.articles.push(article);
		},
		UPDATE_ARTICLE: (state, article) => {
			const index = state.articles.findIndex(a => a.id === article.id);
			if (index !== -1) {
				state.articles[index] = article;
			}
		},
		DELETE_ARTICLE: (state) => {
			state.currentArticle = null;
		},

		// COMMENTS
		SET_COMMENTS: (state, comments) => {
			state.comments = comments;
		},
		SET_CURRENT_COMMENT(state, comment) {
			state.currentComment = comment;
		},
		ADD_COMMENT(state, comment) {
			state.comments.push(comment);
		},
		UPDATE_COMMENT(state, updatedComment) {
			const index = state.comments.findIndex(c => c.id === updatedComment.id);
			if (index !== -1) {
				state.comments[index] = updatedComment;
			}
		},
		DELETE_COMMENT(state) {
			state.currentComment = null;
		},

        // ANALYTIC
		SET_COMMENTS_FROM_PERIOD(state, comments) {
			state.commentsFromPeriod = comments;
		},
        DELETE_COMMENTS_FROM_PERIOD(state, id) {
			state.commentsFromPeriod = [];
		},
	},

	actions: {
		// ARTICLES
		FETCH_ARTICLES: async(context) => {
			try {
				let { data } = await axios.get('http://localhost:5000/articles')
				context.commit('SET_ARTICLES', data);
			} catch (error) {
				console.error(error);
			}
		},

		FETCH_ARTICLE: async(context, id) => {
			try {
				let { data } = await axios.get(`http://localhost:5000/article/${id}`)
				context.commit('SET_CURRENT_ARTICLE', data);
			} catch (error) {
				console.error(error);
			}
		},

		CREATE_ARTICLE: async(context, article) => {
			try {
				let { data } = await axios.post('http://localhost:5000/article', article);
				context.commit('ADD_ARTICLE', data);
			} catch (error) {
				console.error(error);
			}
		},

		UPDATE_ARTICLE: async(context, article) =>{
			try {
				let { data } = await axios.put(`http://localhost:5000/article/${article.id}`, article);
				context.commit('UPDATE_ARTICLE', data);
			} catch (error) {
				console.error(error);
			}
		},
        DELETE_ARTICLE: async (context, articleId) => {
			try {
					await axios.delete(`http://localhost:5000/article/${articleId}`);
					context.commit('DELETE_ARTICLE');
			} catch (error) {
					console.error(error);
			}
		},

		// COMMENTS
		FETCH_COMMENTS: async (context, articleId) => {
			try {
					let { data } = await axios.get(`http://localhost:5000/article/${articleId}/comments`);
					context.commit('SET_COMMENTS', data);
			} catch (error) {
					console.error(error);
			}
		},
		FETCH_COMMENT: async (context, { articleId, commentId }) => {
			try {
					let { data } = await axios.get(`http://localhost:5000/article/${articleId}/comment/${commentId}`);
					context.commit('SET_CURRENT_COMMENT', data);
			} catch (error) {
					console.error(error);
			}
		},
		CREATE_COMMENT: async (context, { articleId, comment }) => {
			try {
					let { data } = await axios.post(`http://localhost:5000/article/${articleId}/comment`, comment);
					context.commit('ADD_COMMENT', data);
			} catch (error) {
					console.error(error);
			}
		},
		UPDATE_COMMENT: async (context, { articleId, comment }) => {
			try {
					let { data } = await axios.put(`http://localhost:5000/article/${articleId}/comment/${comment.id}`, comment);
					context.commit('UPDATE_COMMENT', data);
			} catch (error) {
					console.error(error);
			}
		},
		DELETE_COMMENT: async (context, { articleId, commentId }) => {
			try {
					await axios.delete(`http://localhost:5000/article/${articleId}/comment/${commentId}`);
					context.commit('DELETE_COMMENT');
			} catch (error) {
					console.error(error);
			}
		},

        // ANALYTIC
		FETCH_COMMENTS_FROM_PERIOD: async (context, {articleId, dateFrom, dateTo }) => {
			try {
					let { data } = await axios.get(`http://localhost:5000/analytic/${articleId}/comments/?dateFrom=${dateFrom}&dateTo=${dateTo}`);
					context.commit('SET_COMMENTS_FROM_PERIOD', data);
			} catch (error) {
					console.error(error);
			}
		},
        CLEAR_COMMENTS_FROM_PERIOD: async (context) => {
			try {
					context.commit('DELETE_COMMENTS_FROM_PERIOD');
			} catch (error) {
					console.error(error);
			}
		},
	},
});
