'use strict';

//- Import our own sass file
import 'assets/style.scss'

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js'
import 'npm/materialize-css/sass/materialize.scss'
import 'npm/material-design-icons/iconfont/material-icons.css'

import App from './main.vue'
import Vue from 'vue'

import router from './routers'
import store from './store'
import sockets from './sockets'
import config from './config'

import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io'

// define a mixin object
var myMixin = {
  created: function () {
    //this.hello1()
  },
  methods: {
    hello1: function () {
      console.log('hello from mixin!')
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
