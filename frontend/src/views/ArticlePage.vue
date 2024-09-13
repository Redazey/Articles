<template>
    <div id="app">
        <ArticlePage />
        <CommentsForm />
        <SortedComments />
        <CommentsList />
    </div>
</template>
  
<script>
    import ArticlePage from '../components/Article.vue';
    import CommentsList from '../components/CommentsList.vue';
    import CommentsForm from '../components/CommentForm.vue';
    import SortedComments from '../components/SortedComments.vue';

    export default {
        name: 'App',
        components: {
            ArticlePage,
            CommentsForm,
            SortedComments,
            CommentsList
        }
    };
</script>

<style>
    #app{
        display: flex;
        flex-direction: column;
        gap: 20px; 
        align-items: center;
    }
</style>