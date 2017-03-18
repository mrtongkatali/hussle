'use strict';

//- Import our own sass file
import 'assets/style.scss';

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js';
import 'npm/materialize-css/sass/materialize.scss';

import Vue from 'vue';
import App from './main.vue';
import store from './store/index';

let app = new Vue({
  el: '#root',
  store,
  render: h => h(App),
});
