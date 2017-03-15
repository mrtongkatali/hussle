<template lang="pug">
  div
    div(v-if="!hasSession")
      h3 Howdy, What's your name?
      input(type="text", v-model="username")
      button.waves-effect.waves-light.btn(v-on:click="createUser") Let's Go!

    div(v-if="hasSession")
      h3 Hello, {{ username }}
      a(v-on:click="logout") Logout
</template>


<script>
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
        let profile  = {
          "username": this.username
        };

        this.$localStorage.set('user', profile);
        this.hasSession = true;
      },

      /*
       * Clear localstorage data
      */
      logout: function() {
        this.username = undefined;
        this.$localStorage.remove('user');
        this.hasSession = false;
      }

    },

    mounted() {

      //- Fetch existing local data when this component has been initialized
      let session = this.$localStorage.get('user')
      
      this.hasSession = (!_.isEmpty(session.username) && !_.isUndefined(session.username) ? true : false);

      if(this.hasSession) this.username = session.username;

    }

  }
</script>
