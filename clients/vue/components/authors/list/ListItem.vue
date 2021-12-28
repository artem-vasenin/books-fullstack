<template>
  <v-list-item @click="$emit('to', item.id)">
    <v-list-item-icon>
      <v-icon v-text="'mdi-account'"></v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-text="`${item.lastName} ${item.firstName} ${item.middleName}`"></v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon v-show="user">
      <v-btn icon color="warning" @click.stop="$emit('edit', item)">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-list-item-icon>
    <v-list-item-icon v-show="user">
      <v-btn icon color="error" @click.stop="$emit('delete', item.id)">
        <v-icon>mdi-delete-forever-outline</v-icon>
      </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: "AuthorListItem",
  props: {
    item: Object,
  },
  computed: {
    user() { return this.$store.getters['user'] || null; }
  },
};
</script>

<style scoped>

</style>
