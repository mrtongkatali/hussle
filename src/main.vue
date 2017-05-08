<template lang="pug">
  div#app
      div.header
        header-nav()
      div.container
      
        template(v-if="$route.matched.length", v-cloak)
          router-view
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
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
      test: 'getHeaders'
    }),
    components: {
      HeaderNav,
      Spinner
    },
    mounted() {
      this.hello1()
    }
  }
</script>
