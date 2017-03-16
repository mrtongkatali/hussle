<template lang="pug", v-cloak>
  div
    div(v-if="!hasSession")
      h3 Howdy, Slacker! What's your name?
      input(type="text", v-model="username",  @keyup.enter="submit")
      button.waves-effect.waves-light.btn(v-on:click="createUser") Let's Go!

    div(v-if="hasSession")
      h3 Hello, {{ username }}
      a(v-on:click="logout") Logout
</template>


<script>

  import Tasks from './Tasks.vue';

  export default {
    name: 'howdy',
    data () {
      return {
        username: "",
        hasSession: "false",
      }
    },
    methods: {

      /*
       * Register user
      */
      createUser: function() {
        this.hasSession = true;

        // When user is created, emit event to update the global user session flag
        this.$emit('createUser', {
          "username": this.username
        });
      },

      /*
       * Clear localstorage data
      */
      logout: function() {
        this.username   = undefined;
        this.hasSession = false;

        // When user signs out, emit event to update the global user session flag
        this.$emit('signOut',{});
      }

    },

    created() {

      //- Fetch existing local data when this component has been initialized
      let session = this.$localStorage.get('user')

      this.hasSession = (!_.isEmpty(session.username) && !_.isUndefined(session.username) ? true : false);

      if(this.hasSession) this.username = session.username;

    }

  }
</script>
