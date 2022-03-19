<template>
  <div>
    <div v-for="allComment in allComment.filter(x => x.post_id === message_id)" :key="allComment.id" class="comment_card">
      <div class="comment_container">
        <div class="profil_image_div">
          <img :src="allComment.user_image" alt="">
        </div>
        <div class="content_div"> 
          <h3>{{allComment.prenom + " " + allComment.nom}}</h3>
          <p>{{allComment.content}}</p>
        </div>
      </div>
      <div class="icon_div">
        <img v-if="allComment.user_id === profil.id || profil.role === 'Admin' " @click="DeletePost(allComment.id, allComment.user_id)" class="delete_icon" src="../assets/svg/delete_icon_comment.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'CommentsCard',

  props: {
      message_id : {
          type: Number,
      }
  },
  computed: {
      ...mapGetters(["allComment", "profil"])
  },

  methods: {

      DeletePost(id, user_id){

        let profil = JSON.parse(localStorage.getItem("UserLogin")).User
        profil.user_id = user_id;
        
        if(user_id === profil.id || profil.role === "Admin"){
          fetch(`http://localhost:3000/api/comments/${id}`, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + profil.token
              },
              body: JSON.stringify(profil)
          })
          .then(res => res.json())
          .then((data) => {
            let messageArray = JSON.parse(JSON.stringify(this.$store.state.allComment));
            let elementIndex = messageArray.findIndex((obj => obj.id == data));
            this.$store.commit('deleteComment' , elementIndex)
          })
          .catch(err => console.log(err));
        }
      },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/comment";
</style>

