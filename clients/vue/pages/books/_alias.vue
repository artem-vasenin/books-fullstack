<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Book {{$route.params.alias}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Book"
};
</script>

<style scoped>

</style>
