export const state = () => ({
  user: null,
  token: null,
  loading: false,
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  /** Установка значения активности лоадера */
  setLoader({commit}, payload) {
    commit('setField', { name: 'loading', value: payload });
  },
  /** Экшин для отправки запросов на сервер */
  async ax({ state, dispatch, commit }, payload) {
    const { url, data, params, method } = payload;
    return new Promise((resolve, reject) => {
      state.token && this.$api.setToken(state.token, 'Bearer');
      payload.loading && commit('setField', { name: 'loading', value: true });
      this.$api[method](url, data || null, params ? { params } : null)
        .then(({data}) => {
          if (!data) reject(new Error('Ошибка получения данных'));
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          payload.loading && commit('setField', { name: 'loading', value: false });
        });
    });
  },
  async login({commit, dispatch}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dispatch('ax', {url: 'user/login', method: 'post', data: payload, loading: true});
        const { token, ...user } = result;
        commit('setField', {name: 'token', value: token});
        commit('setField', {name: 'user', value: user});
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
  async registration({commit, dispatch}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dispatch('ax', {url: 'user', method: 'post', data: payload, loading: true});
        const { token, ...user } = result;
        commit('setField', {name: 'token', value: token});
        commit('setField', {name: 'user', value: user});
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
  logout({commit}) {
    commit('setField', {name: 'token', value: null});
    commit('setField', {name: 'user', value: null});
  },
};

export const getters = {
  user: state => state.user,
  token: state => state.token,
  loading: state => state.loading,
};
