<template lang="pug", v-cloak>
  div.row.task-component
    div(class="col s12 m12 l12")
      div.task-content
        div.row
          div(class="col s12 m12 l12")
            h4.center.deadline-title What&apos;s your #[span.strike deadliest] deadline today?
        div.row
          div(class="col s12 m12 l12")
            input.validate.center(type="text", placeholder="Add your deadline here then hit 'Enter'!",  @keyup.enter="onCreateTask", v-model="taskTitle")
          div(class="col s12 m12 l12")
            draggable.dragArea.collection(:list="taskList", @end="onEnd")
              transition-group
                div.collection-item(v-for="(e, key) in allTaskList", :title="itemElTitle", :key="key")
                  div.item-block.white-text
                    div.title-area
                      span.white-text() {{ e.title }}
                    div.action-area
                      span.time {{ getFormattedDate(e.timestamp) }}
                  div.clear
                  div.details Task details here....
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TaskService from 'services/task.service' 
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
      async onCreateTask() {

        try {

          let params = {
            "task_title": "1",
            "task_description": "asfdsdf",
            "status": 1
          }
            
          let task = await TaskService.createTask(params)

          if (user.isSuccessful) {
            this.onCreateTaskSuccess(task)
          } else {
            this.onCreateTaskError(user.message)
          }

        } catch(error) {
          console.log("[Debug] INTERNAL_ERROR: ", error)
        }
        
        // let taskDetails = {
        //   title: this.taskTitle,
        //   description: "",
        //   imageURL: "",
        //   isCompleted: false,
        //   timestamp: moment.now()
        // };

        // this.$store.dispatch('createTask', taskDetails).then(() => {
        //   this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.allTaskList);
        // });

      },

      onEnd() {
        // this.$store.dispatch('arrangeTask', this.taskList).then(() => {
        //   this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.taskList);
        // });

        this.$store.dispatch('arrangeTask', this.taskList)
        this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.taskList);
      },

      getFormattedDate(ts) {
        return moment(ts).fromNow()
      },
      
      onCreateTaskSuccess(success) {
        this.taskTitle = "";

        console.log("SUCCESS", success)
      },
      onCreateTaskError(error) {
        console.log("[Debug] onLoginError: ", error)
      }
    },
    computed: mapGetters({
      user: 'getUserInfo',
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
