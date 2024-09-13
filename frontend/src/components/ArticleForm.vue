<template>
    <div class="article-form">
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="submitArticle">
            <div class="form-group">
                <label for="title">Заголовок:</label>
                <input type="text" id="title" v-model="article.title" required>
            </div>
            <div class="form-group">
                <label for="content">Содержание:</label>
                <textarea id="content" v-model="article.content" required></textarea>
            </div>
            <div class="button-group">
                <button type="submit" class="primary-button">Добавить</button>
            </div>
        </form>
    </div>
</template>
    
<script>
import { mapActions } from 'vuex';

export default {
    props: {
        articleData: {
            type: Object,
            default: () => ({
                title: '',
                content: '',
            }),
        },
    },

    data() {
        return {
            article: { ...this.articleData },
        };
    },

    methods: {
        ...mapActions(['CREATE_ARTICLE']),

        submitArticle() {
            this.CREATE_ARTICLE(this.article); 
            this.clearForm();
        },

        clearForm() {
            this.article = {
                title: '',
                content: '',
            };
        },
    }
};
</script>