<template lang="pug", v-cloak>
  div.row.task-component
    div(class="col s12 m12 l12")
      div.task-content
        div.row
          div(class="col s12 m12 l12")
            h4.center.deadline-title What's your #[span.strike deadliest] deadline today?
        div.row
          div(class="col s12 m12 l12")
            input.validate.center(type="text", placeholder="Add your deadline here then hit 'Enter'!",  @keyup.enter="onCreateTask", v-model="taskTitle")
          div(class="col s12 m12 l12")
            draggable.dragArea.collection(v-if="hasTaskList", :list="taskList")
              div.collection-item(v-for="e in taskList", :title="itemElTitle")
                div.item-block.white-text
                  div.title-area
                    span.white-text() {{ e.title }}
                  div.action-area
                    span.time {{ getFormattedDate(e.timestamp) }}
                div.clear
                div.details Lorem ipsum

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
