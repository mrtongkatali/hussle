'use strict';

//- Import our own sass file
import 'assets/style.scss'

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js'
import 'npm/materialize-css/sass/materialize.scss'
import 'npm/material-design-icons/iconfont/material-icons.css'

//- Custom
import 'npm/materialize-css/js/collapsible'

import App from './main.vue'
import Vue from 'vue'

import router from './routers'
import store from './store'
import sockets from './sockets'
import config from './config'
import interceptor from './config/axios-interceptor'

import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io'

// Global mixin object
var myMixin = {
  methods: {
    hello1: function () {
      console.log('hello from mixin!')
    },
    clearLocalStorage: function() {
      this.$store.dispatch('logout');
      this.$store.dispatch('clearTaskItems');
    }
  }
}

Vue.mixin(myMixin)

Vue.use(VueSocketio, config.SOCKET_SERVER_URL, store)
Vue.use(VTooltip)

let app = new Vue({
  sockets,
  router,
  el: '#root',
  store,
  render: h => h(App)
})
