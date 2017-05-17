'use strict';

import axios from 'axios'

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

    axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`
  },
  removeUserSession(state, payload) {
    state.user    = {}
  
    delete axios.defaults.headers.common["Authorization"]
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
