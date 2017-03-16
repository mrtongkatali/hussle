<template lang="pug">
  .container#app
      howdy(v-on:signOut="onSignOut", v-on:createUser="onCreateUser")
      tasks(v-if="hasUserData")
</template>

<script>
  import Howdy from './components/Howdy.vue';
  import Tasks from './components/Tasks.vue';

  export default {
    name: 'app',
    data() {
      return {
        hasUserData: false,
        user: undefined,
        opened1: false
      }
    },
    methods: {
      onSignOut: function() {
        this.$localStorage.remove('user');
        this.hasUserData = false;
      },
      onCreateUser: function(profile) {
        this.$localStorage.set('user', profile);
        this.hasUserData = true;
      },
      open1: function() {
        $('#modal1').modal('open');
      }
    },
    created: function() {
      //- Fetch existing local data when this component has been initialized
      let session = this.$localStorage.get('user')
      this.hasUserData = (!_.isEmpty(session.username) && !_.isUndefined(session.username) ? true : false);
      if(this.hasSession) this.username = session.username;

    },
    components: {
      Howdy,
      Tasks
    },
    mounted() {
      $(document).ready(function(){
        //$('.modal').modal();
        //$('.collapsible').collapsible();
      });
    }
  }
</script>
