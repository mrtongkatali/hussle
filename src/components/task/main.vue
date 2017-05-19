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
            div.loading-block(v-if="isLoadingTaskList")
              spinner.loader(size="small")
              span.text Fetching all your deadlines

            draggable.dragArea.collection(:list="taskList", @end="onEnd", v-if="!isLoadingTaskList")
              transition-group
                div.collection-item(v-for="(e, key) in allTaskList", :title="itemElTitle", :key="key")
                  div.item-block.white-text
                    div.title-area
                      span.white-text() {{ e.task_title }}
                    div.action-area
                      span.time {{ getFormattedDate(e.date_added) }}
                  div.clear
                  div.details(v-if="e.task_description") {{ e.task_description }}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import TaskService from 'services/task.service' 
  import Draggable from 'npm/vuedraggable';
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'tasks',
    data() {
      return {
        taskList: [],
        taskTitle: "",
        itemElTitle: "Drag to switch position",
        isLoadingTaskList: false
      }
    },
    methods: {
      async onCreateTask() {

        try {

          let params = {
            "task_title": this.taskTitle,
            "task_description": "",
            "status": 1,
            "sort": 0
          }
            
          let task = await TaskService.createTask(params)
          this.$store.dispatch('createTask', params)

          // if (user.isSuccessful) {
          //   this.onCreateTaskSuccess(params)
          // } else {
          //   this.onCreateTaskError(user.message)
          // }

        } catch(error) {
          console.log("[Debug] INTERNAL_ERROR: ", error)
        }

        // this.$store.dispatch('createTask', taskDetails).then(() => {
        //   this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.allTaskList);
        // });

      },

      onEnd() {
        // this.$store.dispatch('arrangeTask', this.taskList).then(() => {
        //   this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.taskList);
        // });

        // this.$store.dispatch('arrangeTask', this.taskList)
        // this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.taskList);

        console.log("XXX", this.taskList)
      },

      getFormattedDate(ts) {
        return moment(ts).fromNow()
      },
      
      onCreateTaskSuccess(obj) {
        this.taskTitle = "";        
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
      Draggable,
      Spinner
    },
    async created() {

      this.isLoadingTaskList = true

      try {
        
        let taskObj = await TaskService.getAllTask({status: 1, page:1, count:10})
        this.$store.dispatch('initializeTasks', taskObj.result.task)

        this.taskList = this.allTaskList;

        this.isLoadingTaskList = false

      } catch(error) {
        console.log("[Debug] onGetTaskListError: ", error)
      }

    }

  }
</script>
