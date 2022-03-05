import { createStore } from 'vuex'

export default createStore({
  state: {
    allMessage : [],
  },
  getters: {
    allMessage(state) {
      return state.allMessage;
    },
  },
  mutations: {
    setPublication(state, allMessage) {
      state.allMessage = allMessage;
    },
  },
  actions: {
    fetchAllMessage(context) {
      return fetch("http://localhost:3000/api/publications")
        .then((res) => res.json())
        .then((data) => {
          context.commit("setPublication", data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {
  }
})
