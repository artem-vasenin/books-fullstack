<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center">
        <h1>Авторы</h1>
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
              v-for="item in authors"
              :key="item.id"
              :item="item"
              @to="$router.push(`/authors/${$event}`)"
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
import ListItem from "../../components/authors/list/ListItem";
import AuthorForm from "../../components/authors/forms/Form";

export default {
  name: "AuthorsList",
  components: { AuthorForm, ListItem },
  async asyncData({store}) {
    const authors = await store.dispatch('authors/getList');
    return { authors };
  },
  data() {
    return {
      isEdit: false,
      authors: [],
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
      this.$store.dispatch('authors/setForm', e);
      this.isEdit = true;
    },
  },
};
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
