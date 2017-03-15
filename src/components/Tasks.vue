<template lang="pug">
  div.task-component
    div.message
      h3 What is your deadliest deadline today?
      button.waves-effect.waves-light.btn() Create One

    div.task-list
      draggable.dragArea(:list="myArray", :move="dragStart", @end="dragStop")
        div.list-items(v-for="e in myArray", :class="{'drag-start': isDragging, 'drag-stop': !isDragging}") {{ e.name}}
</template>

<script>
  import draggable from 'npm/vuedraggable';

  export default {
    name: 'tasks',
    props: ['username'],
    data() {
      return {
        myArray: [
          {id:1,name: "Test Data 1"},
          {id:2,name: "Test Data 2"},
          {id:3,name: "Test Data 3"},
          {id:4,name: "Test Data 4"},
          {id:5,name: "Test Data 5"},
        ],
        editable:true,
        isDragging: false,
        delayedDragging:false
      }
    },
    methods: {
      dragStart: function() {
        this.isDragging = true;
      },
      dragStop: function() {
        this.isDragging = false;
      }
    },
    components: {
      draggable
    },
  }
</script>
