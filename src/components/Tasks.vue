<template lang="pug", v-cloak>
  div.row.task-component
    div(class="col s12 m12 l12")
      div.task-content
        h4.center.deadline-title What's your #[span.strike deadliest] deadline today?
        input.validate.center(type="text", placeholder="Enter your task here...",  @keyup.enter="onCreateTask", v-model="taskTitle")

        draggable.dragArea.collection(v-if="hasTaskList", :list="taskList")
          div.collection-item(v-for="e in taskList", :title="itemElTitle")
            div.item-block.teal-text
              div.title-area
                span.teal-text() {{ e.title }}
              div.action-area
                span.time {{ getFormattedDate(e.timestamp) }}
            div.clear
</template>

<script>
  import draggable from 'npm/vuedraggable';

  export default {
    name: 'tasks',
    props: ['username'],
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
          image: "",
          isCompleted: false,
          timestamp: moment.now()
        };

        this.taskList.push(taskDetails);
        this.taskTitle = "";

        let session = this.$localStorage.get('user');
        session.taskList = this.taskList;
        this.$localStorage.set('user', session);
      },

      getFormattedDate: function(ts) {
        return moment(ts).fromNow()
      }
    },
    computed: {
      hasTaskList: function() {
        return (_.isEmpty(this.taskList) ? false : true);
      },

    },
    components: {
      draggable
    },
    created() {

      //- Fetch existing local data when this component has been initialized
      let session   = this.$localStorage.get('user')
      if( !_.isEmpty(session.taskList) && !_.isUndefined(session.taskList) ) {
        this.taskList = session.taskList;
      }
    }
  }
</script>
