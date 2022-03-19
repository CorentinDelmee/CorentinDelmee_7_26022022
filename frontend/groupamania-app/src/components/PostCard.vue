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
                    <p class="paraf_textarea">
                        <textarea name="" :id="id + `textarea`" class="active_textarea" :value="content"></textarea>
                    </p>
                    <input @change="ChangeImageDisplay" type="file" id="file_modify" hidden>
                    <div>
                        <label for="file_modify">
                            <img :src="modifyFileDisplay" alt="">
                            <figcaption>{{filename}}</figcaption>
                        </label>
                    </div>
                    <div class="modify_post_div">
                        <img @click="goBack" src="../assets/svg/go_back_icon.svg" alt="">
                        <button @click="sendModifyPost(id, user_id, file)" class="button">Modifier</button>
                    </div>          

                </div>


            </div>
            <div class="icon_div">
                <div class="coeur_div">
                    <p>15</p>
                    <img class="coeur_icon" src="../assets/svg/love_icon.svg" alt="">
                </div>
                <div class="function_icon_div">
                    <img @click="CommentForm(id)" v-if="isModifying === false" :id="id + `commentIcon`" class="message_icon" src="../assets/svg/comment_icon.svg" alt="">
                    <img @click="ModifyPostInterface(file)" v-if="user_id === profil.id || profil.role === 'Admin'" class="modify_icon" src="../assets/svg/modify_icon.svg" alt="">
                    <img @click="DeletePost(id, file, user_id)" v-if="user_id === profil.id || profil.role === 'Admin'" class="delete_icon" src="../assets/svg/delete_icon_post.svg" alt="">
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
        .catch(err => console.error(err));
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
                    .catch(err => console.error(err));
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/post_card";
</style>

