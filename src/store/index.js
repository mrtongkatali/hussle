'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import createPersist, { createStorage } from 'vuex-localstorage'

import * as actions from './actions'
import * as getters from './getters'

import auth from './modules/auth'
import task from './modules/task'
import home from './modules/home'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    home,
    task
  },
  plugins: [createPersist({
    namespace: '_huzzl_',
    initialState: {},
    // ONE DAY in millisec
    expires: 86400000
  })]
})
