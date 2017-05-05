'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import createPersist, { createStorage } from 'vuex-localstorage'

import * as actions from './actions'
import * as getters from './getters'

import users from './modules/user'
import task from './modules/task'
import home from './modules/home'

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    home,
    users,
    task
  },
  // plugins: [createPersist({
  //   namespace: '_huzzl_',
  //   initialState: {},
  //   // ONE DAY
  //   expires: 1 * 24 * 60 * 60 * 1e3
  // })]
})
