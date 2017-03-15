<template lang="pug">
  .container#app
    howdy
    tasks
</template>


<script>
  import Howdy from './components/Howdy.vue';
  import Tasks from './components/Tasks.vue';

  export default {
    name: 'app',
    data () {
      return {
        username: "",
        hasSession: false,
      }
    },
    components: {
      Howdy,
      Tasks
    },
  }
</script>
