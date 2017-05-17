'use strict';

const state = {
  taskItems: []
};

const getters = {
  getAllTasks: state => state.taskItems,
};

const actions = {
  createTask: ({commit, state}, obj) => {

    return new Promise((resolve, reject) => {
      commit('createTask', obj);
      resolve();
    });

  },
  arrangeTask: ({commit, state}, array) => commit('arrangeTask', array),
  refreshTaskList: ({commit, state}, array) => commit('refreshTaskList', array)
};


const mutations = {
  createTask(state, p) { },
  arrangeTask(state, taskArray) {
    state.taskItems = taskArray;
  },
  refreshTaskList(state, taskList) {
    state.taskItems = taskList;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
