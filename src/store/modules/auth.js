'use strict';

const state = {
  user: {},
  headers: {
    "Content-type"  : "application/json",
    "Cache-Control" : "no-cache"
  }
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

    let authorizationHeader = {
      "Authorization" : `Bearer ${payload.token}`
    }

    state.headers = _.assign(authorizationHeader, state.headers)
  },
  removeUserSession(state, payload) {
    state.user    = {}
    state.headers = {
      "Content-type"  : "application/json",
      "Cache-Control" : "no-cache"
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
