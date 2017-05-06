<template lang="pug">
  div#app
      div.header
        //header-nav()
      div.container
        //- tasks(v-if="hasSession")

        template(v-if="$route.matched.length", v-cloak)
          router-view
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Tasks from './components/Tasks.vue'
  import HeaderNav from './components/shared/header-nav.vue'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'app',
    data() {
      return {
        user: undefined,
      }
    },
    computed: mapGetters({
      user: 'getUserInfo',
    }),
    components: {
      HeaderNav,
      Tasks,
      Spinner
    }
  }
</script>
