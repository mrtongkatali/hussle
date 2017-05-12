<template lang="pug", v-cloak>
  div.row.home-component

    div.col.s12.m8.offset-m2.l8.offset-l2.card.reg-form
      div.signin(v-if="!showRegistration")
        h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
        h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
        div.center
          div.card-content.form
            h5 Howdy, Slacker!

            label.warning-msg.error(v-if="loginCallback") {{ loginCallback }}

            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center(type="text", v-model="username",  @keyup.enter="signIn", placeholder="Email address")
            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center(type="password", v-model="password",  @keyup.enter="signIn", placeholder="Password")
            div.row
              div.col.l8.offset-l2
                button.blue.waves-effect.waves-light.btn(v-on:click="signIn", :disabled="signingIn")
                  span Sign In
                  spinner.btn-loading(size="tiny", v-if="signingIn")

            div.row.create-account
              div.col.l8.offset-l2
                button.red.lighten-1.waves-effect.waves-light.btn(v-on:click="showRegistrationForm", :disabled="signingIn") Create an account
                
      div.registration(v-if="showRegistration")
        registration-form
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import RegistrationForm from './registration-form.vue'
  import UserService from 'services/auth'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'home',
    data () {
      return {
        username: "",
        password: "",
        loginCallback: "",
        signingIn: false
      }
    },
    methods: {
      async signIn() {

        if(_.isEmpty(this.username) || _.isEmpty(this.password) ) {
          this.onLoginError("Please enter your email address and password.")
          return
        }

        try {

          this.signingIn = true;

          let params = {
            "username" : this.username,
            "password" : this.password
          }

          let user = await UserService.login(params)

          //- Initialize user and save to details to localstore
          this.$store.dispatch('initializeUser', { 
            "token"   : user.result.token,
            "user"    : user.result.user,
            "expires" : user.result.expires
          })

          if (user.isSuccessful) {

            // if the huzzle.com/login?redirect=/task exists in the url params, redirect on that url else default : tasks
            let url = (this.$route.query.redirect ? this.$route.query.redirect : '/tasks')
            this.$router.push(url)

          } else {
            this.onLoginError(user.message)
          }

        } catch(error) {

          console.log("Internal ERROR", error)
          this.onLoginError("Internal server error. Please try again")
        }
        
      },

      showRegistrationForm() {
        this.$store.dispatch('showRegistrationForm', true)
      },

      onLoginSuccess(message) {
        this.signingIn      = false
        this.loginCallback  = message
      },

      onLoginError(error) {
        console.log("ERR", error)
          
        this.signingIn      = false
        this.loginCallback  = error
      }
    },
    computed: mapGetters({
      showRegistration: 'isShowRegistration'
    }),
    components: {
      RegistrationForm,
      Spinner
    }
  }
</script>
