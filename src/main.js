'use strict';

import Vue from 'vue';

Vue.component('task', {
  props: ['title','body'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <ul>
        <li v-for="name in items"> {{ name.title }}</li>
      </ul>
    </div>
  `,

  data() {
      return {
        items: [
          {id: 1, title: "Leo Diaz"},
          {id: 2, title: "Olive Diaz"},
          {id: 1, title: "Lexandra Diaz"}
        ],
      };
  },

  methods: {
    hideTest: function() {

    }
  }

});

let app = new Vue({
  el: '#root',
  data: {
    test_title: "Testing title from js",
    username: "test",
    isVisible: true,
  },
  methods: {
    add: function(event) {
      //alert(this.username + " " + event);
      //this.isVisible = false;

      this.$emit('testEmit');
    }
  },

  computed: {
    reversedMessage: function() {
      return "computed";
    }
  },

  mounted() {

  },

});

app.$on('testEmit',() => {
  alert(1);
});
