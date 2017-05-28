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
                div.collection-item(v-for="(e, key) in allTaskList", :title="itemElTitle", :key="key", v-on:click="onClickHeader(key)")
                  div.item-block.white-text
                    div.title-area
                      span.white-text() {{ e.task_title }}
                    div.action-area
                      span.time {{ getFormattedDate(e.date_added) }} | delete
                  div.clear
                  div.details(v-if="e.isShown") {{ e.task_description }}
                  
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
        cardIsOpen: [],
        taskTitle: "",
        aa: false,
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
            "sort": this.taskList.length
          }
            
          this.$store.dispatch('createTask', params)

          //- Clear the input field
          this.taskTitle = "";

          //- save the new task to databse silently
          let task = await TaskService.createTask(params)

        } catch(error) {
          console.log("[Debug] INTERNAL_ERROR: ", error)
        }

        // this.$store.dispatch('createTask', taskDetails).then(() => {
        //   this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.allTaskList);
        // });

      },

      async onEnd(evt) {

        // this.$socket.emit('_SOCK_UPDATE_TASK_LIST', this.user.username, this.taskList);

        //- Update the sorting value
        _.each([...this.taskList], (value, key) => value.sort = key)

        //- Update the store regarding the new order of tasks
        this.$store.dispatch('arrangeTask', this.taskList)

        //- Get the index of the moved element
        let index = evt.newIndex
        
        //- Update the params and delete date_added in keys
        let params = JSON.parse(JSON.stringify(this.taskList[evt.newIndex]))
        delete params.date_added

        //- Update silently
        let task = await TaskService.updateTask(params.id, params)
      },

      getFormattedDate(ts) {
        return moment(ts).fromNow()
      },

      onCreateTaskError(error) {
        console.log("[Debug] onLoginError: ", error)
      },

      onClickHeader(i) {
        let value = !this.allTaskList[i].isShown

        //- Dynamically add new properties to object
        //- This is for hiding and showing of description
        this.$set(this.allTaskList[i],'isShown', value)
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
        
        let taskObj = await TaskService.getAllTask({status: 1, page:1, count:20})
        this.$store.dispatch('initializeTasks', taskObj.result.task)

        this.taskList = this.allTaskList;

        //- Initially set the toggle values
      _.each([...this.taskList], (value, key) => {
        //this.cardIsOpen[key] = false
      })

        this.isLoadingTaskList = false

      } catch(error) {
        console.log("[Debug] onGetTaskListError: ", error)
      }

    }

  }
</script>
