<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h1>Книжная полка</h1>
      </v-col>

      <v-col cols="12" sm="6">
        <v-list shaped>
          <v-subheader>Категории</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="item in categories" :key="item.id">
              <v-list-item-icon>
                <v-icon v-text="'mdi-content-duplicate'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="12" sm="6">
        <v-list shaped>
          <v-subheader>Авторы</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="item in authors" :key="item.id">
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-multiple-outline'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`${item.lastName} ${item.firstName} ${item.middleName}`"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomePage",
  async asyncData({store}) {
    const categories = await store.dispatch('categories/getList') || [];
    const authors = await store.dispatch('authors/getList') || [];
    return { categories, authors };
  },
  data() {
    return {
      categories: [],
      authors: [],
    };
  },
};
</script>

<style scoped lang="scss">

</style>
