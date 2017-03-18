<template lang="pug", v-cloak>
  div.row.task-component
    div(class="col s12 m12 l12")
      div.task-content
        h4.center.deadline-title What's your #[span.strike deadliest] deadline today?
        input.validate.center(type="text", placeholder="Enter your task here...",  @keyup.enter="onCreateTask", v-model="taskTitle")

        draggable.dragArea.collection(:list="taskList", @end="onEnd")
          transition-group
            div.collection-item(v-for="(e, key) in taskList", :title="key", :key="key")
              div.item-block.teal-text
                div.title-area
                  span.teal-text() {{ e.title }}
                div.action-area
                  span.time {{ getFormattedDate(e.timestamp) }}
              div.clear
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import draggable from 'npm/vuedraggable';

  export default {
    name: 'tasks',
    data() {
      return {
        taskList: [],
        taskTitle: "",
        itemElTitle: "Drag to switch position"
      }
    },
    methods: {
      onCreateTask: function() {
        let taskDetails = {
          title: this.taskTitle,
          description: "",
          imageURL: "",
          isCompleted: false,
          timestamp: moment.now()
        };

        this.taskTitle = "";

        this.$store.dispatch('createTask', taskDetails);
      },

      onEnd: function() {
        this.$store.dispatch('arrangeTask', this.taskList);
      },

      getFormattedDate: function(ts) {
        return moment(ts).fromNow()
      }
    },
    computed: mapGetters({
      allTaskList: 'getAllTasks',
    }),
    components: {
      draggable
    },
    created: function() {
      this.taskList = this.allTaskList;
    }

  }
</script>
