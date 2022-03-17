import { createStore } from 'vuex'

export default createStore({


  state: {
    allMessage : [],

    allComment : [],

    profil: [],
  },


  getters: {
    allMessage(state) {
      return state.allMessage;
    },

    allComment(state) {
      return state.allComment;
    },

    profil(state) {
      return state.profil;
    },
  },


  mutations: {
    setPublication(state, allMessage) {
      state.allMessage = allMessage;
    },

    addPublication(state, CommingMessage) {
      state.allMessage.unshift(CommingMessage)
    },

    modifyPublication(state, payload) {
      state.allMessage[payload.elementIndex] = payload.data;
    },

    deletePublication(state, elementIndex) {
      console.log(elementIndex)
      state.allMessage.splice(elementIndex, 1);
    },



    setComment(state, allComment){
      state.allComment = allComment;
    },

    addComment(state, CommingComment) {
      state.allComment.unshift(CommingComment)
    },

    deleteComment(state, elementIndex) {
      console.log(elementIndex)
      state.allComment.splice(elementIndex, 1);
    },
    

    setProfil(state,profil){
      state.profil = profil;
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

    updateProfil(context){
      let profilData = JSON.parse(localStorage.getItem("UserLogin")).User;
      context.commit("setProfil", profilData);
    },



  },

  modules: {
  }
})
