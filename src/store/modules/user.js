'use strict';

const state = {
  user: {}
};

const getters = {
  getUserInfo: state => state.user,
};

const actions = {
  registerNewUser: ({ commit, state }, obj) => commit('createUser', obj),
  logout: ({commit, state}) => commit('removeUserSession')
};

const mutations = {
  createUser(state, payload) {
    state.user = {
      token : payload.token,
      info  : payload.user 
    }
  },
  removeUserSession(state, payload) {
    state.user = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
