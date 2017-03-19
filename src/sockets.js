'use strict';

export default {
  connect: function() {
    console.log('Connected to socketio.');
  },
  _SOCK_LOGOUT: function() {
    this.$store.dispatch('logout');
  }
};
