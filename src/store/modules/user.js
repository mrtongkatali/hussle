'use strict';

const state = {
  user: {
    hasSession: false,
  },
};

const getters = {
  getUserInfo: state => state.user,
  hasSession: state => state.user.hasSession
};

const actions = {
  registerNewUser: ({ commit, state }, obj) => commit('createUser', obj),
  logout: ({commit, state}) => commit('removeUserSession')
};

const mutations = {
  createUser(state, payload) {
    state.user = {
      username: payload.username,
      hasSession: true
    };
  },
  removeUserSession(state, payload) {
    state.user = {
      username: "",
      hasSession: false
    };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
