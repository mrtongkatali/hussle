<template lang="pug">
  .container#app
    howdy
</template>


<script>

  import Howdy from './components/Howdy.vue';

  export default {
    name: 'app',
    components: {
      Howdy,
    },
    data() {
      return {
        opened1: false
      };
    },
    methods: () => {
      close1: () => {
        this.opened1 = false;
      }
    }
  }
</script>
