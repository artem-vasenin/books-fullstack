export const state = () => ({
  user: null,
  token: null,
  loading: [],
  snackbar: null,
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  /** Установка значения активности лоадера */
  setLoader({commit, state}, payload) {
    if (payload.status) {
      const value = !state.loading.includes(payload.id) ? [...state.loading, payload.id] : state.loading;
      commit('setField', { name: 'loading', value });
      console.log('loading', state.loading);
    } else {
      const value = state.loading.filter(l => l !== payload.id);
      commit('setField', { name: 'loading', value });
      console.log('loading', state.loading);
    }
  },
  /** Установка извещения */
  setSnackbar({commit}, payload) {
    commit('setField', { name: 'snackbar', value: payload });
  },
  /** Показ сообщения об ошибке */
  showErrorMessage({dispatch}, content) {
    dispatch('setSnackbar', { timeout: 6000, type: 'error', content });
    setTimeout(() => { dispatch('setSnackbar', null); }, 6000);
  },
  /** Показ сообщения об успехе */
  showSuccessMessage({dispatch}, content) {
    dispatch('setSnackbar', { timeout: 6000, type: 'success', content });
    setTimeout(() => { dispatch('setSnackbar', null); }, 6000);
  },
  /** Экшин для отправки запросов на сервер */
  async ax({ state, dispatch, commit }, payload) {
    const { url, data, params, method } = payload;
    const id = (Date.now() + Math.floor(Math.random() * 999)).toString();
    return new Promise((resolve, reject) => {
      state.token && this.$api.setToken(state.token, 'Bearer');
      payload.loading && dispatch('setLoader', { id, status: true });
      this.$api[method](url, data || null, params ? { params } : null)
        .then(({data}) => {
          if (!data) reject(new Error('Ошибка получения данных'));
          resolve(data);
        })
        .catch((e) => {
          dispatch('showErrorMessage', e);
          reject(e);
        })
        .finally(() => {
          payload.loading && dispatch('setLoader', { id, status: false });
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
  loading: state => state.loading && state.loading.length,
  snackbar(state) { return state.snackbar; },
};
