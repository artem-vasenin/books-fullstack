<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3" xl="4" offset-xl="4">
        <h1>Регистрация</h1>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-text-field
            v-model="nickname"
            :rules="[rules.require]"
            label="Ник"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.require, rules.email]"
            label="Логин"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.require, rules.min]"
            type="password"
            class="mb-5"
            :counter="10"
            label="Пароль"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <nuxt-link to="/auth/login" color="btn primary">
                Вход
              </nuxt-link>
            </v-col>
            <v-col align="right">
              <v-btn
                @click="submit"
                color="primary"
                :disabled="!valid || hasEmptyField"
              >Зарегистрироваться</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "registration",
  middleware: ['auth'],
  data() {
    return {
      email: '',
      password: '',
      nickname: '',
      valid: false,
      rules: {
        require: value => !!value.trim() || 'Поле обязательно для заполнения',
        min: value => value.trim().length >= 3 || 'Пароль должен быть длиннее 6 символов',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Поле e-mail не валидно'
        },
      }
    };
  },
  computed: {
    hasEmptyField() {
      return !(this.email.trim() && this.nickname.trim() && this.password.trim());
    }
  },
  methods: {
    /** Очистка полей формы */
    clearForm() {
      this.email = '';
      this.password = '';
      this.nickname = '';
    },
    /** Отправка данных на сервер */
    async submit() {
      await this.$store.dispatch('registration', {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.clearForm();
        this.$router.push('/');
      })
      .catch((e) => {
        console.error(e.message);
      });
    },
  },
};
</script>
