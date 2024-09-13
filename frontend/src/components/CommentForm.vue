<template>
	<div class="comment-form">
		<h2>Добавить комментарий</h2>
		<form @submit.prevent="submitComment">
			<div class="form-group">
				<label for="comment">Ваш комментарий:</label>
				<textarea id="comment" v-model="comment.commentText" required></textarea>
			</div>
			<div class="button-container">
				<button type="submit" class="submit-button">Отправить</button>
			</div>
		</form>
	</div>
</template>
	
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    props: {
        commentText: {
            type: Object,
            default: () => ({
                text: '',
            }),
        },
    },

    data() {
        return {
            comment: { ...this.commentText },
        };
    },

    computed : {
        articleId() {
            return this.$route.params.id;
        }
    },

	methods: {
        ...mapActions(['CREATE_COMMENT']),

        submitComment() {
            this.CREATE_COMMENT(this.comment, articleId); 
            this.clearForm();
        },

        clearForm() {
            this.comment = {
                text: '',
            };
        },
    }
};
</script>
