<template lang="pug", v-cloak>
  div.row
    h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
    h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
    div.center
      div.card-content.form
        h5 Account Registration

        label.warning-msg.error(v-if="errorCallback") {{ errorCallback }}
        label.warning-msg.success(v-if="successCallBack") {{ successCallBack }}

        div.row
          div.input-field.col.s4.offset-l2
            input.validate.center(type="text", v-model="firstname",  @keyup.enter="registerNewAccount", placeholder="Firstname", v-tooltip.left-top="{ content: 'ex. John'}", v-bind:class="{ 'field-error': isFirstnameValid }")
          div.input-field.col.s4
            input.validate.center(type="text", v-model="lastname",  @keyup.enter="registerNewAccount", placeholder="Lastname", v-tooltip.right-top="{ content: 'ex. Doe'}", v-bind:class="{ 'field-error': isLastNameValid }")
        div.row
          div.input-field.col.l8.offset-l2
            input.validate.center(type="text", v-model="username",  @keyup.enter="registerNewAccount", placeholder="Email address", v-tooltip.top-center="{ content: 'ex. rocker21@yourmail.com'}", v-bind:class="{ 'field-error': isEmailAddressValid }")
        div.row
          div.input-field.col.l8.offset-l2
            input.validate.center(type="password", v-model="password",  @keyup.enter="registerNewAccount", placeholder="Password", v-tooltip.top-center="{ content: 'Your strong password must contain atleast a number, uppercase and special characters. Minimum of 8 characters.'}", v-bind:class="{ 'field-error': isPasswordValid }")
        div.row
          div.col.l8.offset-l2
            
            button.blue.waves-effect.waves-light.btn(v-on:click="registerNewAccount", :disabled="isCreatingAccount") 
              span Create an account
              spinner.btn-loading(size="tiny", v-if="isCreatingAccount")
              
        div.row.create-account
          div.col.l8.offset-l2
            button.red.lighten-1.waves-effect.waves-light.btn(v-on:click="showSignIn") Sign In
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';
  import UserService from 'services/auth'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'registration-form',
    data() {
      return {
        isInitialize: false,
        isCreatingAccount: false,
        errorCallback: "",
        successCallBack: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
      }
    },
    methods: {
      /*
       * Register user
      */
      async registerNewAccount() {
        
        //this.$socket.emit('_SOCK_REGISTER_USER', this.username);

        this.isInitialize = true
        this.isCreatingAccount = true;

        this.successCallBack = ""
        this.errorCallback   = ""

        if ( !this.validateFirstname() && 
              !this.validateLastname() && 
              !this.validateEmail() && 
              !this.validatePassword()
        ) {
          
          let params = {
            "first_name"    : this.firstname,
            "last_name"     : this.lastname,
            "email_address" : this.username,
            "password"      : this.password,
            "status"        : 1
          }

          try {
            
            let user = await UserService.register(params)

            if(user.isSuccessful) {

              delete user.result.user.password

              //- Initialize user and save to details to localstore
              this.$store.dispatch('initializeUser', { 
                "token" : user.result.token,
                "user"  : user.result.user,
              })

              //- Hide the registration form
              this.$store.dispatch('showRegistrationForm', false)

              this.onRegistrationSuccess("Successfully created new account.")

              // if the huzzle.com/login?redirect=/task exists in the url params, redirect on that url else default : tasks
              let url = (this.$route.query.redirect ? this.$route.query.redirect : '/tasks')
              this.$router.push(url)

            } else {
              this.onRegistrationError(user.message)
            }

          } catch (error) {
            console.log("[Debug] onRegister", error)
            this.onRegistrationError("An error occured. Please try again.")
          }

        } else {
          console.log("[Debug] onRegister", error)
          this.onRegistrationError("Please fill-up all the required fields correctly.")
        }

      },

      showSignIn() {

        this.isInitialize     = false
        this.errorCallback    = ""
        this.successCallBack  = ""

        this.$store.dispatch('showRegistrationForm', false)
      },

      validateFirstname() {
        //- Return true if the firstname is blank
        return _.isEmpty(this.firstname)
      },
      validateLastname() {
        //- Return true if the lastname is blank
        return _.isEmpty(this.lastname)
      },
      validateEmail() {
        //- Return true if the email is invalid

        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return !reg.test(this.username)
      },
      validatePassword() {
        //- Return true if the password does not satisfy the condition

        let p = this.password
        let hasUpperCase = /[A-Z]/.test(p)
        let hasLowerCase = /[a-z]/.test(p)
        let hasSpecial   = /^[a-zA-Z0-9- ]*$/.test(p)
        let hasNumber    = /[0-9]/.test(p)

        return ( !hasUpperCase || !hasLowerCase || !hasSpecial == false || !hasNumber || _.isEmpty(p) )
      },
      onRegistrationError(message = "" ) {
        this.isCreatingAccount = false
        this.errorCallback     = message
      },
      onRegistrationSuccess(message = "") {
        this.isCreatingAccount  = false
        this.successCallBack    = message

        this.clearFields()
      },
      clearFields() {

        this.isInitialize = false

        this.firstname = ""
        this.lastname  = ""
        this.username  = ""
        this.password  = ""
      }
    },
    computed: {
      isFirstnameValid() { return this.validateFirstname() && this.isInitialize },
      isLastNameValid() { return this.validateLastname() && this.isInitialize },
      isEmailAddressValid() { return this.validateEmail() && this.isInitialize },
      isPasswordValid() { return this.validatePassword() && this.isInitialize }
    },
    components: {
      Spinner
    }
  }
</script>
