<template>
    <div class="date-filter-container">
        <div class="date-input">
            <input type="date" v-model="dateFrom" class="date-field">
        </div>
        <div class="date-input">
            <input type="date" v-model="dateTo" class="date-field">
        </div>
        <button class="submit-button" @click="filterData">Фильтр</button>
        <button class="submit-button" @click="clearFilter">Очистить</button>
    </div>

    <table class="table" v-if="filteredData.length > 0">
        <thead>
            <tr>
                <th>Комментарии к статье {{ articleId }}:</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="comment in filteredData" :key="comment.id">
                <td>{{ comment.content }}</td>
            </tr>
        </tbody>
    </table>
    <div v-else>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            dateFrom: null,
            dateTo: null,
            filteredData: [],
        };
    },
    mounted() {
        this.$store.dispatch('CLEAR_COMMENTS_FROM_PERIOD');
    },
    computed: {
        ...mapGetters(['COMMENTS_FROM_PERIOD']),
        
        filteredData() {
            // Если есть данные из COMMENTS_FROM_PERIOD, используем их
            if (this.COMMENTS_FROM_PERIOD.length > 0) {
                return this.COMMENTS_FROM_PERIOD;
            } else {
                // Иначе, возвращаем пустой массив
                return [];
            }
        },

        articleId() {
            return this.$route.params.id;
        }
    },
    methods: {
        ...mapActions(['FETCH_COMMENTS_FROM_PERIOD', 'CLEAR_COMMENTS_FROM_PERIOD']),
        filterData() {
            if (this.dateFrom && this.dateTo) {
                this.FETCH_COMMENTS_FROM_PERIOD({ articleId: this.articleId, dateFrom: this.dateFrom, dateTo: this.dateTo });
            } else {
                this.CLEAR_COMMENTS_FROM_PERIOD();
            }
        },
        clearFilter() {
            this.dateFrom = null;
            this.dateTo = null;
            this.CLEAR_COMMENTS_FROM_PERIOD();
        }
    }
};
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .date-filter-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .date-input {
        display: flex;
        align-items: center;
    }

    .date-field {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
    }

    .submit-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

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
</style>