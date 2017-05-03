<template lang="pug", v-cloak>
  div.row.home-component

    div.col.s12.m8.offset-m2.l8.offset-l2.card.reg-form
      div.signin(v-if="!isRegistration")
        h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
        h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
        div.center
          div.card-content
            h5 Howdy, Slacker!
            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center.txt-username(type="text", v-model="username",  @keyup.enter="createUser", placeholder="Email address")
            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center.txt-password(type="password", v-model="password",  @keyup.enter="createUser", placeholder="Password")
            div.row
              div.col.l8.offset-l2
                button.blue.waves-effect.waves-light.btn(v-on:click="signIn") Sign In
            div.row.create-account
              div.col.l8.offset-l2
                button.red.lighten-1.waves-effect.waves-light.btn(v-on:click="isRegistration = true") Create an account
                
      div.registration(v-if="isRegistration")
        h3 this is where the registration form will show
</template>


<script>
  export default {
    name: 'home',
    data () {
      return {
        username: "",
        password: "",
        isRegistration: false
      }
    },
    methods: {
      /*
       * Register user
      */
      createUser: function() {

        if(!_.isEmpty(this.username.trim())) {

          this.$store.dispatch('registerNewUser', { username: this.username }).then(() => {
            this.$socket.emit('_SOCK_REGISTER_USER', this.username);
          });

        } else {
          alert('Hey! Don\'t miss it! I\'ts just a one field.');
        }
      },

      signIn: function() {
        alert("Sign In")
      }
    },

  }
</script>
