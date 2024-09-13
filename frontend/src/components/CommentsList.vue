<template>
    <table class="table">
      <thead>
        <tr>
          <th>Комментарии к статье {{ articleId }}:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in COMMENTS" :key="comment.id">
          <td>{{ comment.content }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  import {mapGetters} from 'vuex';
  
  export default {
        mounted() {
            this.$store.dispatch('FETCH_COMMENTS', articleId).then(() => {
                console.log(this.ARTICLES);
            });
        },
        computed : {
            ...mapGetters(['ARTICLES']),

            articleId() {
                return this.$route.params.id;
            }
        }
    }
  </script>
  
  <style>
  .table {
    border-collapse: collapse;
    width: 100%;
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