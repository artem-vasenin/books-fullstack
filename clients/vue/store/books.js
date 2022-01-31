export const state = () => ({
  books: [],
  book: null,
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  async getList({commit, dispatch}) {
    const books = await dispatch('ax', {
      url: 'book',
      method: 'get',
      loading: true,
    }, {root: true});
    commit('setField', {name: 'books', value: books});
    return books;
  },
  async getById({commit, dispatch}, alias) {
    const book = await dispatch('ax', {
      url: `book/${alias}`,
      method: 'get',
      loading: true,
    }, {root: true});
    commit('setField', {name: 'book', value: book});
    return book;
  }
};

export const getters = {
  books: state => state.books,
  book: state => state.book,
};
