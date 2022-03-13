<template>
  <div>
    <div v-for="allComment in allComment.filter(x => x.post_id === message_id)" :key="allComment.id" class="comment_card">
      <div class="comment_container">
        <div class="profil_image_div">
          <img :src="allComment.user_image" alt="">
        </div>
        <div class="content_div"> 
          <h4>{{allComment.prenom + " " + allComment.nom}}</h4>
          <p>{{allComment.content}}</p>
        </div>
      </div>
      <div class="icon_Div">
        <svg v-if="allComment.user_id === profil.id || profil.role === 'Admin' " @click="DeletePost(allComment.id, allComment.user_id)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--majesticons delete_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M9 7h9v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h3z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7h-2M4 7h2m0 0h12M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-9-.5v0A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v0"></path></g></svg>
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
          .then(location.reload())
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

