export const state = () => ({
  user: null,
  token: null,
});

export const mutations = {
  setField(state, payload) {
    state[payload.name] = payload.value;
  }
};

export const actions = {
  async login({commit}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.$axios.$post('http://45.141.76.134:8000/api/user/login', payload);
        const { token, ...user } = result;
        commit('setField', {name: 'token', value: token});
        commit('setField', {name: 'user', value: user});
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
  async registration({commit}, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.$axios.$post('http://45.141.76.134:8000/api/user', payload);
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
};
