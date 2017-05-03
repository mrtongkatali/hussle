<template lang="pug", v-cloak>
  div.row.registration-form-component
    div.col.s12.m8.offset-m2.l8.offset-l2.card.reg-form
      h2.blue-text.center.huzz-title HU#[span.blue-text.text-lighten-3 ZZ]L
      h2.huzz-pronounce.center /ˈhʌs(ə)l/ - app that beats procrastination
      div.center
        div.card-content
          h5 Howdy, slacker! What's your name1?
          div.row
            div.input-field.col.l8.offset-l2
              input.validate.center(type="text", v-model="username",  @keyup.enter="createUser", placeholder="Enter your name here")
          div.row
            div.col.l8.offset-l2
              button.blue.waves-effect.waves-light.btn(v-on:click="createUser") Let's Go!
</template>

<script>
  export default {
    name: 'registration-form',
    props: ['username'],
    data() {
      return {
        pageTitle: "This is the registration form page"
      }
    },
    methods: {},
  }
</script>
