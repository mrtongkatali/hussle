<template lang="pug", v-cloak>
  div.row.nav-component
    div(class="s12 l12")
      nav.navigation
        div.container
          div.nav-wrapper
            a.brand-logo() Huzzl

            ul#nav-mobile.right.hide-on-med-and-down
              li: a() Hi, {{ user.username }}
              li: a(@click="logout") Sign Out
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'header-nav',
    computed: mapGetters({
      user: 'getUserInfo',
    }),
    methods: mapActions([
      'logout'
    ])
  }
</script>
