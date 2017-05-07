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

import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io'

const sample_config = {
  foo : "bar",
  bar : "foo"
}

Vue.config.huzzl = sample_config

Vue.use(VueSocketio, 'http://localhost:3000', store)
Vue.use(VTooltip)

let app = new Vue({
  sockets,
  router,
  el: '#root',
  store,
  render: h => h(App)
})
