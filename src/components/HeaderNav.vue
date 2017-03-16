<template lang="pug", v-cloak>
  div.row.nav-component
    div(class="s12 l12")
      nav.navigation
        div.container
          div.nav-wrapper
            a.brand-logo() Huzzl

            ul#nav-mobile.right.hide-on-med-and-down
              li: a() Hi, {{ username }}
              li: a(@click="logout") Sign Out
</template>

<script>
  export default {
    name: 'header-nav',
    data() {
      return {
        username: "",
      }
    },
    methods: {
      /*
       * Clear localstorage data
      */
      logout: function() {
        this.username   = undefined;
        this.hasSession = false;

        // When user signs out, emit event to update the global user session flag
        this.$emit('signOut',{});
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
