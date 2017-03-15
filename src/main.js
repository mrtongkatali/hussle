'use strict';

import Vue from 'vue';
import App from './main.vue';
import 'assets/style.scss';
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
  render: h => h(App)
});
