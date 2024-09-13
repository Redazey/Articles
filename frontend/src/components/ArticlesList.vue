<template>
    <table class="table">
        <thead>
        <tr>
            <th>Название статьи</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in ARTICLES" :key="article.id">
            <td>
                <RouterLink :to="{ path: '/article/'+ article.id}">
                    {{ article.title }}
                </RouterLink>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('FETCH_ARTICLES');
    },
    computed : {
        ...mapGetters(['ARTICLES']),
        }
    }
</script>

<style>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th, .table td {
  border: 2px solid hsla(160, 100%, 37%, 1);
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: hsla(160, 100%, 37%, 1);
}
</style>