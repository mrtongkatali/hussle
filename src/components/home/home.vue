<template lang="pug", v-cloak>
  div.row.home-component

    div.col.s12.m8.offset-m2.l8.offset-l2.card.reg-form
      div.signin(v-if="!showRegistration")
        h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
        h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
        div.center
          div.card-content.form
            h5 Howdy, Slacker!
            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center(type="text", v-model="username",  @keyup.enter="createUser", placeholder="Email address")
            div.row
              div.input-field.col.l8.offset-l2
                input.validate.center(type="password", v-model="password",  @keyup.enter="createUser", placeholder="Password")
            div.row
              div.col.l8.offset-l2
                button.blue.waves-effect.waves-light.btn(v-on:click="signIn") Sign In
            div.row.create-account
              div.col.l8.offset-l2
                button.red.lighten-1.waves-effect.waves-light.btn(v-on:click="showRegistrationForm") Create an account
                
      div.registration(v-if="showRegistration")
        registration-form
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';
  import RegistrationForm from './registration-form.vue'

  export default {
    name: 'home',
    data () {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      signIn() {
        alert("Sign In")
      },

      showRegistrationForm() {
        this.$store.dispatch('showRegistrationForm', true)
      }
    },
    computed: mapGetters({
      showRegistration: 'isShowRegistration'
    }),
    components: {
      RegistrationForm
    }
  }
</script>
