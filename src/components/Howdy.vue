<template lang="pug", v-cloak>
  div.row.howdy-component
    div.col.s12.m8.offset-m2.l8.offset-l2.card.reg-form
      h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
      h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
      form.center
        div.card-content
          h5 Howdy, slacker! What's your name?
          div.row
            div.input-field.col.l8.offset-l2
              input.validate.center(type="text", v-model="username",  @keyup.enter="submit", placeholder="Enter your name here")
          div.row
            div.col.l8.offset-l2
              button.waves-effect.waves-light.btn(v-on:click="createUser") Let's Go!
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

        if(!_.isEmpty(this.username)) {
          this.hasSession = true;

          // When user is created, emit event to update the global user session flag
          this.$emit('createUser', {
            "username": this.username
          });
        } else {
          alert('Hey! Don\'t miss it! I\'ts just a one field.');
        }

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
