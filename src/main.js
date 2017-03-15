'use strict';

Vue.component('task',{
  template: `
    <div>
      <h3>Another View Component</h3>
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
        ]
      }
  }

});

let app = new Vue({
  el: '#root',
  data: {
    test_title: "Testing title from js",
    username: "test"
  },
  methods: {
    add: function(event) {
      alert(this.username + " " + event);
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
