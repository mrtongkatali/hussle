<template lang="pug", v-cloak>
  div.row.nav-component(v-if="user.info")
    div(class="s12 l12")
      nav.navigation
        div.container
          div.nav-wrapper
            a.brand-logo() Huzzl

            ul#nav-mobile.right.hide-on-med-and-down
              li: a() Hi, {{ user.info.first_name }}
              li: a(@click="logout") Sign Out
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import UserService from 'services/auth.service'

  export default {
    name: 'header-nav',
    computed: mapGetters({
      user: 'getUserInfo',
    }),
    methods: {
      async logout() {
        //this.$socket.emit('_SOCK_LOGOUT', this.user.username);

        try {
          
          let user = await UserService.logout({
            user_id: this.user.info.id,
            expires: this.user.expires
          })

          //- Resets the localStorage
          this.clearLocalStorage();
          
          this.$router.push("/login")

          if(!user.isSuccessful) { console.log("[Debug] ", error) }

        } catch (error) {
          console.log("[Debug] onLogout", error)
        }

      },

      onLogoutError(error) {
        console.log("[Debug] onLogout", error)
      }
    },
    created: function() {
      //this.$socket.emit('mapCurrentSession', this.user.username);
    }
  }
</script>