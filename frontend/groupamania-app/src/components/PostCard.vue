<template>
<div>
    <div :id="id" class="unique_message">

        <div class="card_post">
            <div class="content_container">
                <div class="avatar_div">
                    <img :src="user_image" alt="">
                </div>
                
                <div v-if="isModifying === false" class="content_div" :id="id + `content_div`">
                    <h2>{{prenom + " " + nom}}</h2>
                    <p :id="id + `paraf`">
                        <span role="textbox" :id="id + `span`">{{ content }}</span>
                    </p>

                    <div>
                        <img v-if="file"  :src="file" alt="">
                    </div>                    


                </div>

                <div v-if="isModifying === true" class="content_div" :id="id + `content_div`">

                    <h2>{{prenom + " " + nom}}</h2>
                    <p class="parafTextarea">
                        <textarea name="" :id="id + `textarea`" class="activeTextarea" :value="content"></textarea>
                    </p>
                    <input @change="ChangeImageDisplay" type="file" id="file_modify" hidden>
                    <div>
                        <label for="file_modify">
                            <img :src="modifyFileDisplay" alt="">
                            <figcaption>{{filename}}</figcaption>
                        </label>
                    </div>
                    <div class="ModifyPost_div">
                        <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12l8.13-8.13z"></path></svg>
                        <button @click="sendModifyPost(id, user_id, file)" class="button">Modifier</button>
                    </div>          

                </div>


            </div>
            <div class="icon_div">
                <div class="coeur_div">
                    <p>15</p>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph coeur_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 220.2a13.6 13.6 0 0 1-9.9-4.1L35 133a58 58 0 0 1 2.2-84.2a56.5 56.5 0 0 1 41.6-14a62.8 62.8 0 0 1 40.3 18.3L128 62l11-11a57.9 57.9 0 0 1 84.1 2.2a56.2 56.2 0 0 1 14.1 41.6a62.8 62.8 0 0 1-18.3 40.3l-81 81a13.6 13.6 0 0 1-9.9 4.1Zm5.6-8.3ZM75 46.7a44 44 0 0 0-29.7 11.1a45.8 45.8 0 0 0-1.8 66.7l83.1 83.1a1.9 1.9 0 0 0 2.8 0l81-81c18.2-18.2 19.9-47.5 3.8-65.3a45.8 45.8 0 0 0-66.7-1.8l-15.3 15.2a6.1 6.1 0 0 1-8.5 0l-13.1-13.1A50.3 50.3 0 0 0 75 46.7Z"></path></svg>
                </div>
                <div class="function_icon_div">
                    <svg @click="CommentForm(id)" v-if="isModifying === false" :id="id + `commentIcon`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi message_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8H6V6h12v2m0 3H6V9h12v2m0 3H6v-2h12v2m4-10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4V4Z"></path></svg>                    
                    <svg @click="ModifyPostInterface(file)" v-if="user_id === profil.id || profil.role === 'Admin'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"></path></svg>
                    <svg @click="DeletePost(id, file, user_id)" v-if="user_id === profil.id || profil.role === 'Admin'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--majesticons delete_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M9 7h9v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h3z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7h-2M4 7h2m0 0h12M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-9-.5v0A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v0"></path></g></svg>
                </div>
            </div>
        </div>
        <CommentForm :id="id + `commentForm`" :post_id="id"/>
        <CommentsCard :message_id="id"/>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import CommentsCard from './CommentsCard.vue';
import CommentForm from './CommentForm.vue';

export default {
  name: 'PostCard',
  props: {
      id: {
        type: Number,
        required: true,
      },
      nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      file: {},
      user_id: {
          type: Number,
          required: true,
      },
      user_image: {
          type: String,
          required: true,
      }
  },
  data: function() {
        return {
            isModifying: false,
            filename : "Choisissez votre image",
            modifyFileDisplay: [],

        };
    },
  components: {
    CommentsCard,
    CommentForm,
  },
  computed: {
      ...mapGetters(["profil"])
  },
  methods: {
      ...mapActions(["fetchAllComment"]),

            // Fonction suppression d'un post


      DeletePost(id, filename, user_id){

        let profil = JSON.parse(localStorage.getItem("UserLogin")).User;
        profil.filename = filename;
        profil.user_id = user_id;

        if(profil.id === user_id || profil.role === "Admin"){
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
        .then((data) => {
            let messageArray = JSON.parse(JSON.stringify(this.$store.state.allMessage));
            let elementIndex = messageArray.findIndex((obj => obj.id == data));
            this.$store.commit('deletePublication' , elementIndex)
        })
        .catch(err => console.log(err));
        }
    },

        // Fonction Interface modification du post


      ModifyPostInterface(filepath){
        
        this.isModifying = true;
        this.modifyFileDisplay = filepath;

      },

      ChangeImageDisplay(){
          let changedFile = document.getElementById("file_modify");
          console.log(changedFile.files[0])
          this.modifyFileDisplay = URL.createObjectURL(changedFile.files[0]);
          this.filename = changedFile.files[0].name;
      },

      sendModifyPost(id, user_id, filename){
        let profil = JSON.parse(localStorage.getItem("UserLogin")).User
        if(profil.id === user_id || profil.role === "Admin"){
            let createdTextarea = document.getElementById(`${id}textarea`);
            let changedFile = document.getElementById("file_modify");

            let formData = new FormData()
                formData.append("content", createdTextarea.value);
                formData.append("id", profil.id);
                formData.append("user_id", user_id)
                formData.append("image", changedFile.files[0])
                formData.append("role", profil.role);
                if(filename != null){
                    formData.append("filename", filename)  
                }

                fetch(`http://localhost:3000/api/publications/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + profil.token
                    },
                    body: formData
                    })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data);
                        let messageArray = JSON.parse(JSON.stringify(this.$store.state.allMessage));
                        let elementIndex = messageArray.findIndex((obj => obj.id == data.id));

                        let payload = {
                            'elementIndex' : elementIndex,
                            'data': data,
                        };

                        this.$store.commit('modifyPublication', payload)

                    })
                    .then(this.isModifying = false)
                    .catch(err => console.log(err));
        }
      },
      
      goBack(){
          this.isModifying = false
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

