<template lang="pug">
  div#app
      div.header(v-if="hasUserData")
        header-nav(v-on:signOut="onSignOut")
      div.container
        howdy(v-if="!hasUserData", v-on:createUser="onCreateUser")
        tasks(v-if="hasUserData")
</template>

<script>
  import Howdy from './components/Howdy.vue';
  import Tasks from './components/Tasks.vue';
  import HeaderNav from './components/HeaderNav.vue';

  export default {
    name: 'app',
    data() {
      return {
        hasUserData: false,
        user: undefined,
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
    },
    created: function() {
      //- Fetch existing local data when this component has been initialized
      let session = this.$localStorage.get('user')
      this.hasUserData = (!_.isEmpty(session.username) && !_.isUndefined(session.username) ? true : false);
      if(this.hasSession) this.username = session.username;

    },
    components: {
      Howdy,
      Tasks,
      HeaderNav
    },
    mounted() {
    }
  }
</script>
