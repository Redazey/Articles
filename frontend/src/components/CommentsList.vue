<template>
    <table class="table">
        <thead>
            <tr>
                <th>Комментарии к статье {{ articleId }}:</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="comment in comments" :key="comment.id">
                <td v-if="editingCommentId === comment.id">
                    <input type="text" v-model="editContent" />
                </td>
                <td v-else>
                    {{ comment.content }}
                </td>
                <td class="actions">
                    <button v-if="editingCommentId === comment.id" class="action-button" @click="saveComment(comment.id)">Сохранить</button>
                    <button v-if="editingCommentId === comment.id" class="action-button" @click="cancelEdit">Отмена</button>
                    <button v-else class="action-button" @click="startEdit(comment)">Редактировать</button>
                    <button class="action-button" @click="deleteComment(comment.id)">Удалить</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            editingCommentId: null,  // Track which comment is being edited
            editContent: '',         // Store the content of the comment being edited
        };
    },
    mounted() {
        this.fetchComments(this.articleId);
    },
    computed: {
        ...mapGetters(['COMMENTS']),

        articleId() {
            return this.$route.params.id;
        },
        comments() {
            return this.COMMENTS;
        }
    },
    methods: {
        ...mapActions(['FETCH_COMMENTS', 'DELETE_COMMENT', 'UPDATE_COMMENT']),

        startEdit(comment) {
            this.editingCommentId = comment.id;
            this.editContent = comment.content;
        },

        cancelEdit() {
            this.editingCommentId = null;
            this.editContent = '';
        },

        saveComment(commentId) {
            this.UPDATE_COMMENT({ articleId: this.articleId, comment: { id: commentId, content: this.editContent } })
                .then(() => {
                    this.cancelEdit();
                    this.fetchComments(this.articleId);
                })
                .catch(error => {
                    console.error('Failed to update comment:', error);
                });
        },

        deleteComment(commentId) {
            this.DELETE_COMMENT({ articleId: this.articleId, commentId })
                .then(() => {
                    this.fetchComments(this.articleId);
                })
                .catch(error => {
                    console.error('Failed to delete comment:', error);
                });
        },

        fetchComments(articleId) {
            this.FETCH_COMMENTS(articleId).catch(error => {
                console.error('Failed to fetch comments:', error);
            });
        }
    }
}
</script>

<style>
.table {
    border-collapse: collapse;
    width: 100%;
    max-width: 600px;
}

.table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.table td {
    color: #ddd;
}

.table th {
    background-color: #f0f0f0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}

.action-button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>