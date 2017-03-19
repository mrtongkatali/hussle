'use strict';

const state = {
  taskItems: []
};

const getters = {
  getAllTasks: state => state.taskItems,
};

const actions = {
  createTask: ({commit, state}, obj) => commit('createTask', obj),
  arrangeTask: ({commit, state}, array) => commit('arrangeTask', array)
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
