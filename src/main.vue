<template lang="pug">
  div#app
      div.header(v-if="hasSession")
        header-nav()
      div.container
        howdy(v-if="!hasSession")
        tasks(v-if="hasSession")

      template(v-if="$route.matched.length", v-cloak)
        router-view
</template>

<script>

  import { mapGetters, mapActions } from 'vuex';

  import Howdy from './components/Howdy.vue';
  import Tasks from './components/Tasks.vue';
  import HeaderNav from './components/HeaderNav.vue';

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
      Howdy,
      Tasks,
      HeaderNav
    }
  }
</script>
