'use strict';

import Vue from 'vue';
import App from './main.vue';
import 'assets/style.scss';

// Vue.component('', {
//   data() {
//       return {
//         opened1: false
//       };
//   },
//   methods: {
//     close1: () => {
//       this.opened1 = false;
//     }
//   },
//
// });
//
// let app = new Vue({
//   el: '#root',
//   data: {
//     opened1: "works!"
//   },
//   methods: {
//     add: function(event) {
//       this.$emit('testEmit');
//     },
//     close1: function() {
//       this.opened1 = false;
//     }
//   },
//
//   computed: {
//     reversedMessage: function() {
//       return "computed";
//     }
//   },
//
// });


let app = new Vue({
  el: '#root',
  render: h => h(App)
});
