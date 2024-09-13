<template>
    <div>
        <h1 id="article-title">{{ article.title }}</h1>
        <p id="article-content">{{ article.content }}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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

    mounted() {
        this.$store.dispatch('FETCH_ARTICLE', this.articleId);
        
    },

    computed: {
        ...mapGetters(['CURRENT_ARTICLE']),

        articleId() {
            return this.$route.params.id;
        }
    },

    watch: {
        CURRENT_ARTICLE(newArticle) {
            this.article = { ...newArticle }; 
        }
    }
};
</script>