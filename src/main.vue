<template lang="pug">
  div#app
      div.header
        header-nav()
      div.container
        //- tasks(v-if="hasSession")

        template(v-if="$route.matched.length", v-cloak)
          router-view
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Tasks from './components/Tasks.vue'
  import HeaderNav from './components/shared/header-nav.vue'

  export default {
    name: 'app',
    data() {
      return {
        hasUserData: false,
        user: undefined,
      }
    },
    computed: mapGetters({
      user: 'getUserInfo',
      hasSession: 'hasSession'
    }),
    components: {
      HeaderNav,
      Tasks
    }
  }
</script>
