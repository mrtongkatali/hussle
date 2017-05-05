'use strict';

import User from 'services/auth'

const state = {
  isRegistration: false,
};

const getters = {
  isShowRegistration: state => state.isRegistration,
};

const actions = {
  showRegistrationForm: ({commit, state}, status) => commit('showRegistrationForm', status),
  async registerNewAccount ({commit, state}, params) {


    try {
      let user = await User.register(params)
      console.log("Registration successful", user)

    } catch (error) {
      console.log("Registration Failed")
    }
    commit('registerNewAccount', params)
  }
};

const mutations = {
  showRegistrationForm(state, status) {
    state.isRegistration = status
  },

  async registerNewAccount(params) {

  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
