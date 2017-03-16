'use strict';

//- Import our own sass file
import 'assets/style.scss';

//- Import materialize assets
import 'npm/materialize-css/bin/materialize.js';
import 'npm/materialize-css/sass/materialize.scss';

import Vue from 'vue';
import App from './main.vue';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

let localStorageObject = {
  user: {
    type: Object,
    default: {
      profile: {},
    }
  }
};

let app = new Vue({
  el: '#root',
  localStorage: localStorageObject,
  render: h => h(App),
});
