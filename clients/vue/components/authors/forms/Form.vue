<template>
  <transition name="fade">
    <v-row v-show="isEdit">
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-text-field
            v-model.trim="author.lastName"
            name="lastName"
            :rules="[rules.require]"
            label="Фамилия"
            required
          ></v-text-field>
          <v-text-field
            v-model.trim="author.firstName"
            name="firstName"
            :rules="[rules.require]"
            label="Имя"
            required
          ></v-text-field>
          <v-text-field
            v-model.trim="author.middleName"
            name="middleName"
            :rules="[rules.require]"
            label="Отчество"
            required
          ></v-text-field>
          <v-textarea
            v-model.trim="author.description"
            name="description"
            label="Описание"
            required
          ></v-textarea>
          <v-text-field
            v-model.trim="author.image"
            name="image"
            :rules="[rules.require]"
            label="Ссылка на фото"
            required
          ></v-text-field>
          <v-row>
            <v-spacer/>
            <v-col align="right">
              <v-btn
                @click="submit"
                color="primary"
                :disabled="!valid || hasEmptyField"
              >Добавить автора</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </transition>
</template>

<script>
export default {
  name: "AuthorForm",
  props: { isEdit: Boolean },
  data() {
    return {
      valid: false,
      author: { ...this.$props.form },
      rules: {
        require: value => !!value && !!value.trim() || 'Поле обязательно для заполнения',
      }
    };
  },
  computed: {
    hasEmptyField() {
      return !(this.author.lastName && this.author.firstName && this.author.middleName
        && this.author.image && this.author.description);
    },
    form() {
      const form = this.$store.getters['authors/form'];
      if (form) {
        this.author = { ...form };
      }
      return form;
    },
  },
  methods: {
    /** Отправка данных на сервер */
    async submit() {
      this.$emit('submit', this.author);
      this.$refs.form.reset()
    },
  },
  updated() {
    if (this.$props.isEdit === false) {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped lang="scss">
.fade {
  &-enter-active {
    transition: all .3s ease;
  }
  &-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  &-enter, &-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
