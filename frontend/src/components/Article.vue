<template>
    <div>
        <div v-if="!isEditing">
            <h1 id="article-title">{{ article.title }}</h1>
            <p id="article-content">{{ article.content }}</p>

            <div class="article-actions">
                <button class="submit-button" @click="editArticle">Редактировать</button>
                <button class="submit-button" @click="deleteArticle">Удалить</button>
            </div>
        </div>

        <div v-if="isEditing" class="edit-container">
            <div class="edit-column">
                <input type="text" v-model="article.title" placeholder="Заголовок" class="edit-input">
                <textarea v-model="article.content" placeholder="Контент" class="edit-textarea"></textarea>
            </div>
            <div class="edit-buttons">
                <button class="submit-button" @click="saveArticle">Сохранить</button>
                <button class="submit-button" @click="cancelEdit">Отмена</button>
            </div>
        </div>
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
            isEditing: false,
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
    },

    methods: {
        ...mapActions(['FETCH_ARTICLE', 'UPDATE_ARTICLE', 'DELETE_ARTICLE']),

        editArticle() {
            this.isEditing = true;
        },

        saveArticle() {
            this.UPDATE_ARTICLE({ ...this.article })
                .then(() => {
                    this.isEditing = false;
                })
                .catch(error => {
                    console.error('Error updating article:', error);
                    // Обработка ошибок
                });
        },

        cancelEdit() {
            this.isEditing = false;
        },

        deleteArticle() {
            this.DELETE_ARTICLE(this.article.id)
                .then(() => {
                    // Перенаправление на другую страницу или обновление списка статей
                    this.$router.push('/articles');
                })
                .catch(error => {
                    console.error('Error deleting article:', error);
                    // Обработка ошибок
                });
        },
    },
};
</script>

<style scoped>
    .article-actions {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .edit-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .edit-column {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 300px;
    }

    .edit-input,
    .edit-textarea {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
    }

    .edit-buttons {
        display: flex;
        gap: 10px;
        width: 100%;
    }

    .submit-button {
        margin-right: 20px;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>