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
  async getList({commit, dispatch}) {
    const categories = await dispatch('ax', {
      url: 'category',
      method: 'get',
      loading: true
    }, {root: true});
    commit('setField', {name: 'categories', value: categories});
    return categories;
  },
  async getById({commit, dispatch}, alias) {
    const category = await dispatch('ax', {
      url: `category/${alias}`,
      method: 'get',
      loading: true
    }, {root: true});
    commit('setField', {name: 'category', value: category});
    return category
  }
};

export const getters = {
  categories: state => state.categories,
  category: state => state.category,
};
