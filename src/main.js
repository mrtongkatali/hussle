'use strict';

//- Import our own sass file
import 'assets/style.scss'

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js';
import 'npm/materialize-css/sass/materialize.scss';

import App from './main.vue'
import About from './components/about.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'
import sockets from './sockets'

import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://localhost:3000', store)
Vue.use(VueRouter);

const router = new VueRouter({
  mode:'history',
  routes: [
    {path: '/reg/:username', component: About, props: true},
    {path: '/reg', component: About}
  ]
});


let app = new Vue({
  sockets,
  router,
  el: '#root',
  store,
  render: h => h(App),
})
