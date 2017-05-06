'use strict';

//- Import our own sass file
import 'assets/style.scss'

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js'
import 'npm/materialize-css/sass/materialize.scss'
import 'npm/material-design-icons/iconfont/material-icons.css'

import App from './main.vue'
import Home from './components/home/home.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
import sockets from './sockets'

import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://localhost:3000', store)
Vue.use(VueRouter)
Vue.use(VTooltip)


const router = new VueRouter({
  mode:'history',
  routes: [
    { path: '', component: Home }
  ]
});

let app = new Vue({
  sockets,
  router,
  el: '#root',
  store,
  render: h => h(App)
})
