import vuex from "vuex";

export default new vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setNewTask(state, task) {
      state.tasks.push(task);
    },
    setNewTaskstatus(state, task) {
      const currentTask = state.tasks.findIndex((item) => item.id === task.id);
      state.tasks[currentTask] = task;
    }
  },
  actions: {
    setNewTask({ commit }, task) {
      commit("setNewTask", task);
    },
    updateTaskStatus({ commit }, task) {
      commit("setNewTaskstatus", task);
    }
  },
  getters: {
    getTasks: (state) => {
      return state.tasks;
    }
  }
});
