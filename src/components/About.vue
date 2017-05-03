<template lang="pug", v-cloak>
  div.row.task-component
    div(class="col s12 m12 l12")
      h3 {{ pageTitle }}
      h3 parameters {{ username }}
</template>

<script>
  export default {
    name: 'about',
    props: ['username'],
    data() {
      return {
        pageTitle: "This is the about page"
      }
    },
    methods: {},
  }
</script>
