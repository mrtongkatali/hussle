'use strict';

const state = {
  taskItems: []
};

const getters = {
  getAllTasks: state => state.taskItems,
};

const actions = {
  initializeTasks: ({commit, state}, array) => commit('initializeTasks', array),
  createTask: ({commit, state}, obj) => commit('pushAnotherTask', obj),
  arrangeTask: ({commit, state}, array) => commit('arrangeTask', array),
  refreshTaskList: ({commit, state}, array) => commit('refreshTaskList', array),
  clearTaskItems: ({commit, state}) => commit('clearTaskItems'),
};


const mutations = {
  initializeTasks(state, array) { 
    state.taskItems = array
  },
  pushAnotherTask(state, obj) {
    state.taskItems.push(obj)
  },
  arrangeTask(state, taskArray) {
    state.taskItems = taskArray;
  },
  refreshTaskList(state, taskList) {
    state.taskItems = taskList;
  },
  clearTaskItems(state) {
    state.taskItems = {}
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
