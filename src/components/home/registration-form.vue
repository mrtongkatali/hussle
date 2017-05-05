<template lang="pug", v-cloak>
  div.row
    h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
    h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
    div.center
      div.card-content.form
        h5 Account Registration
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
            button.blue.waves-effect.waves-light.btn(v-on:click="registerNewAccount") Create an account
        div.row.create-account
          div.col.l8.offset-l2
            button.red.lighten-1.waves-effect.waves-light.btn(v-on:click="showSignIn") Sign In
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';


  export default {
    name: 'registration-form',
    data() {
      return {
        isInitialize: false,
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
      registerNewAccount() {

        // if(!_.isEmpty(this.username.trim())) {

        //   this.$store.dispatch('registerNewUser', { username: this.username }).then(() => {
        //     this.$socket.emit('_SOCK_REGISTER_USER', this.username);
        //   });

        // } else {
        //   alert('Hey! Don\'t miss it! I\'ts just a one field.');
        // }

        this.isInitialize = true;

        let params = {
          "first_name": this.firstname,
          "last_name": this.lastname,
          "email_address": this.username,
          "password": this.password,
          "status": 1
        }

        this.$store.dispatch('registerNewAccount', params)

      },

      showSignIn() {

        this.isInitialize = false

        this.$store.dispatch('showRegistrationForm', false)
      },

      validateFirstname() {  
        return _.isEmpty(this.firstname) && this.isInitialize
      },
      validateLastname() {
        return _.isEmpty(this.lastname) && this.isInitialize
      },
      validateEmail() {
        return _.isEmpty(this.username)&& this.isInitialize
      },
      validatePassword() {
        return _.isEmpty(this.password)&& this.isInitialize
      }
    },

    computed: {
      isFirstnameValid() { return this.validateFirstname() },
      isLastNameValid() { return this.validateLastname() },
      isEmailAddressValid() { return this.validateEmail() },
      isPasswordValid() { return this.validatePassword() }
    }
  }
</script>
