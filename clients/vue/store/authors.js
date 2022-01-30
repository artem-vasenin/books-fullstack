import { API_URL } from "../constants/constants";

export const state = () => ({
  authors: [],
  author: null,
  form: { lastName: '', firstName: '', middleName: '', image: '', description: '' },
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  async getList({commit}) {
    const authors = await this.$axios.$get(`${API_URL}author`);
    commit('setField', {name: 'authors', value: authors});
  },
  async getById({commit}, id) {
    const author = await this.$axios.$get(`${API_URL}author/${id}`);
    commit('setField', {name: 'author', value: author});
  },
  setForm({commit, dispatch}, form) {
    dispatch("clearForm");
    commit('setField', {name: 'form', value: form});
  },
  clearForm({commit}) {
    commit('setField', {name: 'form', value: { lastName: '', firstName: '', middleName: '', image: '', description: '' }});
  }
};

export const getters = {
  authors: state => state.authors,
  author: state => state.author,
  form: state => state.form,
};
