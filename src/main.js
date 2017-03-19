'use strict';

//- Import our own sass file
import 'assets/style.scss';

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js';
import 'npm/materialize-css/sass/materialize.scss';

import Vue from 'vue';
import App from './main.vue';
import store from './store/index';
import sockets from './sockets';

import VueSocketio from 'vue-socket.io';

Vue.use(VueSocketio, 'http://localhost:3000', store);

let app = new Vue({
  sockets,
  el: '#root',
  store,
  render: h => h(App),
});
