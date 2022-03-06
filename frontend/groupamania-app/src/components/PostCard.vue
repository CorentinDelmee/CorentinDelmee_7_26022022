<template>
<div>
    <div v-for="allMessage in allMessage" :key="allMessage.id" :id="allMessage.id" class="unique_message">

        <div class="card_post">
            <div class="content_container">
                <div class="avatar_div">
                    <i class="fas fa-id-card-alt"></i>
                </div>
                <div class="content_div">
                    <h3>Nom Prénom</h3>
                    <p :id="allMessage.id + `paraf`"><span role="textbox" :id="allMessage.id + `span`">{{ allMessage.content }}</span></p>
                </div>
            </div>
            <div class="icon_div">
                <div class="coeur_div">
                    <p>15</p>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph coeur_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 220.2a13.6 13.6 0 0 1-9.9-4.1L35 133a58 58 0 0 1 2.2-84.2a56.5 56.5 0 0 1 41.6-14a62.8 62.8 0 0 1 40.3 18.3L128 62l11-11a57.9 57.9 0 0 1 84.1 2.2a56.2 56.2 0 0 1 14.1 41.6a62.8 62.8 0 0 1-18.3 40.3l-81 81a13.6 13.6 0 0 1-9.9 4.1Zm5.6-8.3ZM75 46.7a44 44 0 0 0-29.7 11.1a45.8 45.8 0 0 0-1.8 66.7l83.1 83.1a1.9 1.9 0 0 0 2.8 0l81-81c18.2-18.2 19.9-47.5 3.8-65.3a45.8 45.8 0 0 0-66.7-1.8l-15.3 15.2a6.1 6.1 0 0 1-8.5 0l-13.1-13.1A50.3 50.3 0 0 0 75 46.7Z"></path></svg>
                </div>
                <div class="function_icon_div">
                    <svg @click="CommentForm(allMessage.id)" :id="allMessage.id + `commentIcon`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi message_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8H6V6h12v2m0 3H6V9h12v2m0 3H6v-2h12v2m4-10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4V4Z"></path></svg>                    
                    <svg @click="ModifyPost(allMessage.id, allMessage.content)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi modify_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"></path></svg>
                    <svg @click="DeletePost(allMessage.id)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--majesticons delete_icon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M9 7h9v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h3z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7h-2M4 7h2m0 0h12M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7m-9-.5v0A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5v0"></path></g></svg>
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
  components: {
    CommentsCard,
    CommentForm,
  },
  computed: {
      ...mapGetters(["allMessage"])
  },
  methods: {
      ...mapActions(["fetchAllMessage"]),

            // Fonction suppression d'un post


      DeletePost(id){
        fetch(`http://localhost:3000/api/publications/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(location.reload())
        .catch(err => console.log(err));
      },


            // Fonction modification d'un post


      ModifyPost(id, messageContent){

        let parentDiv = document.getElementById(`${id}paraf`);
        let messagePos = document.getElementById(`${id}span`);
        let newTextarea = document.createElement("textarea")

        newTextarea.setAttribute("placeholder", "Appuyez sur entrée pour modifier votre message")
        newTextarea.textContent = `${messageContent}`
        
        messagePos.remove();
        parentDiv.appendChild(newTextarea);

        parentDiv.classList.add("parafTextarea")
        newTextarea.classList.add("activeTextarea")


        newTextarea.style.width = "100%";
        newTextarea.style.minHeight = "100px";
        newTextarea.style.resize = "none"


        // Display Icon Message "none"

        let Icon = document.querySelectorAll("svg");

        for(let i = 0; i < Icon.length; i++){
            Icon[i].style.display = "none"
        }


        let createdTextarea = document.querySelector("textarea.activeTextarea");
        createdTextarea.addEventListener("keydown", (e) => {
            const keyName = e.key;
            if(keyName === 'Enter'){
                console.log("C'est là bonne touchheeeee")

                e.preventDefault();

                let post_modify = {
                    content : createdTextarea.value
                }

                fetch(`http://localhost:3000/api/publications/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({post_modify})
                    })
                    .then(res => res.json())
                    .then(location.reload())
                    .catch(err => console.log(err));
            }

            if(keyName === 'Escape'){
                location.reload();
            }

        })
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
      }

  },


  created() {
      this.fetchAllMessage();
  }
}

// fonction chercher dans un array console.log(array.filter(x => x.user_id === 1));

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../sass/utils/variables";
@import "../sass/components/post_card";
</style>

