<template>
<div>
    <div v-for="allMessage in allMessage" :key="allMessage.id" :id="allMessage.id" class="unique_message">

        <div class="card_post">
            <div class="content_container">
                <div class="avatar_div">
                    <i class="fas fa-id-card-alt"></i>
                </div>
                <div class="content_div">

                    <h3>{{allMessage.prenom + " " + allMessage.nom}}</h3>
                    <p v-if="isModifying === false">
                        <span v-if="isModifying === false" role="textbox" :id="allMessage.id + `span`">{{ allMessage.content }}</span>
                    </p>

                    <p v-if="isModifying === true" class="parafTextarea">
                        <textarea v-model="allMessage.content" name="" id="modifyTextarea" class="activeTextarea" placeholder="Appuyez sur entrée pour modifier votre message"></textarea>
                    </p>

                    <input @change="FigCaptionDisplay" name = "image" type="file" id="file_modify_input" hidden>

                    <div v-if="isModifying === false">
                        <img v-if="allMessage.file"  :src="allMessage.file" alt="">
                    </div>                    

                    <label v-if="isModifying === true" for="file_modify_input" style="cursor : pointer;">
                        <img v-if="allMessage.file"  :src="allMessage.file" alt="">
                        <figcaption>{{filename}}</figcaption>
                    </label>

                    <div class="ModifyPost_div">
                        <button @click="SendModifyPost(allMessage.id, allMessage.file)" v-if="isModifying === true" class="button">Modifier le post</button>
                        <svg @click="Goback" v-if="isModifying === true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ri back_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"></path></svg>                        
                    </div> 

                </div>
            </div>
            <div class="icon_div">
                <div class="coeur_div">
                    <p>15</p>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph coeur_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 220.2a13.6 13.6 0 0 1-9.9-4.1L35 133a58 58 0 0 1 2.2-84.2a56.5 56.5 0 0 1 41.6-14a62.8 62.8 0 0 1 40.3 18.3L128 62l11-11a57.9 57.9 0 0 1 84.1 2.2a56.2 56.2 0 0 1 14.1 41.6a62.8 62.8 0 0 1-18.3 40.3l-81 81a13.6 13.6 0 0 1-9.9 4.1Zm5.6-8.3ZM75 46.7a44 44 0 0 0-29.7 11.1a45.8 45.8 0 0 0-1.8 66.7l83.1 83.1a1.9 1.9 0 0 0 2.8 0l81-81c18.2-18.2 19.9-47.5 3.8-65.3a45.8 45.8 0 0 0-66.7-1.8l-15.3 15.2a6.1 6.1 0 0 1-8.5 0l-13.1-13.1A50.3 50.3 0 0 0 75 46.7Z"></path></svg>
                </div>
                <div class="function_icon_div">
                    <svg @click="CommentForm(allMessage.id)" v-if="isModifying === false" :id="allMessage.id + `commentIcon`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi message_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8H6V6h12v2m0 3H6V9h12v2m0 3H6v-2h12v2m4-10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4V4Z"></path></svg>                    
                    <svg @click="ModifyPostInterface" v-if="isModifying === false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"></path></svg>
                    <svg @click="DeletePost(allMessage.id, allMessage.file)" v-if="isModifying === false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--majesticons delete_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M9 7h9v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h3z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7h-2M4 7h2m0 0h12M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-9-.5v0A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v0"></path></g></svg>
                </div>
            </div>
        </div>
        <CommentForm :id="allMessage.id + `commentForm`" :post_id="allMessage.id"/>
        <CommentsCard :message_id="allMessage.id"/>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import CommentsCard from './CommentsCard.vue';
import CommentForm from './CommentForm.vue';

export default {
  name: 'PostCard',
  data: function() {
        return {
            isModifying: false,
            filename : "Choisissez votre image",
        };
    },
  components: {
    CommentsCard,
    CommentForm,
  },
  computed: {
      ...mapGetters(["allMessage"])
  },
  methods: {
      ...mapActions(["fetchAllMessage", "fetchAllComment"]),

            // Fonction suppression d'un post


      DeletePost(id, filename){

        let profil = JSON.parse(localStorage.getItem("UserLogin")).User;
        profil.filename = filename;

        fetch(`http://localhost:3000/api/publications/${id}`, {
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
      },


        // Fonction Interface modification du post


      ModifyPostInterface(){

        this.isModifying = true;

      },

        // Fonction envoie du post modifié

      SendModifyPost(id, originFilename){
            let profil = JSON.parse(localStorage.getItem("UserLogin")).User
            let createdTextarea = document.getElementById("modifyTextarea");

                let formData = new FormData()
                formData.append("content", createdTextarea.value);
                formData.append("user_id", profil.id);
                formData.append("filename", originFilename)
                formData.append("image", document.getElementById("file_modify_input").files[0]);
                

                fetch(`http://localhost:3000/api/publications/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + profil.token
                    },
                    body: formData
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));
        },

        Goback(){
            this.isModifying = false;
        },

      // Function affichage du formulaire de commentaire

      CommentForm(id){
        let commentFormPos = document.getElementById(`${id}commentForm`);

        if(commentFormPos.style.display === "none" || commentFormPos.style.display === ""){
            commentFormPos.style.display = "block";
        }
        else{
            commentFormPos.style.display = "none"
        }
      },

      FigCaptionDisplay(){
        let fileModifyInput = document.getElementById("file_modify_input");
        if (fileModifyInput.files) {
            this.filename = fileModifyInput.files[0].name;
        }
    }
},


  created() {
    this.fetchAllMessage();
    this.fetchAllComment();
  }
}

// fonction chercher dans un array console.log(array.filter(x => x.user_id === 1));

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/post_card";
</style>

