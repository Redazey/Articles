import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        articles: [],
        currentArticle: null,
    },

    mutations: {
        SET_ARTICLES(state, articles) {
            state.articles = articles;
        },
        SET_CURRENT_ARTICLE(state, article) {
            state.currentArticle = article;
        },
        ADD_ARTICLE(state, article) {
            state.articles.push(article);
        },
        UPDATE_ARTICLE(state, updatedArticle) {
            const index = state.articles.findIndex(a => a.id === updatedArticle.id);
            if (index !== -1) {
                Vue.set(state.articles, index, updatedArticle);
            }
        },
    },

    actions: {

        fetchArticles({ commit }) {
        axios.get('/articles')
            .then(response => {
                commit('SET_ARTICLES', response.data);
            });
        },

        fetchArticle({ commit }, id) {
        axios.get(`/article/${id}`)
            .then(response => {
                commit('SET_CURRENT_ARTICLE', response.data);
            });
        },

        createArticle({ commit }, article) {
        return axios.post('/article', article)
            .then(response => {
                commit('ADD_ARTICLE', response.data);
            });
        },

        updateArticle({ commit }, article) {
        return axios.put(`/article/${article.id}`, article)
            .then(response => {
                commit('UPDATE_ARTICLE', response.data);
            });
        },
    },
});