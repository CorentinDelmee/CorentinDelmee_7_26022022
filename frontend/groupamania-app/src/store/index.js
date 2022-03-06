import { createStore } from 'vuex'

export default createStore({


  state: {
    allMessage : [],

    allComment : [],
  },


  getters: {
    allMessage(state) {
      return state.allMessage;
    },

    allComment(state) {
      return state.allComment;
    }
  },


  mutations: {
    setPublication(state, allMessage) {
      state.allMessage = allMessage;
    },

    setComment(state, allComment){
      state.allComment = allComment;
    }
  },


  actions: {

    // Get all Message

    fetchAllMessage(context) {
      return fetch("http://localhost:3000/api/publications")
        .then((res) => res.json())
        .then((data) => {
          context.commit("setPublication", data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    },

    // Get all Comment

    fetchAllComment(context) {
      return fetch("http://localhost:3000/api/comments")
        .then((res) => res.json())
        .then((data) => {
          context.commit("setComment", data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    },

  },

  modules: {
  }
})
