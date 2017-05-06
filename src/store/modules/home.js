'use strict';

const state = {
  isRegistration: false,
};

const getters = {
  isShowRegistration: state => state.isRegistration,
};

const actions = {
  showRegistrationForm: ({commit, state}, status) => commit('showRegistrationForm', status),
};

const mutations = {
  showRegistrationForm(state, status) {
    state.isRegistration = status
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
