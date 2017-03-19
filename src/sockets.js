'use strict';

export default {
  connect: function() {
    console.log('Connected to socketio.');
  },
  _SOCK_LOGOUT: function() {
    this.$store.dispatch('logout');
  },
  _SOCK_UPDATE_TASK_LIST: function(taskList) {
    this.$store.dispatch('refreshTaskList', taskList);
  }
};
