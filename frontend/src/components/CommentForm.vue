<template>
    <div class="comment-form">
        <h4>Добавить комментарий</h4>
        <form @submit.prevent="submitComment" class="form-column"> 
            <div class="form-group">
            <label for="comment">Ваш комментарий:</label>
            <textarea id="comment" v-model="comment.content" required></textarea>
            </div>
            <div class="button-container">
            <button type="submit" class="submit-button">Отправить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        props: {
            commentText: {
                type: Object,
                default: () => ({
                    content: '',
                }),
            },
        },

        data() {
            return {
                comment: { ...this.commentText },
            };
        },

        computed: {
            articleId() {
                return this.$route.params.id;
            },
        },

        methods: {
        ...mapActions(['CREATE_COMMENT']),

        submitComment() {
            this.CREATE_COMMENT({articleId: this.articleId, comment: this.comment}); 
            this.clearForm();
        },

        clearForm() {
            this.comment = {
            content: '',
            };
        },
    },
};
</script>

<style scoped>
    .form-column {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .form-group label {
        margin-bottom: 5px;
    }

    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .button-container {
        text-align: center;
    }

    .submit-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>