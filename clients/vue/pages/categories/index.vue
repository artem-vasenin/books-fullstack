<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center">
        <h1>Категории</h1>
        <v-btn v-show="user && !isEdit" @click="isEdit = true" class="ml-6" icon color="primary">
          <v-icon>mdi-account-plus-outline</v-icon>
        </v-btn>
        <v-btn v-show="user && isEdit" @click="onCloseForm" class="ml-6" icon color="warning">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <AuthorForm @submit="submit" :isEdit="isEdit"/>

    <v-row>
      <v-col>
        <v-list shaped>
          <v-list-item-group color="primary">
            <ListItem
              v-for="item in categories"
              :key="item.id"
              :item="item"
              @to="$router.push(`/categories/${$event}`)"
              @delete="onDelete($event)"
              @edit="onEdit($event)"
            />
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CategoriesPage",
  async asyncData({store}) {
    const categories = await store.dispatch('categories/getList');
    return { categories };
  },
  data() {
    return {
      isEdit: false,
      categories: [],
    };
  },
  computed: {
    user() { return this.$store.getters['user'] || null; },
    form() { return this.$store.getters['authors/form']; },
  },
  methods: {
    submit(e) {
      console.log('submit', e);
    },
    onDelete(e) {
      this.isEdit = true;
      console.log('onDelete', e);
    },
    onCloseForm() {
      this.isEdit = false;
      this.$store.dispatch('authors/clearForm');
    },
    onEdit(e) {
      delete e.books;
      this.$store.dispatch('categories/setForm', e);
      this.isEdit = true;
    },
  },
};
</script>

<style scoped lang="scss">

</style>
