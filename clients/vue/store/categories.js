export const state = () => ({
  categories: [],
  category: null,
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  async getList({commit}) {
    // const authors = await this.$axios.$get('http://45.141.76.134:8000/api/author');
    // commit('setField', {name: 'authors', value: authors});
  },
  async getById({commit}, id) {
    // const author = await this.$axios.$get(`http://45.141.76.134:8000/api/author/${id}`);
    // commit('setField', {name: 'author', value: author});
  }
};

export const getters = {
  categories: state => state.categories,
  category: state => state.category,
};
