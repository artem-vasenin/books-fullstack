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
  async getList({commit, dispatch}) {
    const authors = await dispatch('ax', {
      url: 'author',
      method: 'get',
      loading: true,
    }, {root: true});
    commit('setField', {name: 'authors', value: authors});
    return authors;
  },
  async getById({commit, dispatch}, id) {
    const author = await dispatch('ax', {
      url: `author/${id}`,
      method: 'get',
      loading: true,
    }, {root: true});
    commit('setField', {name: 'author', value: author});
    return author;
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
