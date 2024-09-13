<template>
    <div class="edit-container">
        <div class="edit-column">
            <input type="text" v-model="article.title" placeholder="Заголовок" class="edit-input">
            <textarea v-model="article.content" placeholder="Контент" class="edit-textarea"></textarea>
        </div>
        <div class="edit-buttons">
            <button class="submit-button" @click="submitArticle">Сохранить</button>
            <button class="submit-button" @click="clearForm">Отмена</button>
        </div>
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
<style>
.submit-button {
    margin-right: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
</style>