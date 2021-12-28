<template>
  <v-app>
    <v-app-bar fixed app>
      <nuxt-link exact to="/" class="menu-link" active-class="active">
        <v-toolbar-title v-text="'Библиотека'" class="mr-10"/>
      </nuxt-link>
      <nuxt-link no-prefetch to="/categories" class="menu-link" active-class="active">Категории</nuxt-link>
      <nuxt-link no-prefetch to="/authors" class="ml-6 menu-link" active-class="active">Авторы</nuxt-link>
      <nuxt-link no-prefetch to="/books" class="ml-6 menu-link" active-class="active">Книги</nuxt-link>
      <v-spacer />
      <nuxt-link v-if="!user" no-prefetch to="/auth/login" class="ml-6 menu-link" active-class="active">Вход</nuxt-link>
      <a v-else class="ml-6 menu-link" @click.prevent="logout">Выход</a>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      title: 'Vuetify.js'
    }
  },
  computed: {
    user() { return this.$store.getters.user || null; },
  },
  methods: {
    logout() { this.$store.dispatch('logout'); },
  }
}
</script>

<style scoped lang="scss">
  .menu-link {
    text-decoration: none;
    color: #777;
    transition: color .3s ease;

    &:hover,
    &.active {
      color: black;
      transition: color .3s ease;
    }
  }
</style>
