<template>
    <div id="app">
        <ArticlePage />
        <CommentsForm />
        <CommentsList />
    </div>
</template>
  
<script>
    import ArticlePage from '../components/Article.vue';
    import CommentsList from '../components/CommentsList.vue';
    import CommentsForm from '../components/CommentForm.vue';

    export default {
        name: 'App',
        components: {
            ArticlePage,
            CommentsForm,
            CommentsList
        }
    };
</script>

<style>
    #app{
        display: flex;
        flex-direction: column;
        gap: 20px; 
    }
</style>