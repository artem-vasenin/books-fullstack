<template>
  <v-container>
    <v-row v-if="author">
      <v-col cols="12">
        <h1>{{author.lastName}} {{author.firstName}} {{author.middleName}}</h1>
      </v-col>
      <v-col v-if="author.image" cols="12" sm="4">
        <v-img
          :lazy-src="author.image"
          :src="author.image"
        ></v-img>
      </v-col>
      <v-col v-if="author.description" cols="12" :sm="author.image ? 8 : 12">
        {{author.description}}
      </v-col>
      <v-col cols="12" v-if="author.books && author.books.length">
        <v-list shaped>
          <v-subheader>Книги</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in author.books"
              :key="item.id"
              @click="$router.push(`/books/${item.id}`)"
            >
              <v-list-item-icon>
                <v-icon v-text="'mdi-book-open-page-variant'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`${item.title}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>Автор не найден</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Author",
  // SSR
  validate({params}) {
    return /^\d+$/.test(params.id);
  },
  async fetch({store, params}) {
    await store.dispatch('authors/getById', params.id);
  },
  // SPA
  computed: {
    author() {
      return this.$store.getters['authors/author'] || null;
    }
  }
};
</script>

<style scoped>

</style>
