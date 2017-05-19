'use strict';

const state = {
  user: {}
};

const getters = {
  getUserInfo: state => state.user,
  getHeaders: state => state.headers
};

const actions = {
  initializeUser: ({ commit, state }, obj) => commit('initializeUser', obj),
  logout: ({commit, state}) => commit('removeUserSession')
};

const mutations = {
  initializeUser(state, payload) {
    state.user = {
      expires : payload.expires,
      token   : payload.token,
      info    : payload.user 
    }
  },
  removeUserSession(state, payload) {
    state.user = {}
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
