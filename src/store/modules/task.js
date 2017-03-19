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
  arrangeTask: ({commit, state}, array) => {

    return new Promise((resolve, reject) => {
      commit('arrangeTask', array);
      resolve();
    });

  },
  refreshTaskList: ({commit, state}, array) => commit('refreshTaskList', array)
};


const mutations = {
  createTask(state, p) {
    state.taskItems.push({
      title: p.title,
      description: p.descritpion,
      imageURL: p.imageURL,
      isCompleted: false,
      timestamp: p.timestamp
    });
  },
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
